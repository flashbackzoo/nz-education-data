var request = require('request'),
    fs = require('fs'),
    XLSX = require('xlsx');

var dataURI = 'https://www.dropbox.com/s/9zdkafltupc2gq8/Secondary-Technology-By-School-1996-2014.xlsx?dl=1',
    outputXlsxFile = 'data.xlsx';

var writer = fs.createWriteStream(outputXlsxFile);

writer.on('finish', function () {
    console.log('converting data to JSON...');
    var workbook = XLSX.readFile(outputXlsxFile),
        output = {};

    for (var sheetName in workbook.Sheets) {
        output[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }

    
    fs.writeFile('data.json', JSON.stringify(output), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('complete.');
        }

        // Remove the xls file.
        fs.unlink(outputXlsxFile, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
});

writer.on('error', function (err) {
    console.log(err);
});

console.log('importing data...');

var reader = request
    .get(dataURI)
    .on('error', function (err) {
        console.log(err);
    })
    .pipe(writer);
