import excel as json for browser.

## Install

``` bash
npm install import-excel-as-json --save
```

## Usage

Only call a function, user can select an excel file, and you will get a json. all this process in browser.

``` javascript
import excelToJson from 'import-excel-as-json';

excelToJson().then(jsonData => {
  console.log(jsonData);
}).catch(e => {
  console.error(e)
});
```
