/**
 * @module epub
 * @requires node-ebook-converter
 * 
 * @author Tayyab
 * @version 0.1.0
 */

const ebookConverter =  require('node-ebook-converter');
const fs =  require('fs');
const PDFdir = './PDF/';

const files = fs.readdirSync(PDFdir, (err) => {if(err) console.log(err)});

/**
 * @function
 * @name convertPdfToEpub
 * @param {Array.<string>} files pdf files in pdf directory
 * @description converts pdf files into epubs using ebook converter
 */
files.forEach(file => {
  file = file.replace('.pdf', '');
  ebookConverter.convert({
    input: `${PDFdir}${file}.pdf`,
    output:`./EPUB/${file}.epub`
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
})