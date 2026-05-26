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
   INTERNATIONALIZATION
   ======================================== */
const LANGS = ['en', 'th', 'vi', 'lo'];
const LANG_LABELS = { en: '🇬🇧', th: '🇹🇭', vi: '🇻🇳', lo: '🇱🇦' };

const TRANSLATIONS = {
  en: {
    eyebrow: 'Skill Matrix',
    appTitle: 'Skill Training Dashboard',
    importCsv: 'Import CSV',
    noFile: 'No file selected',
    exportPng: 'Export PNG',
    exportPdf: 'Export PDF',
    themeDark: 'Dark',
    themeLight: 'Light',
    tabAll: 'All',
    trainPlan: 'Training Plan',
    labelSO: 'SO',
    labelLine: 'Line',
    labelUpdate: 'Update',
    labelEmployees: 'Employees',
    labelOperations: 'Operations',
    labelMainSkills: 'Main Skills',
    labelMultiSkills: 'Multi Skills',
    empUnder: 'Main Skills <75%',
    empOver: 'Main skills ≥75%',
    empMulti: 'Multi Skills',
    opsNonCtq: 'Non-CTQ',
    opsCtq: 'CTQ',
    statusTitle: 'Please import CSV file',
    statusDesc: 'The dashboard will show only cells that have percentage values. Empty Excel cells will stay empty.',
    loadingTitle: 'Loading file...',
    loadingDesc: 'Please wait while the dashboard is being prepared.',
    ERR_NO_DATA: 'CSV has no data rows.',
    ERR_NO_COLUMNS: 'CSV must contain "Employee ID" and "Employee Name" columns.',
    errReadFile: 'Cannot read this file',
    errExportLib: 'Export library is not loaded. Please connect to internet or use Print to PDF.',
    errExportPng: 'Error creating PNG file',
    errExportPdf: 'Error creating PDF file',
  },
  th: {
    eyebrow: 'ตารางทักษะ',
    appTitle: 'แดชบอร์ดการฝึกทักษะ',
    importCsv: 'นำเข้า CSV',
    noFile: 'ยังไม่ได้เลือกไฟล์',
    exportPng: 'ส่งออก PNG',
    exportPdf: 'ส่งออก PDF',
    themeDark: 'มืด',
    themeLight: 'สว่าง',
    tabAll: 'ทั้งหมด',
    trainPlan: 'แผนการฝึก',
    labelSO: 'SO',
    labelLine: 'Line',
    labelUpdate: 'Update',
    labelEmployees: 'Employees',
    labelMainSkills: 'Main Skills',
    labelMultiSkills: 'Multi Skills',
    empUnder: 'Main Skills <75%',
    empOver: 'Main skills ≥75%',
    empMulti: 'Multi Skills',
    opsNonCtq: 'Non-CTQ',
    opsCtq: 'CTQ',
    statusTitle: 'กรุณานำเข้าไฟล์ CSV',
    statusDesc: 'แดชบอร์ดจะแสดงเฉพาะช่องที่มีค่าเปอร์เซ็นต์เท่านั้น ช่องว่างใน Excel จะแสดงเป็นช่องว่าง',
    loadingTitle: 'กำลังโหลดไฟล์...',
    loadingDesc: 'กรุณารอสักครู่ขณะเตรียมแดชบอร์ด',
    ERR_NO_DATA: 'CSV ไม่มีแถวข้อมูล',
    ERR_NO_COLUMNS: 'CSV ต้องมีคอลัมน์ "Employee ID" และ "Employee Name"',
    errReadFile: 'ไม่สามารถอ่านไฟล์นี้ได้',
    errExportLib: 'ไม่พบไลบรารีสำหรับส่งออก กรุณาเชื่อมต่ออินเทอร์เน็ตหรือใช้การพิมพ์เป็น PDF',
    errExportPng: 'เกิดข้อผิดพลาดในการสร้างไฟล์ PNG',
    errExportPdf: 'เกิดข้อผิดพลาดในการสร้างไฟล์ PDF',
  },
  vi: {
    eyebrow: 'Ma Trận Kỹ Năng',
    appTitle: 'Bảng Đào Tạo Kỹ Năng',
    importCsv: 'Nhập CSV',
    noFile: 'Chưa chọn tệp',
    exportPng: 'Xuất PNG',
    exportPdf: 'Xuất PDF',
    themeDark: 'Tối',
    themeLight: 'Sáng',
    tabAll: 'Tất cả',
    trainPlan: 'Kế hoạch đào tạo',
    labelSO: 'SO',
    labelLine: 'Line',
    labelUpdate: 'Update',
    labelEmployees: 'Employees',
    labelOperations: 'Operations',
    labelMainSkills: 'Main Skills',
    labelMultiSkills: 'Multi Skills',
    empUnder: 'Main Skills <75%',
    empOver: 'Main skills ≥75%',
    empMulti: 'Multi Skills',
    opsNonCtq: 'Non-CTQ',
    opsCtq: 'CTQ',
    statusTitle: 'Vui lòng nhập tệp CSV',
    statusDesc: 'Bảng chỉ hiển thị các ô có giá trị phần trăm. Các ô trống trong Excel sẽ vẫn trống.',
    loadingTitle: 'Đang tải tệp...',
    loadingDesc: 'Vui lòng chờ trong khi bảng được chuẩn bị.',
    ERR_NO_DATA: 'CSV không có hàng dữ liệu.',
    ERR_NO_COLUMNS: 'CSV phải chứa cột "Employee ID" và "Employee Name".',
    errReadFile: 'Không thể đọc tệp này',
    errExportLib: 'Thư viện xuất chưa được tải. Vui lòng kết nối internet hoặc dùng In thành PDF.',
    errExportPng: 'Lỗi khi tạo tệp PNG',
    errExportPdf: 'Lỗi khi tạo tệp PDF',
  },
  lo: {
    eyebrow: 'ຕາຕະລາງທັກສະ',
    appTitle: 'ແຜງຄວບຄຸມການຝຶກທັກສະ',
    importCsv: 'ນຳເຂົ້າ CSV',
    noFile: 'ຍັງບໍ່ໄດ້ເລືອກໄຟລ໌',
    exportPng: 'ສົ່ງອອກ PNG',
    exportPdf: 'ສົ່ງອອກ PDF',
    themeDark: 'ມືດ',
    themeLight: 'ສະຫວ່າງ',
    tabAll: 'ທັງໝົດ',
    trainPlan: 'ແຜນການຝຶກ',
    labelSO: 'SO',
    labelLine: 'Line',
    labelUpdate: 'Update',
    labelEmployees: 'Employees',
    labelOperations: 'Operations',
    labelMainSkills: 'Main Skills',
    labelMultiSkills: 'Multi Skills',
    empUnder: 'Main Skills <75%',
    empOver: 'Main skills ≥75%',
    empMulti: 'Multi Skills',
    opsNonCtq: 'Non-CTQ',
    opsCtq: 'CTQ',
    statusTitle: 'ກະລຸນານຳເຂົ້າໄຟລ໌ CSV',
    statusDesc: 'ແຜງຈະສະແດງສະເພາະຊ່ອງທີ່ມີຄ່າເປີເຊັນເທົ່ານັ້ນ ຊ່ອງຫວ່າງໃນ Excel ຈະຍັງເປັນຊ່ອງຫວ່າງ',
    loadingTitle: 'ກຳລັງໂຫຼດໄຟລ໌...',
    loadingDesc: 'ກະລຸນາລໍຖ້າໃນຂະນະທີ່ກຳລັງກຽມແຜງ',
    ERR_NO_DATA: 'CSV ບໍ່ມີແຖວຂໍ້ມູນ',
    ERR_NO_COLUMNS: 'CSV ຕ້ອງມີຖັນ "Employee ID" ແລະ "Employee Name"',
    errReadFile: 'ບໍ່ສາມາດອ່ານໄຟລ໌ນີ້ໄດ້',
    errExportLib: 'ບໍ່ພົບໄລບ້າລີສຳລັບສົ່ງອອກ ກະລຸນາເຊື່ອມຕໍ່ອິນເຕີເນັດ ຫຼື ໃຊ້ການພິມເປັນ PDF',
    errExportPng: 'ເກີດຂໍ້ຜິດພາດໃນການສ້າງໄຟລ໌ PNG',
    errExportPdf: 'ເກີດຂໍ້ຜິດພາດໃນການສ້າງໄຟລ໌ PDF',
  }
};

