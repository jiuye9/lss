# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This repository contains a Chinese traditional astrology application focused on 八字排盘 (BaZi chart calculation). The project is organized as follows:

```
lss/
├── enhanced-bazi-calculator.html    # Desktop version (~2162 lines)
├── mobile-bazi-calculator.html      # Mobile version (~1190 lines)
├── README.md                        # Chinese documentation
└── CLAUDE.md                        # Project instructions for Claude Code
```

## Application Overview

### Core Functionality

The project implements a traditional Chinese astrology calculator that computes 八字 (Four Pillars of Destiny) based on birth date/time. Key features include:

- **High-precision astronomical calculations**: Uses Julian day calculations and solar longitude algorithms
- **True solar time corrections**: Supports timezone and geographic coordinate adjustments
- **Complete BaZi system**: Calculates year, month, day, and hour pillars with Ten Gods (十神) analysis
- **Dual interface design**: Desktop version with colorful gradient design, mobile version with cyan tech-style UI

### Architecture

Both HTML files are **self-contained single-page applications** with no external dependencies:

1. **CSS Styling**: Embedded responsive design with CSS custom properties for theming
2. **JavaScript Logic**: All calculation algorithms embedded inline
3. **No Build System**: Direct browser execution, no compilation needed

### Key Algorithms

The core calculation functions (found in both versions):

- `toJulianDay()` - Converts Gregorian dates to Julian day numbers
- `solarLongitude()` - Calculates solar position for seasonal determination
- `findSolarLongitudeTime()` - Determines exact timing of solar terms (节气)
- `calculateYearPillar()` - Computes year stem-branch based on Lichun (立春)
- `calculateMonthPillar()` - Determines monthly stems based on solar terms
- `calculateDayPillar()` - Uses 1985-04-07 (JD 2446162.5) as calibration reference point
- `calculateHourPillar()` - Handles true solar time corrections and midnight transitions
- `calculateTenGod()` - Analyzes Ten Gods (十神) relationships for fortune telling

### Design Patterns

- **No Framework Architecture**: Pure vanilla HTML/CSS/JS implementation
- **Embedded Resource Pattern**: All assets (styles, scripts) contained within HTML files
- **Responsive Design**: Mobile-first approach with device-specific optimizations
- **Algorithm Verification**: Built-in test cases (e.g., 1985年4月7日 = 丙子日 癸巳时)

## Development Commands

Since this is a static HTML project with no build system:

**Testing**: Open HTML files directly in browser
**Debugging**: Use browser developer tools
**Validation**: Test with verification cases - 1985年4月7日子时 should output 乙丑年庚辰月丙子日戊子时 (癸巳时)

## Verification and Testing

### Critical Test Cases

When making changes to calculation algorithms, verify against these known cases:

- **1985年4月7日子时**: Should produce 乙丑年庚辰月丙子日戊子时
- **Solar terms boundary testing**: Verify year pillar changes at Lichun (立春)
- **Midnight hour transitions**: Test 23:00-01:00 time range for correct day/hour pillar calculation
- **True solar time**: Test geographical corrections with different longitudes

### Algorithm Accuracy Standards

- Julian Day calculations must match astronomical standards
- Solar longitude precision should be within ±0.01 degrees
- Day pillar calculations use JD 2446162.5 (1985-04-07) as verified reference point

## Code Conventions

- **Language**: Mixed Chinese/English (UI in Chinese, code comments and variable names in English)
- **Styling**: CSS custom properties for consistent theming
- **Algorithm Naming**: Descriptive function names following the calculation flow
- **Color Schemes**: Desktop uses purple gradients, mobile uses cyan tech theme
- **Responsive Approach**: Desktop-first for enhanced version, mobile-optimized for mobile version
