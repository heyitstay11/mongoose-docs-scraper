# Mongoose Docs PDF 

Uses
- Puppeteer
- <strike>Cheerio</strike>
- PDFMerger

## Node Program to create pdf of mongoose documentation

</br>
How ? </br>
Scrapes the mongoose docs page to get urls </br>
Make PDFs of the docs page using puppeteer and merges all pdf generated using PDFMerger</br>
</br>

PDF files are named according to page titles in Docs </br>
Code Docs: https://mongoose-scrapdf-docs.netlify.app </br>
Mongoose Site: https://mongoosejs.com/docs/api.html

## Installation
Pupeteer will install a chromium binary if you have'nt set environment variable</br>
Check [npm Puppeteer](https://www.npmjs.com/package/puppeteer)</br>
```bash
    npm install
```

## Start
will create the pdfs in the root directory</br>
```bash
    npm run dev
```