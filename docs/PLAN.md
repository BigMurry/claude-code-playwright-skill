# Changelog

## [1.0.0] - 2024-03-12

### Added
- Initial release
- Playwright server (server.js) with `/render` and `/health` endpoints
- Claude Code skill definition (SKILL.md)
- Cross-platform support (macOS/Linux/Windows)
- Dynamic path detection (no hardcoded paths)
- npm scripts: start, stop, restart, install
- One-step install script (install.sh)

### Features
- Fetches JavaScript-rendered web pages
- Configurable wait time and timeout
- Support for waiting on CSS selectors
- Returns HTML and text content
- Cross-platform server stop commands

### Dependencies
- playwright ^1.40.0
- express ^4.18.2
- cors ^2.8.5
