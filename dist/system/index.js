"use strict";

System.register(["./filter", "./sort"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_filter) {
      _export("filter", _filter.filter);
    }, function (_sort) {
      _export("sort", _sort.sort);
    }],
    execute: function () {}
  };
});