/* ========================================
   CONSTANTS
   ======================================== */
const COLORS = {
  blue: '#4285f4',
  red: '#ea4335',
  yellow: '#fbbc05',
  green: '#34a853',
  gray: '#94a3b8'
};

/* ========================================
   DOM ELEMENTS
   ======================================== */
const els = {
  fileInput: document.getElementById('fileInput'),
  fileName: document.getElementById('fileName'),
  statusPanel: document.getElementById('statusPanel'),
  exportArea: document.getElementById('exportArea'),
  tableWrap: document.getElementById('tableWrap'),
  table: document.getElementById('skillTable'),
  btnPng: document.getElementById('btnPng'),
  btnPdf: document.getElementById('btnPdf'),
  themeToggle: document.getElementById('themeToggle'),
  themeLabel: document.getElementById('themeLabel'),
  soNumber: document.getElementById('metricSO'),
  lineNumber: document.getElementById('metricLine'),
  updateDate: document.getElementById('metricUpdate'),
  employees: document.getElementById('metricEmployees'),
  operations: document.getElementById('metricOperations'),
  filled: document.getElementById('metricFilled'),
  filledSub: document.getElementById('metricFilledSub'),
  average: document.getElementById('metricAverage'),
  averageSub: document.getElementById('metricAverageSub')
};

/* ========================================
   INITIALIZATION
   ======================================== */
initTheme();
els.fileInput.addEventListener('change', handleFile);
els.btnPng.addEventListener('click', exportPng);
els.btnPdf.addEventListener('click', exportPdf);
els.themeToggle.addEventListener('click', toggleTheme);
els.table.addEventListener('click', handleEmployeeClick);

/* ========================================
   FILE HANDLING
   ======================================== */
async function handleFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  els.fileName.textContent = file.name;
  updateFileInfoCards(file.name);
  setStatus('Loading file...', 'Please wait while the dashboard is being prepared.');

  // Reset per-file state so cycling doesn't leak across imports
  employeeSkillIndexMap.clear();
  els.tableWrap.scrollLeft = 0;

  try {
    const text = await readFileAsText(file);
    const rows = parseCsv(text);

    if (rows.length < 2) throw new Error('CSV has no data rows.');

    const headers = rows[0].map(normalizeHeader);

    if (findHeaderIndex(headers, 'Employee ID') === -1 || findHeaderIndex(headers, 'Employee Name') === -1) {
      throw new Error('CSV must contain "Employee ID" and "Employee Name" columns.');
    }

    const dataRows = rows.slice(1).filter(row =>
      row.some(cell => String(cell || '').trim() !== '')
    );

    renderDashboard(headers, dataRows);
  } catch (error) {
    console.error(error);
    setStatus('Cannot read this file', error.message || 'Please check the CSV format.');
  }
}

// Detect common CSV encodings: Excel "CSV UTF-8" (BOM), UTF-16, plain UTF-8,
// and Thai Windows-874 (default for Thai Excel "Save as CSV")
async function readFileAsText(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  if (bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
    return new TextDecoder('utf-8').decode(buffer);
  }
  if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
    return new TextDecoder('utf-16le').decode(buffer);
  }
  if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
    return new TextDecoder('utf-16be').decode(buffer);
  }

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(buffer);
  } catch {
    return new TextDecoder('windows-874').decode(buffer);
  }
}

/* ========================================
   CSV PARSING
   ======================================== */
function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    
    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    
    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }
    
    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }
    
    cell += char;
  }
  
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  
  return rows;
}

function normalizeHeader(header) {
  return String(header || '').trim().replace(/\\\*/g, '*');
}

/* ========================================
   DASHBOARD RENDERING
   ======================================== */