let currentLang = 'en';
let hasFileSelected = false;


function t(key) {
  return (TRANSLATIONS[currentLang] || TRANSLATIONS.en)[key]
      ?? TRANSLATIONS.en[key]
      ?? key;
}

function initLanguage() {
  currentLang = localStorage.getItem('skillDashboardLang') || 'en';
  applyLanguage();
}

function cycleLanguage() {
  const idx = LANGS.indexOf(currentLang);
  currentLang = LANGS[(idx + 1) % LANGS.length];
  localStorage.setItem('skillDashboardLang', currentLang);
  applyLanguage();
}

function applyLanguage() {
  els.langLabel.textContent = LANG_LABELS[currentLang];

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  // Update fileName only if no file has been selected yet
  if (!hasFileSelected) {
    els.fileName.textContent = t('noFile');
  }

  // Re-apply theme label in the current language
  const theme = document.documentElement.dataset.theme || 'dark';
  els.themeLabel.textContent = t(theme === 'dark' ? 'themeDark' : 'themeLight');
}

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
  langToggle: document.getElementById('langToggle'),
  langLabel: document.getElementById('langLabel'),
  viewTabs: document.getElementById('viewTabs'),
  soNumber: document.getElementById('metricSO'),
  lineNumber: document.getElementById('metricLine'),
  updateDate: document.getElementById('metricUpdate'),
  employees: document.getElementById('metricEmployees'),
  empUnder: document.getElementById('metricEmpUnder'),
  empOver: document.getElementById('metricEmpOver'),
  empMulti: document.getElementById('metricEmpMulti'),
  operations: document.getElementById('metricOperations'),
  opsNonCtq: document.getElementById('metricOpsNonCtq'),
  opsCtq: document.getElementById('metricOpsCtq'),
  filled: document.getElementById('metricFilled'),
  filledSub: document.getElementById('metricFilledSub'),
  average: document.getElementById('metricAverage'),
  averageSub: document.getElementById('metricAverageSub')
};

