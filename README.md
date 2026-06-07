#### How to set up
```
git clone https://github.com/robin-sitohang/wdio_mobile_swaglabs_apps.git

npm install
```

#### How To Run in Local Browser
```
npm run wdio

```

# WebDriverIO Mobile Testing on Windows

This repository contains automated mobile testing scripts using WebDriverIO framework.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js and npm
- Git
- Android SDK and Platform Tools
- Git Bash (for path verification)

## Installation and Setup

### 1. Clone Repository
```bash
git clone https://github.com/robin-sitohang/wdio_mobile_swaglabs_apps.git
cd wdio_mobile_apps
```

### 2. Install Initial Dependencies
```bash
npm install
```

### 3. Update package.json
Add the following to your devDependencies:
```json
"@wdio/cli": "^9.5.1"
```

### 4. Install Additional Dependencies
```bash
npm install
```

### 5. Update Scripts
Update the scripts section in package.json:
```json
"scripts": {
  "test": "npx @wdio/cli run ./wdio.conf.ts",
  "test:report": "npx @wdio/cli run wdio.conf.ts && open reports/html/index.html",
  "test:feature": "npx @wdio/cli run ./wdio.conf.ts --spec ./features/$npm_config_name.feature",
  "test:tag": "npx @wdio/cli run ./wdio.conf.ts --cucumberOpts.tagExpression=\"@$npm_config_tag\""
}
```

### 6. Configure Device Settings

#### a. Update UDID
1. Get your device UDID by running:
```bash
adb devices
```

2. Update the UDID in `.env` file:
```bash
UDID=R9RW102YXZX  # Replace with your device UDID
```

#### b. Update APK Path
1. Update the APK path in `.env` file to match your local path:
```bash
APP_PATH=c:/Users/trias/OneDrive/Dokumen/apk/Android.SauceLabs.Mobile.Sample.app.2.4.0.apk
```

2. Verify the APK path using Git Bash:
```bash
ls -l /c/Users/trias/OneDrive/Dokumen/apk/Android.SauceLabs.Mobile.Sample.app.2.4.0.apk
```

#### c. Set Up APP_PACKAGE and APP_ACTIVITY
1. Make sure the app is opened in emulator or device

2. Run this command
```bash
adb shell dumpsys activity activities | findstr "mResumedActivity"
```

3. Copy `id.kompas.turvis` as `APP_PACKAGE` data and `.MainActivity` as `APP_ACTIVITY` data

4. Paste in `.env`

## Running Tests

### Basic Test Execution
```bash
npm run test
```

### Additional Commands
- Run a specific feature:
  ```bash
  npm run test:feature --name=<feature_name>
  ```

- Run tests with specific tag:
  ```bash
  npm run test:tag --tag=<tag_name>
  ```
  or
  ```bash
  npm run test -- --cucumberOpts.tagExpression='@tag_name'
  ```

- Generate HTML report:
  ```bash
  npm run test:report
  ```

## Troubleshooting

If you encounter any issues:
1. Ensure your Android device is properly connected and detected (`adb devices`)
2. Verify the APK path is correct
3. Make sure all dependencies are properly installed
4. Check that the UDID in `.env` matches your connected device

## Contributing

Feel free to submit issues and enhancement requests.

## License

[MIT License](LICENSE)


