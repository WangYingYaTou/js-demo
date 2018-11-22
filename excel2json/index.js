const excelToJson = require('convert-excel-to-json');
const fs = require('fs');


const result = excelToJson({
    sourceFile: './map-location.xlsx',
    header: {
        // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
        rows: 1 // 2, 3, 4, etc.
    },
    sheets: ['工作表1'],

    // columnToKey: {
    //     '医院编号': 'id',
    //     '医院名称': 'name',
    //     '医院类型': 'type',
    //     '经度': 'longtitude',
    //     '纬度': 'latitude',
    // }
});


fs.writeFile('message.json', JSON.stringify(result), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