/* ========================================
   VIEW FILTER STATE
   ======================================== */
let currentView = 'all';
let currentSubView = 'main-complete';
let currentMode = 'all';       // 'all' | 'train'
let lastAllRowCells = [];      // saved from renderDashboard for column filtering

/* ── Close all open dropdowns ─────────────────────────────────────── */
function closeAllDropdowns() {
  document.querySelectorAll('.tab-group.open').forEach(g => g.classList.remove('open'));
}

/* ── Column filter for Training Plan mode ─────────────────────────── */
function applyColumnFilter() {
  const ths = [...els.table.querySelectorAll('thead th')];
  const numOps = ths.length - 1; // first th is the employee column
  const showCol = new Array(numOps).fill(true);

  if ((currentView === 'main-under' || currentView === 'multi-under') && currentMode === 'train') {
    showCol.fill(false);

    const visibleRowIndices = [];
    els.table.querySelectorAll('tbody tr').forEach(row => {
      if (row.style.display !== 'none') {
        const idx = parseInt(row.dataset.rowIndex, 10);
        if (!isNaN(idx)) visibleRowIndices.push(idx);
      }
    });

    visibleRowIndices.forEach(rowIdx => {
      const rowCells = lastAllRowCells[rowIdx];
      if (!rowCells) return;

      if (currentView === 'main-under') {
        // Show column j if this employee has an (A) cell at j that is <75%
        rowCells.forEach(({ percent, approved }, j) => {
          if (approved && percent !== null && percent < 75) showCol[j] = true;
        });
      } else {
        // multi-under: for each (A) cell at k, sweep ±1; show those positions if <75%
        rowCells.forEach(({ approved }, k) => {
          if (!approved) return;
          for (let j = Math.max(0, k - 1); j <= Math.min(rowCells.length - 1, k + 1); j++) {
            const nb = rowCells[j];
            if (nb.percent !== null && nb.percent < 75) showCol[j] = true;
          }
        });
      }
    });
  }

  // Apply visibility to header ths and all body tds
  ths.forEach((th, thIdx) => {
    if (thIdx === 0) return;
    th.style.display = showCol[thIdx - 1] ? '' : 'none';
  });
  els.table.querySelectorAll('tbody tr').forEach(row => {
    [...row.querySelectorAll('td')].forEach((td, tdIdx) => {
      if (tdIdx === 0) return;
      td.style.display = showCol[tdIdx - 1] ? '' : 'none';
    });
  });
}

