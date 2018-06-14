'use strict';

System.register(['./filter', './sort'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_filter) {
      var _exportObj = {};
      _exportObj.filter = _filter.filter;

      _export(_exportObj);
    }, function (_sort) {
      var _exportObj2 = {};
      _exportObj2.sort = _sort.sort;

      _export(_exportObj2);
    }],
    execute: function () {}
  };
});