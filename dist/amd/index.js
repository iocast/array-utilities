define(['exports', './array-utilities'], function (exports, _arrayUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_arrayUtilities).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _arrayUtilities[key];
      }
    });
  });
});