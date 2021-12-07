# Mongoose Docs PDF and EPUB

Download files directly
- [PDF](./PDF/)
- [EPUB](./EPUB/)

Files are not merges because they were breaking internal links

----

Uses
- Puppeteer
- Node Ebook Converter

## Node Program to create pdfs and epub of mongoose documentation
</br>
How ? </br>
Scrapes the mongoose docs page to get urls </br>
Make PDFs of the docs page using puppeteer</br>
Converts the PDFs to Epub format using Calibre and ebook coverter </br>
</br>

Files are named according to page titles in Docs </br>
Code Docs: https://mongoose-scrapdf-docs.netlify.app </br>
Mongoose Site: https://mongoosejs.com/docs/api.html

## Installation
Pupeteer will install a chromium binary if you have'nt set environment variable</br>
Check [npm Puppeteer](https://www.npmjs.com/package/puppeteer)</br>

node-ebook-converter requires Calibre to convert pdf to epub</br>
Install [Calibre](https://calibre-ebook.com/) (not required if you only want PDFs)
```bash
    npm install
```

## Creating the PDFs
will create the pdfs and store in ./PDF directory</br>
```bash
    node pdf
```


## Converting the PDFs to EPUBs
will create the epubs and store in ./EPUB directory</br>
```bash
    node epub
```

## View Docs Locally
after running the command open index.html file located inside the out directory in a browser
```bash
    npm run doc
```

[Twitter](https://twitter.com/hey_its_tay11)