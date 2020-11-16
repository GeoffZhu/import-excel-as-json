(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xlsx')) :
  typeof define === 'function' && define.amd ? define(['xlsx'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.importExcelAsJson = factory(global.XLSX));
}(this, (function (XLSX) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var XLSX__default = /*#__PURE__*/_interopDefaultLegacy(XLSX);

  /* eslint-disable prefer-const */

  const fileConvertToWorkbook = file => {
    let reader = new FileReader();

    let fixdata = data => {
      let o = '';
      let l = 0;
      let w = 10240;

      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
      }

      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    };

    return new Promise((resolve, reject) => {
      try {
        reader.onload = renderEvent => {
          const data = renderEvent.target.result;
          const arr = fixdata(data);
          resolve(XLSX__default['default'].read(btoa(arr), {
            type: 'base64'
          }));
        };

        reader.onerror = error => {
          reject(error);
        };

        reader.readAsArrayBuffer(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  const xlsxArrToTableArr = xlsxArr => {
    const tableArr = [];
    let length = 0;
    let maxLength = 0;
    let maxLengthIndex = 0;
    xlsxArr.forEach((item, index) => {
      // eslint-disable-next-line prefer-destructuring
      length = Object.keys(item).length;

      if (maxLength < length) {
        maxLength = length;
        maxLengthIndex = index;
      }
    });
    const tableHeader = Object.keys(xlsxArr[maxLengthIndex]);
    let rowItem = {};
    xlsxArr.forEach(item => {
      rowItem = {};

      for (let i = 0; i < maxLength; i++) {
        rowItem[tableHeader[i]] = item[tableHeader[i]] || '';
      }

      tableArr.push(rowItem);
    });
    return {
      header: tableHeader,
      data: tableArr
    };
  };

  const Xls2Json = () => {
    let inputDom = document.querySelector('.__xls2json');

    if (!inputDom) {
      inputDom = document.createElement('input');
      inputDom.classList.add('__xls2json');
      inputDom.type = 'file';
      inputDom.accept = '.xlsx, .xls, .csv';
      inputDom.style.display = 'none';
      document.body.appendChild(inputDom);
    }

    inputDom.value = null;
    return new Promise((resolve, reject) => {
      inputDom.onchange = async e => {
        if (e.target.files.length <= 0) {
          reject();
          return;
        }

        const rawFile = e.target.files[0];
        const workbook = await fileConvertToWorkbook(rawFile);
        const xlsxArr = XLSX__default['default'].utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        resolve(xlsxArrToTableArr(xlsxArr));
      };

      inputDom.click();
    });
  };

  return Xls2Json;

})));
