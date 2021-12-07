/**
 * @module pdf
 * @requires puppeteer
 * @requires scoop
 * 
 * @author Tayyab
 * @version 0.1.0
 */

/**
 * @constant {Object} puppeteer library for automation task in browser
 */
const puppeteer = require('puppeteer');

/**
 * @function
 * @name urlList
 * @returns {Promise} list of urls 
 */
const urlList = require('./scoop');

/**
 * 
 * @param {string} link url of the page
 * @returns {string} name of the pdf file
 */
const pdfName = (link) => {
    link = link.replace('https://mongoosejs.com/docs/', '');
    link = link.replace('api/', 'api-');
    link = link.replace('.html', '.pdf');
    return link;
}

/**
 * 
 * @param {Object} browser browser instance made by puppeteer
 * @param {Array.<string>} list array of url links
 * @returns {Array.<string>} list of names for pdf files
 */
const makePDFs = async (browser, list) => {
    const pdfList = [];
    const fs = require('fs');
    fs.mkdirSync('./PDF');
    for(i = 0; i < list.length; i++){
        try {
            const page = await browser.newPage();
            const fileName = pdfName(list[i]);

            await page.setDefaultNavigationTimeout(0);
            await page.goto(list[i], {waitUntil:'load'});
            await page.pdf({path: './PDF/'+fileName, printBackground: true, format: 'A4'});
            console.log(fileName, ' created');
            pdfList.push(fileName);
            await page.close();
        } catch (error) {
            console.log("pdf Failed", error);
        }
    }
    return pdfList;
}


/**
 * @function
 * @name main 
 * @description main function of script
 */
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const list = await urlList();
    const pdfList = await makePDFs(browser, list);
    await browser.close();
})();
