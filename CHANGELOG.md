# Changelog

## [1.2.0] - 2026-05-26
### Added
- Special approved skill UI for CSV cells that contain `(A)`.
- Approved cells now show a Google-themed gradient highlight, inner frame, and `✓ A` badge.

### Fixed
- PNG/PDF export now captures colored donut charts by replacing CSS conic-gradient donut rendering with inline SVG donut rendering.

### Preserved User Change
- Kept employee click auto-scroll offset at `-1` as requested by the user.

### Not Changed
- CSV parser logic remains the same.
- Empty cell behavior remains the same.
- Position column remains excluded.
- Employee ID + Employee Name combined column remains the same.
- Dark/Light theme system remains the same.

## [1.1.0] - 2026-05-26
### Added
- Click Employee cell to auto-scroll horizontally to the first available skill in that employee row.
- Visual pulse highlight on the target skill cell after auto-scroll.
- Dark/Light theme toggle with Google company color tokens.
- Theme persistence with `localStorage`.
- `VERSION.json` for version control metadata.

## [1.0.0] - 2026-05-26
### Added
- Initial production dashboard.
- CSV import.
- CSS donut charts.
- Empty Excel cells remain empty.
- Employee ID + Employee Name combined column.
- Position column excluded.
- PNG/PDF export.
