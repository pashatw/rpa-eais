const puppeteer = require('puppeteer');

async function crawl() {
    const url = 'https://www.eais.go.kr/';
    const username = 'mufinetb56';
    const password = 'PbP6ChE73&aq';
    const keyword = '경기도 고양시 일산동구 강석로 152 강촌마을아파트 제701동 제2층 제202호';

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        });
        console.log('>waiting btnLogin');
        await page.waitForSelector('.btnLogin');

        console.log('>btnLogin ready');
        await page.$eval('.btnLogin', el =>
            el.click()
        );
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.focus('#membId');
        await page.type('#membId', username);
        await page.focus('#pwd');
        await page.type('#pwd', password);

        console.log('>loginForm submitted');
        await page.$eval('.loginForm .btnLogin', el =>
            el.click()
        );

        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        await page.waitForSelector('.btnDaum');
        await page.$eval('.btnDaum', el =>
            el.click()
        );
        await page.waitForSelector('.swal-button--confirm');
        await page.$eval('.swal-button--confirm', el =>
            el.click()
        );

        // await page.waitForSelector('.bldre1');
        // await page.$eval('.bldre1', el =>
        //     el.click()
        // );

        // await page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.waitForSelector('.registerUi');
        const registerUiElement = await page.$('.registerUi');
        const bldre1 = await registerUiElement.$('.bldre1');

        console.log('>finding bldre1...');
        await bldre1.$eval('a', el =>
            el.click()
        );

        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.waitForSelector('.btnAddrSrch');
        await page.$eval('.btnAddrSrch', el => el.click());

        await page.waitForSelector('.popAddrSearch');
        console.log('> type keyword:', keyword);
        await page.focus('#keyword');
        await page.type('#keyword', keyword);

        console.log('> btnNext clicked');
        await page.$eval('.popAddrSearch .btnNext', el => el.click());

        console.log('>address clicked');
        await page.waitForSelector('.addrList li:first-child button');
        await page.click('.addrList li:first-child button');

        console.log('>st2 clicked');
        await page.evaluate(() => {
            const elementToClick = document.querySelector('.st2 a');
            if (elementToClick) {
                elementToClick.click();
            }
        });

        console.log('>checkbox clicked');
        await page.evaluate(() => {
            const elementToClick = document.querySelector('div[comp-id="213"]');
            if (elementToClick) {
                elementToClick.click();
            }
        });
    } catch (error) {
        console.log('Error during crawling: ', error.message);
    } finally {
        // await browser.close();
    }

    return true;
}

crawl()
    .then(() => {
        console.log("Success");
    })
    .catch(error => {
        console.error('Error: ', error.message);
    });