function applyFilter(view, subView, mode) {
  if (view !== undefined) currentView = view;
  if (subView != null)    currentSubView = subView;
  if (mode !== undefined) currentMode = mode;

  // Update main tab active states
  els.viewTabs?.querySelectorAll('.view-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === currentView);
  });

  // Update dropdown item active states
  els.viewTabs?.querySelectorAll('.dropdown-item').forEach(item => {
    let isActive = false;
    if (item.dataset.sub) {
      isActive = item.dataset.view === currentView && item.dataset.sub === currentSubView;
    } else if (item.dataset.mode) {
      isActive = item.dataset.view === currentView && item.dataset.mode === currentMode;
    }
    item.classList.toggle('active', isActive);
  });

  // Show / hide table rows
  els.table.querySelectorAll('tbody tr').forEach(row => {
    const cats = row.dataset.cat ? row.dataset.cat.split(' ') : [];
    let show = false;

    if (currentView === 'all') {
      show = true;
    } else if (currentView === 'main-under') {
      show = cats.includes('main-under');
    } else if (currentView === 'multi-under') {
      show = cats.includes('multi-under');
    } else if (currentView === 'complete') {
      show = cats.includes(currentSubView);
    }

    row.style.display = show ? '' : 'none';
  });

  // Apply column filter (Training Plan mode)
  applyColumnFilter();
}

/* ========================================
   INITIALIZATION
   ======================================== */
initTheme();
initLanguage();
els.fileInput.addEventListener('change', handleFile);
els.btnPng.addEventListener('click', exportPng);
els.btnPdf.addEventListener('click', exportPdf);
els.themeToggle.addEventListener('click', toggleTheme);
els.langToggle.addEventListener('click', cycleLanguage);
els.table.addEventListener('click', handleEmployeeClick);

els.viewTabs.addEventListener('click', e => {
  const dropdownItem = e.target.closest('.dropdown-item');
  const tabBtn = e.target.closest('.view-tab');

  if (dropdownItem) {
    closeAllDropdowns();
    const view = dropdownItem.dataset.view;
    const sub  = dropdownItem.dataset.sub;
    const mode = dropdownItem.dataset.mode;
    if (sub)  applyFilter(view, sub, 'all');
    else      applyFilter(view, null, mode || 'all');
    return;
  }

  if (tabBtn) {
    if (tabBtn.classList.contains('has-dropdown')) {
      const group = tabBtn.closest('.tab-group');
      const wasOpen = group.classList.contains('open');
      closeAllDropdowns();
      if (!wasOpen) group.classList.add('open');
    } else {
      closeAllDropdowns();
      applyFilter(tabBtn.dataset.view, null, 'all');
    }
  }
});

document.addEventListener('click', e => {
  if (!e.target.closest('#viewTabs')) closeAllDropdowns();
});

/* ========================================
   FILE HANDLING
   ======================================== */
