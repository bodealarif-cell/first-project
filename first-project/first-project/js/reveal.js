/* reveal.js — ظهور تدريجي للعناصر الموسومة بـ .reveal (مرة واحدة) */
(function () {
  "use strict";
  window.PROJECT = window.PROJECT || {};

  PROJECT.reveal = {
    init: function () {
      var items = document.querySelectorAll(".reveal");
      if (!("IntersectionObserver" in window)) {
        items.forEach(function (el) { el.classList.add("is-in"); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
      items.forEach(function (el) { io.observe(el); });
    }
  };
})();
