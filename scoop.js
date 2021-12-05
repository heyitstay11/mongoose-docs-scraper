/**
 * @module scoop
 * @requires cheerio 
 * @requires axios
 * 
 * @author Tayyab
 * @version 0.0.1
 * @description Returns the function to get the URL list
 */

/**
 * @constant {Object} cheerio library for scraping web pages
 */
const cheerio = require('cheerio');

/**
 * @constant {Object} axios library to make http requests
 */
const axios = require('axios');

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
 * @returns {Array.<string>} list of urls in docs 
 */
const scoop = async () => {
    /**
     * @type {Array.<string>} 
     */
    const urls = [];
    try {
        /**
         * @type {string} 
         */
        const { data } = await axios.get(URL);
        
        //loaded doc returned from cheerio that can be queried
        const $ = cheerio.load(data);

        // Scraping the elements with class - .pure-menu-item.sub-item
        $('.pure-menu-item.sub-item')
        .each(function(){
           // getting url from the anchor tag inside
           const url = $(this).find('a').attr('href');

           // adding the url to the urls list
           urls.push(BASE_URL + url);
        });
    } catch (error) {
       console.log(error);
       return [];
    }  
    return urls;
}

module.exports = scoop;