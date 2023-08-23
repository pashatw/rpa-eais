const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function mergePDF(inputPaths, outputPath) {
    const mergedPdf = await PDFDocument.create();

    for (const inputPath of inputPaths) {
        const pdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergePdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, mergePdfBytes);
}

const inputPaths = ['dummy.pdf', 'demo_123.pdf', 'sample.pdf'];
const outputPath = 'merged.pdf';
mergePDF(inputPaths, outputPath)
    .then(() => {
        console.log('PDFs merged successfully.');
    })
    .catch(error => {
        console.error('Error merging PDFs: ', error.message);
    });