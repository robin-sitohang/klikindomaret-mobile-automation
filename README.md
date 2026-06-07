# Klik Indomaret Mobile Automation

Automated mobile testing for Klik Indomaret Android app using WebDriverIO + Appium + Cucumber.

## Prerequisites

- Node.js >= 18
- Java JDK (for Appium)
- Android SDK & Platform Tools
- Android device/emulator

## Setup

```bash
git clone https://github.com/robin-sitohang/klikindomaret-mobile-automation.git
cd klikindomaret-mobile-automation
npm install
```

Copy `.env.sample` to `.env` and update the values:

```bash
cp .env.sample .env
```

Update these in `.env`:
- `UDID` — your device UDID (`adb devices`)
- `EMAIL` / `PASSWORD` — Klik Indomaret login credentials
- `APP_ACTIVITY` — get it via `adb shell dumpsys activity activities | grep "mResumedActivity"`

## Running Tests

```bash
# Run all tests
npm test

# Run a specific feature
npm run test:feature --name=checkout

# Run by tag
npm run test:tag --tag=smoke

```