function renderDashboard(headers, rows) {
  const employeeIdIndex = findHeaderIndex(headers, 'Employee ID');
  const employeeNameIndex = findHeaderIndex(headers, 'Employee Name');
  const positionIndex = findHeaderIndex(headers, 'Position');

  const operationIndexes = headers
    .map((header, index) => ({ header, index }))
    .filter(item =>
      item.index !== employeeIdIndex &&
      item.index !== employeeNameIndex &&
      item.index !== positionIndex &&
      item.header
    );

  // Pre-compute cell data for both HTML rendering and metric calculations
  const allRowCells = rows.map(row =>
    operationIndexes.map(({ index }) => {
      const rawValue = String(row[index] || '').trim();
      return { percent: extractPercent(rawValue), approved: hasApprovalMark(rawValue) };
    })
  );

  // Main Skills: (A) cells >= 75% / total (A) cells
  let totalApproved = 0, approvedOver75 = 0;
  // Multi Skills: cells in ±2 sweep of each (A) cell >= 75% / total swept cells
  let multiTotal = 0, multiOver75 = 0;

  allRowCells.forEach(rowCells => {
    rowCells.forEach(({ percent, approved }) => {
      if (percent !== null && approved) {
        totalApproved++;
        if (percent >= 75) approvedOver75++;
      }
    });

    const swept = new Set();
    rowCells.forEach(({ percent, approved }, i) => {
      if (approved && percent !== null) {
        for (let j = Math.max(0, i - 1); j <= Math.min(rowCells.length - 1, i + 1); j++) {
          swept.add(j);
        }
      }
    });
    swept.forEach(i => {
      if (rowCells[i].percent !== null) {
        multiTotal++;
        if (rowCells[i].percent >= 75) multiOver75++;
      }
    });
  });

  const ctqPositions = new Set(
    operationIndexes
      .map(({ header }, pos) => /\(CTQ\)/i.test(header) ? pos : -1)
      .filter(pos => pos !== -1)
  );

  let html = '<thead><tr><th class="employee-head">Employee</th>';
  operationIndexes.forEach(({ header }, pos) => {
    const ctqAttr = ctqPositions.has(pos) ? ' class="ctq-col"' : '';
    html += `<th${ctqAttr}>${formatOperationHeader(header)}</th>`;
  });
  html += '</thead><tbody>';

  rows.forEach((row, rowIndex) => {
    const empId = escapeHtml(row[employeeIdIndex] || '');
    const empName = escapeHtml(row[employeeNameIndex] || '');

    html += `<tr data-row-index="${rowIndex}">
              <td class="employee-cell" title="Click to navigate skills">
                <span class="emp-id">${empId}</span>
                <span class="emp-name" title="${empName}">${empName}</span>
              </td>`;

    allRowCells[rowIndex].forEach(({ percent, approved }, operationPosition) => {
      const ctq = ctqPositions.has(operationPosition) ? ' ctq-col' : '';
      if (percent === null) {
        html += `<td class="empty-cell${ctq}"></td>`;
        return;
      }

      const color = getColor(percent);
      const overClass = percent > 100 ? ' over' : '';
      const approvedClass = approved ? ' approved-skill' : '';

      html += `<td class="skill-cell${approvedClass}${ctq}"
                    data-operation-position="${operationPosition}"
                    title="${percent}%${approved ? ' (A)' : ''}">
                ${renderDonut(percent, color, approved, overClass)}
               </td>`;
    });

    html += '</tr>';
  });

  html += '</tbody>';
  els.table.innerHTML = html;

  els.employees.textContent = rows.length.toLocaleString();
  els.operations.textContent = operationIndexes.length.toLocaleString();

  const mainPct = totalApproved > 0 ? Math.round(approvedOver75 / totalApproved * 100) : 0;
  els.filled.textContent = `${mainPct}%`;
  els.filledSub.textContent = `${approvedOver75}/${totalApproved}`;

  const multiPct = multiTotal > 0 ? Math.round(multiOver75 / multiTotal * 100) : 0;
  els.average.textContent = `${multiPct}%`;
  els.averageSub.textContent = `${multiOver75}/${multiTotal}`;

  els.statusPanel.classList.add('hidden');
  els.exportArea.classList.remove('hidden');
  els.btnPng.disabled = false;
  els.btnPdf.disabled = false;
}

