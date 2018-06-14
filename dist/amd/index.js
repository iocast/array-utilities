define(['exports', './filter', './sort'], function (exports, _filter, _sort) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'filter', {
    enumerable: true,
    get: function () {
      return _filter.filter;
    }
  });
  Object.defineProperty(exports, 'sort', {
    enumerable: true,
    get: function () {
      return _sort.sort;
    }
  });
});