async function handleFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  hasFileSelected = true;
  els.fileName.textContent = file.name;
  updateFileInfoCards(file.name);
  setStatus(t('loadingTitle'), t('loadingDesc'));

  // Reset per-file state so cycling doesn't leak across imports
  employeeSkillIndexMap.clear();
  els.tableWrap.scrollLeft = 0;

  try {
    const text = await readFileAsText(file);
    const rows = parseCsv(text);

    if (rows.length < 2) throw new Error('ERR_NO_DATA');

    const headers = rows[0].map(normalizeHeader);

    if (findHeaderIndex(headers, 'Employee ID') === -1 || findHeaderIndex(headers, 'Employee Name') === -1) {
      throw new Error('ERR_NO_COLUMNS');
    }

    const dataRows = rows.slice(1).filter(row =>
      row.some(cell => String(cell || '').trim() !== '')
    );

    renderDashboard(headers, dataRows);
  } catch (error) {
    console.error(error);
    const msg = TRANSLATIONS.en[error.message] != null ? t(error.message) : error.message;
    setStatus(t('errReadFile'), msg);
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
  lastAllRowCells = allRowCells;

  // ── Aggregate metrics ─────────────────────────────────────────────────
  let totalApproved = 0, approvedOver75 = 0;
  let multiTotal = 0, multiOver75 = 0;
  let empUnderCount = 0, empOverCount = 0, empMultiCount = 0;

  // Per-row category strings for filter tabs
  const rowCategories = allRowCells.map(rowCells => {
    const cats = ['all'];

    // Main Skills aggregate
    rowCells.forEach(({ percent, approved }) => {
      if (percent !== null && approved) {
        totalApproved++;
        if (percent >= 75) approvedOver75++;
      }
    });

    // Multi Skills sweep ±1
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

    // Per-employee classification for filter tabs
    const approvedWithPct = rowCells.filter(c => c.approved && c.percent !== null);
    if (approvedWithPct.length > 0) {
      // Page 1: ALL (A) cells < 75%
      if (approvedWithPct.every(c => c.percent < 75)) {
        cats.push('main-under');
        empUnderCount++;
      }
      // Page 3 sub-tab 1: ALL (A) cells >= 75%
      if (approvedWithPct.every(c => c.percent >= 75)) {
        cats.push('main-complete');
        empOverCount++;
      }

      // Page 2 / Page 3 sub-tab 2: multi-skills check
      let multiComplete = true;
      rowCells.forEach(({ percent, approved }, i) => {
        if (!approved || percent === null) return;
        for (let j = Math.max(0, i - 1); j <= Math.min(rowCells.length - 1, i + 1); j++) {
          const nb = rowCells[j];
          if (nb.percent !== null && nb.percent < 75) multiComplete = false;
        }
      });

      if (!multiComplete) cats.push('multi-under');   // Page 2
      if (multiComplete) {
        cats.push('multi-complete');                   // Page 3 sub-tab 2
        empMultiCount++;
      }
    }

    return cats.join(' ');
  });

  // ── Operations sub-metrics ────────────────────────────────────────────
  const ctqOpsCount = operationIndexes.filter(({ header }) => /\(CTQ\)/i.test(header)).length;
  const nonCtqOpsCount = operationIndexes.length - ctqOpsCount;

  const ctqPositions = new Set(
    operationIndexes
      .map(({ header }, pos) => /\(CTQ\)/i.test(header) ? pos : -1)
      .filter(pos => pos !== -1)
  );

  // ── Build table HTML ──────────────────────────────────────────────────
  let html = '<thead><tr><th class="employee-head">Employee</th>';
  operationIndexes.forEach(({ header }, pos) => {
    const ctqAttr = ctqPositions.has(pos) ? ' class="ctq-col"' : '';
    html += `<th${ctqAttr}>${formatOperationHeader(header)}</th>`;
  });
  html += '</thead><tbody>';

  rows.forEach((row, rowIndex) => {
    const empId = escapeHtml(row[employeeIdIndex] || '');
    const empName = escapeHtml(row[employeeNameIndex] || '');

    html += `<tr data-row-index="${rowIndex}" data-cat="${rowCategories[rowIndex]}">
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
                    title="${percent}%${approved ? ' (A)' : ''}">
                ${renderDonut(percent, color, approved, overClass)}
               </td>`;
    });

    html += '</tr>';
  });

  html += '</tbody>';
  els.table.innerHTML = html;

  // ── Update metric cards ───────────────────────────────────────────────
  els.employees.textContent = rows.length.toLocaleString();
  els.empUnder.textContent = empUnderCount.toLocaleString();
  els.empOver.textContent = empOverCount.toLocaleString();
  els.empMulti.textContent = empMultiCount.toLocaleString();

  els.operations.textContent = operationIndexes.length.toLocaleString();
  els.opsNonCtq.textContent = nonCtqOpsCount.toLocaleString();
  els.opsCtq.textContent = ctqOpsCount.toLocaleString();

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

  // Reset to "All" view whenever a new file is loaded
  applyFilter('all', 'main-complete', 'all');
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
  const soMatch   = base.match(/_SO(\d+)/i);
  const lineMatch = base.match(/_Line(\d+)/i);
  // Allow date anywhere in the filename (not just at end), pick the last match
  const dateMatches = base.match(/\d{4}-\d{2}-\d{2}/g);
  const date = dateMatches ? dateMatches[dateMatches.length - 1] : null;
  els.soNumber.textContent   = soMatch   ? soMatch[1]   : '—';
  els.lineNumber.textContent = lineMatch ? lineMatch[1] : '—';
  els.updateDate.textContent = date      ? date         : '—';
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

  return `<div class="donut${overClass}">
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
  els.themeLabel.textContent = t(theme === 'dark' ? 'themeDark' : 'themeLight');
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
    alert(t('errExportLib'));
    return;
  }

  const targetElement = els.exportArea;
  targetElement.classList.add('exporting-mode');
  // Give the browser one paint after `exporting-mode` applies so html2canvas
  // captures the un-stickied, full-width layout.
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const canvas = await html2canvas(targetElement, {
      backgroundColor: getThemeBackground(),
      scale: 2,
      useCORS: true,
      foreignObjectRendering: false,
      width: targetElement.scrollWidth,
      height: targetElement.scrollHeight,
      windowWidth: targetElement.scrollWidth,
      logging: false
    });

    const link = document.createElement('a');
    link.download = `skill-dashboard-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

  } catch (error) {
    console.error("Export Error:", error);
    alert(t('errExportPng'));
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
    alert(t('errExportPdf'));
  } finally {
    targetElement.classList.remove('exporting-mode');
  }
}