/* ========================================
   EMPLOYEE CLICK HANDLER
   ======================================== */
const employeeSkillIndexMap = new Map();

function handleEmployeeClick(event) {
  const employeeCell = event.target.closest('.employee-cell');
  if (!employeeCell) return;

  const row = employeeCell.closest('tr');
  if (!row) return;

  const employeeKey = row.rowIndex;
  const skillCells = [...row.querySelectorAll('.skill-cell')]
    .filter(cell => cell.querySelector('.donut'));

  if (skillCells.length === 0) return;

  let index = employeeSkillIndexMap.get(employeeKey) ?? -1;
  index = (index + 1) % skillCells.length;
  employeeSkillIndexMap.set(employeeKey, index);

  const targetCell = skillCells[index];
  const container = els.tableWrap;

  // targetCell.offsetParent คือ <table> ซึ่งเริ่มที่ scroll origin = 0 ของ container
  // employeeCell.offsetParent ต่างกัน (sticky) จึงใช้แค่ offsetWidth ก็พอ
  const targetLeft = targetCell.offsetLeft - employeeCell.offsetWidth;

  container.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: 'smooth'
  });

  targetCell.classList.remove('skill-focus');
  setTimeout(() => {
    targetCell.classList.add('skill-focus');
    setTimeout(() => targetCell.classList.remove('skill-focus'), 1000);
  }, 50);
}


/* ========================================
   FILE INFO CARDS
   ======================================== */
function updateFileInfoCards(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  const soMatch    = base.match(/_SO(\d+)/i);
  const lineMatch  = base.match(/_Line(\d+)/i);
  const dateMatch  = base.match(/_(\d{4}-\d{2}-\d{2})$/);
  els.soNumber.textContent  = soMatch   ? soMatch[1]   : '—';
  els.lineNumber.textContent = lineMatch ? lineMatch[1] : '—';
  els.updateDate.textContent = dateMatch ? dateMatch[1] : '—';
}

/* ========================================
   HELPER FUNCTIONS
   ======================================== */
function findHeaderIndex(headers, name) {
  return headers.findIndex(header => header.toLowerCase() === name.toLowerCase());
}

function extractPercent(value) {
  if (!value) return null;
  const match = value.match(/(-?\d+(?:\.\d+)?)\s*%/);
  return match ? Math.round(Number(match[1])) : null;
}

function hasApprovalMark(value) {
  return /\(\s*(A|AC)\s*\)/i.test(String(value || ''));
}

function getColor(value) {
  if (value >= 100) return COLORS.green;
  if (value >= 80) return COLORS.yellow;
  if (value > 0) return COLORS.red;
  return COLORS.gray;
}

/* ========================================
   DONUT CHART RENDERING
   ======================================== */
function renderDonut(percent, color, approved, overClass) {
  const safePercent = Math.max(0, Math.min(percent, 100));
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - safePercent / 100);
  const approvedBadge = approved 
    ? '<span class="approved-badge" aria-label="Approved">A</span>' 
    : '';
  
  return `<div class="donut${overClass}" data-approved="${approved ? 'true' : 'false'}">
            <svg class="donut-svg" viewBox="0 0 64 64" aria-hidden="true">
              <circle class="donut-track" cx="32" cy="32" r="${radius}"></circle>
              <circle class="donut-progress" cx="32" cy="32" r="${radius}" 
                      style="stroke:${color};stroke-dasharray:${circumference};stroke-dashoffset:${dashOffset};">
              </circle>
            </svg>
            <span class="donut-value">${percent}%</span>
            ${approvedBadge}
          </div>`;
}

/* ========================================
   HEADER FORMATTING
   ======================================== */
