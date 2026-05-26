# Skill Training Dashboard PRO

Current version: `1.2.0`

## วิธีใช้งาน
1. แตกไฟล์ ZIP
2. เปิด `index.html` ด้วย Chrome หรือ Edge
3. กด Import CSV และเลือกไฟล์ที่ export จากระบบ
4. ช่องที่ว่างใน CSV จะไม่แสดงกราฟ
5. กดที่ชื่อ Employee เพื่อเลื่อนไปยัง Skill แรกที่มีข้อมูลของพนักงานคนนั้น
6. กดปุ่ม Dark/Light เพื่อเปลี่ยนธีม
7. ช่องที่มี `(A)` จะมีกรอบ/Badge พิเศษเพื่อแยกจากช่องปกติ
8. กด Export PNG หรือ Export PDF

## โครงสร้างไฟล์
- `index.html` = layout หลัก
- `styles.css` = UI/UX, Theme Tokens, Approved Skill UI
- `app.js` = CSV parser, render table, click-to-skill, SVG donut, theme toggle, export PNG/PDF
- `VERSION.json` = version metadata
- `CHANGELOG.md` = version control log

## v1.2.0 Notes
- คงค่า auto-scroll offset ที่ผู้ใช้ปรับไว้เป็น `-1` เพื่อให้ skill cell ชิดกับชื่อ Employee
- เปลี่ยน donut chart เป็น inline SVG เพื่อให้ html2canvas/jsPDF export สีกราฟออกมาได้เสถียรกว่า CSS conic-gradient
