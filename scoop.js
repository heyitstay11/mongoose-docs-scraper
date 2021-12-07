/**
 * @module scoop
 * @requires puppeteer 
 * 
 * @author Tayyab
 * @version 0.1.0
 * @description Returns the function to get the URL list
 */


/**
 * @constant {Object} puppeteer library for web scraping and automation
 */
const puppeteer = require('puppeteer');

/**
 * @const {string} BASE_URL base url of mongoose site
 */
const BASE_URL = 'https://mongoosejs.com';

/**
 * @const {string} URL url of the site to scrape
 */
const URL = `${BASE_URL}/docs/guide.html`;


/**
 * @description async function to get scraped data
 * @returns {Promise} list of urls in docs 
 */
const scoop = async () => {
    // Craete a browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Navigate to URL
    await page.goto(URL, {waitUntil: 'load', timeout: 0});

    try {
        // Scrape the URLs from the page
        let urls = await page.$$eval('.pure-menu-item.sub-item > a', links => {
           return links.map((link) => link.href);
        });
        await page.close();
        await browser.close();
        return urls;
    } catch (error) {
        await page.close();
        await browser.close();
        console.log(error);
        return []
    }
}

module.exports = scoop;