function formatOperationHeader(header) {
  const smvMatch = header.match(/SMV\s*:\s*([^,\)]+)/i);
  const gradeMatch = header.match(/Grade\s*:\s*([^\)]+)/i);
  const title = header.replace(/\s*\(SMV:[^)]*\)/i, '').trim();
  const grade = gradeMatch ? gradeMatch[1].trim() : '';
  const gradeClass = grade 
    ? ` grade-${grade.toLowerCase().replace(/[^a-z0-9-]/g, '')}` 
    : '';
  
  return `<div class="operation-title" title="${escapeHtml(header)}">
            ${escapeHtml(title)}
          </div>
          <div class="operation-meta">
            ${smvMatch ? `<span class="badge">SMV ${escapeHtml(smvMatch[1].trim())}</span>` : ''}
            ${grade ? `<span class="badge${gradeClass}">Grade ${escapeHtml(grade)}</span>` : ''}
          </div>`;
}

/* ========================================
   THEME MANAGEMENT
   ======================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('skillDashboardTheme') || 'dark';
  setTheme(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme || 'dark';
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('skillDashboardTheme', theme);
  els.themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
}

/* ========================================
   UI HELPERS
   ======================================== */
function setStatus(title, message) {
  els.exportArea.classList.add('hidden');
  els.statusPanel.classList.remove('hidden');
  els.statusPanel.innerHTML = `<div>
                                <div class="empty-icon">◌</div>
                                <h2>${escapeHtml(title)}</h2>
                                <p>${escapeHtml(message)}</p>
                              </div>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getThemeBackground() {
  return getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0b1220';
}

/* ========================================
   EXPORT FUNCTIONS
   ======================================== */
async function exportPng() {
  if (!window.html2canvas) {
    alert('Export library is not loaded. Please connect to internet or use Print to PDF.');
    return;
  }
  
  const targetElement = els.exportArea;
  targetElement.classList.add('exporting-mode');
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const canvas = await html2canvas(targetElement, {
      backgroundColor: getThemeBackground(), // ถ้ามีปัญหา '#ffffff'
      scale: 2,
      useCORS: true,
      foreignObjectRendering: false,
      width: targetElement.scrollWidth,
      height: targetElement.scrollHeight,
      windowWidth: targetElement.scrollWidth,
      logging: false // ปิด Log
    });
    
    // 5. โหลดไฟล์
    const link = document.createElement('a');
    link.download = `skill-dashboard-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
  } catch (error) {
    console.error("Export Error:", error);
    alert("เกิดข้อผิดพลาดในการสร้างไฟล์ PNG");
  } finally {
    targetElement.classList.remove('exporting-mode');
  }
}

async function exportPdf() {
  if (!window.html2canvas || !window.jspdf?.jsPDF) {
    window.print();
    return;
  }

  const targetElement = els.exportArea;
  targetElement.classList.add('exporting-mode');
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const canvas = await html2canvas(targetElement, {
      backgroundColor: getThemeBackground(),
      scale: 3,
      useCORS: true,
      foreignObjectRendering: false,
      width: targetElement.scrollWidth,
      height: targetElement.scrollHeight,
      windowWidth: targetElement.scrollWidth,
      logging: false
    });

    const pdf = new window.jspdf.jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const usableWidth = pageWidth - margin * 2;
    const usableHeight = pageHeight - margin * 2;

    // Scale image to fit entirely within one page, preserving aspect ratio
    const canvasRatio = canvas.width / canvas.height;
    const pageRatio = usableWidth / usableHeight;

    let imgWidth, imgHeight;
    if (canvasRatio > pageRatio) {
      imgWidth = usableWidth;
      imgHeight = usableWidth / canvasRatio;
    } else {
      imgHeight = usableHeight;
      imgWidth = usableHeight * canvasRatio;
    }

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    pdf.save(`skill-dashboard-${new Date().toISOString().slice(0, 10)}.pdf`);
  } catch (error) {
    console.error('Export PDF Error:', error);
    alert('เกิดข้อผิดพลาดในการสร้างไฟล์ PDF');
  } finally {
    targetElement.classList.remove('exporting-mode');
  }
}