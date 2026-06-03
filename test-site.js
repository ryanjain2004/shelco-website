const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
        page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

        await page.goto('http://localhost:3000/parts', { waitUntil: 'networkidle0' });
        console.log('Page loaded');
        
        await browser.close();
    } catch (e) {
        console.error('SCRIPT ERROR:', e);
    }
})();
