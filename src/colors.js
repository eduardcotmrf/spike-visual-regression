const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

function rgb2hex(orig){
var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
}

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.emulate(iPhone);
    await page.goto('https://www.youaremom.com');

    const header = await page.$('header#mrf-header');

    const hamburguerColor = await header.$eval('button>.mrf-Icon', (uiElement) => {
        return window.getComputedStyle(uiElement, null).getPropertyValue("fill");
    });

    const backgroundColor = await header.$eval('.mrf-level.mrf-firstLevel.mainColor', (uiElement) => {
        return window.getComputedStyle(uiElement, null).getPropertyValue("background-color");
    });

    let ui_properties = {
        hamburguerColor: rgb2hex(hamburguerColor),
        background: rgb2hex(backgroundColor)
    }

    console.log(ui_properties);

    await browser.close();
})();;




