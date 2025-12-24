## [0.2.0] - 2025-12-24
### Changed
- Refactor "Found in" and changed into "Loot Area"
- Removed `found_in_id` from items table

### Improved
- Loot Areas loading performance 
- Loading performance of items list 
- Loading performance of main page 
- Data integrity through relational database constraints
- Ability to assign multiple Loot Areas to a single Item

### Added 
- Icons for Loot Areas stored in storage/app/public/icons 
- Loot Area icon path stored in database 
- `item_loot_area` pivot table to handle Item ↔ Loot Area relationships

## [0.1.1] - 2025-12-19
### Added
- Initial unit and feature tests

## [0.1.0] - 2025-11-30
### Added
- Initial project structure
- Item browsing
- Item details view
- External API import
- User authentication
- Responsive UI built with React
