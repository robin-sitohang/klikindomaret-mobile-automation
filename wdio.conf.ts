import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as glob from 'glob';
import { ITestCaseHookParameter } from '@cucumber/cucumber';

dotenv.config();

const isCI = process.env.CI === 'true';

export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,

    specs: [
        './test/feature/**/*.feature'
    ],
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': process.env.AUTOMATION_NAME || 'UiAutomator2',
        'appium:udid': process.env.UDID || '9911e29e',
        'appium:platformVersion': process.env.PLATFORM_VERSION || '16',
        'appium:app': process.env.APP_PATH || undefined,
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:dontStopAppOnReset': true,
        'appium:autoGrantPermissions': true,
        'appium:appPackage': process.env.APP_PACKAGE || 'com.indomaret.klikindomaret',
        'appium:appActivity': process.env.APP_ACTIVITY || '.SplashActivity',
        'appium:newCommandTimeout': 300,
        'appium:uiautomator2ServerInstallTimeout': 30000,
    }],

    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: isCI ? 30000 : 15000,
    connectionRetryTimeout: isCI ? 120000 : 120000,
    connectionRetryCount: isCI ? 3 : 1,

    specFileRetries: isCI ? 2 : 1,
    specFileRetriesDelay: 2,

    services: [
        ['appium', {
            logPath: './',
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: 4723,
                relaxedSecurity: true
            }
        }]
    ],

    framework: 'cucumber',

    reporters: [
        'spec',
        ['cucumberjs-json', {
            jsonFolder: './reports/json/',
            language: 'en',
        }]
    ],

    cucumberOpts: {
        require: ['./test/step-definitions/*.ts'],
        requireModule: ['ts-node/register'],
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
    },

    onPrepare: function () {
        const dirs = ['./reports', './reports/json', './reports/html', './reports/screenshots'];

        if (fs.existsSync('./reports')) {
            fs.rmSync('./reports', { recursive: true, force: true });
        }

        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    },

    beforeSession: function () {
        console.log('Tag Expression:', process.env.TAG);
    },

    beforeScenario: async function (_world: ITestCaseHookParameter) {
        await driver.activateApp(process.env.APP_PACKAGE as string);
    },

    afterStep: async function (_step, _scenario, result) {
        if (result.error) {
            const timestamp = new Date().getTime();
            await driver.saveScreenshot(
                `./reports/screenshots/screenshot-${timestamp}.png`
            );
        }
    },

    afterScenario: async function (_world, _result) {
        await driver.terminateApp(process.env.APP_PACKAGE as string, {});
    },

    onComplete: async function() {
        if (process.env.SKIP_REPORT === 'true') {
            return;
        }
        const jsonFiles = glob.sync('./reports/json/*.json');

        const metadata = {
            browser: {
                name: 'chrome',
                version: 'N/A'
            },
            device: process.env.DEVICE_NAME || 'Android Device',
            platform: {
                name: 'android',
                version: process.env.PLATFORM_VERSION || '13'
            }
        };

        let totalScenarios = 0;
        let passedScenarios = 0;
        let executionStartTime = new Date().toISOString();

        const globalScenarioAttempts = new Map();

        jsonFiles.forEach((file: string) => {
            const jsonData = JSON.parse(fs.readFileSync(file, 'utf8'));
            if (jsonData && jsonData.length > 0) {
                jsonData[0].metadata = metadata;

                jsonData.forEach((feature: any) => {
                    if (feature.elements) {
                        feature.elements.forEach((scenario: any) => {
                            if (scenario.type === 'background' || scenario.keyword === 'Background') {
                                return;
                            }

                            const scenarioName = scenario.name;
                            const featureName = feature.name;
                            const scenarioId = scenario.id || '';
                            const lineNumber = scenario.line || '';
                            const stepDetails = scenario.steps?.map((step: any) => step.name).join('|') || '';
                            const uniqueKey = `${featureName}::${scenarioName}::${scenarioId}::${lineNumber}::${stepDetails}`;

                            const allStepsPassed = scenario.steps?.every((step: any) =>
                                step.result?.status === 'passed'
                            ) || false;

                            const fileTimestamp = file.match(/_(\d+)\.json$/)?.[1] || Date.now().toString();

                            if (!globalScenarioAttempts.has(uniqueKey)) {
                                globalScenarioAttempts.set(uniqueKey, []);
                            }

                            globalScenarioAttempts.get(uniqueKey).push({
                                passed: allStepsPassed,
                                timestamp: parseInt(fileTimestamp),
                                fileName: file,
                                scenarioName: scenarioName,
                                featureName: featureName
                            });
                        });
                    }
                });

                fs.writeFileSync(file, JSON.stringify(jsonData, null, 2));
            }
        });

        globalScenarioAttempts.forEach((attempts) => {
            totalScenarios++;
            attempts.sort((a: any, b: any) => a.timestamp - b.timestamp);
            const anyAttemptPassed = attempts.some((attempt: any) => attempt.passed);
            if (anyAttemptPassed) {
                passedScenarios++;
            }
        });

        const successRate = totalScenarios > 0 ? Math.round((passedScenarios / totalScenarios) * 100) : 0;
        const allTestsPassed = passedScenarios === totalScenarios;
        const testStability = successRate === 100 ? 'Stable' : 'Needs Investigation';

        // @ts-ignore
        const reporter = (await import('multiple-cucumber-html-reporter')).default;
        reporter.generate({
            jsonDir: './reports/json/',
            reportPath: './reports/html/',
            customData: {
                title: 'Test Execution Summary',
                data: [
                    {label: 'Final Status', value: allTestsPassed ? 'All Tests Passed ✅' : 'Some Tests Failed ❌'},
                    {label: 'Total Scenarios', value: totalScenarios.toString()},
                    {label: 'Success Rate', value: `${successRate}% (final result)`},
                    {label: 'Test Stability', value: testStability},
                    {label: 'Project', value: 'Klik Indomaret Mobile Testing'},
                    {label: 'Release', value: '1.0.0'},
                    {label: 'Device', value: process.env.DEVICE_NAME || 'Android Device'},
                    {label: 'Platform', value: `Android ${process.env.PLATFORM_VERSION || '13'}`},
                    {label: 'Device UDID', value: process.env.UDID || '127.0.0.1:6555'},
                    {label: 'App Package', value: process.env.APP_PACKAGE || 'com.indomaret.klikindomaret'},
                    {label: 'Execution Start Time', value: executionStartTime}
                ]
            }
        });
    }
};
