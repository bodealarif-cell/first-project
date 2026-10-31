/* main.js — نقطة البدء: يشغّل كل الوحدات بعد تحميل الصفحة */
(function () {
  "use strict";
  var P = window.PROJECT || {};
  ["nav", "gallery_ui", "spray", "reveal"].forEach(function (name) {
    if (P[name] && typeof P[name].init === "function") P[name].init();
  });
})();
