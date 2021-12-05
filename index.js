/**
 * @module index
 * @requires puppeteer
 * @requires pdf-merger-js
 * @requires scoop
 * 
 * @author Tayyab
 * @version 0.0.1
 */

/**
 * @constant {Object} puppeteer library for automation task in browser
 */
const puppeteer = require('puppeteer');

/**
 * @constructor PDFMerger Class 
 */
const PDFMerger = require('pdf-merger-js');

/**
 * @function
 * @name urlList
 * @returns {Promise} list of urls 
 */
const urlList = require('./scoop');

/**
 * @constant {PDFMerger} merger instance of PDFMerger class
 */
const merger = new PDFMerger();


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
    for(i = 0; i < list.length; i++){
        try {
            const page = await browser.newPage();
            const fileName = pdfName(list[i]);

            await page.setDefaultNavigationTimeout(0);
            await page.goto(list[i], {waitUntil:'load'});
            await page.pdf({path: fileName, printBackground: true, format: 'A4'});
            
            pdfList.push(fileName);
            await page.close();
        } catch (error) {
            console.log("pdf Failed", error);
        }
    }
    return pdfList;
}


/**
 * 
 * @param {Array.<string>} list names for pdf files
 */
const mergePDF = async (list) => {
    for(i = 0; i < list.length; i++){
        merger.add(list[i]);
    }

    try{    
        await merger.save('full.pdf');
    }catch (error){
        console.log("merge Failed", error);
    }
    
}

/**
 * @function
 * @name main main function of whole script
 */
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const list = await urlList();
    const pdfList = await makePDFs(browser, list);
    await mergePDF(pdfList);
    await browser.close();
})();
