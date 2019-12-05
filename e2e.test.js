const puppeteer = require('puppeteer');
const AframeHelper = require('./puppeteer-aframe-helper');

jest.setTimeout(120000);

const browserFetcher = puppeteer.createBrowserFetcher();
// const revisionInfo = await browserFetcher.download('693954');
const revisionInfo = browserFetcher.revisionInfo('693954');  // You may need to uncomment the above line the first time you run this

let browser;
beforeAll(async () => {
    browser = await puppeteer.launch({ executablePath: revisionInfo.executablePath, headless: true, slowMo: false });
});

afterAll(async () => {
    browser.close();
});

describe('The box', () => {
    let page;

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://localhost:7000');
        await AframeHelper.waitForRenderStart(page);
        await AframeHelper.showHandControls(page);
    });

    it('should have a box on the right position', async () => {
        const box = await page.$('a-box');
        const position = await page.evaluate(box => box.object3D.position, box);
        expect(position).toStrictEqual({x: 0, y: 1.6, z: -3});
    });

    describe('When moving a hand closer to the box', () => {
        beforeEach(async () => {
            await AframeHelper.moveHand(page, {x: 0, y: 1.6, z: -2.5}, 'right');
        });

        it('should have the box turn yellow', async () => {
            const box = await page.$('a-box');
            const color = await page.evaluate(box => box.getAttribute('color'), box);
            expect(color).toBe('yellow');
        });
    });
});
