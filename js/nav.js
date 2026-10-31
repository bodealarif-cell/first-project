/* nav.js — قائمة الجوال + إبراز القسم الحالي أثناء التمرير */
(function () {
  "use strict";
  window.PROJECT = window.PROJECT || {};

  PROJECT.nav = {
    init: function () {
      var toggle = document.querySelector(".site-nav__toggle");
      var links = document.getElementById("nav-links");
      if (!toggle || !links) return;

      function setOpen(open) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
        links.classList.toggle("is-open", open);
      }

      toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setOpen(false);
      });

      /* مراقب التمرير */
      if (!("IntersectionObserver" in window)) return;
      var anchors = Array.prototype.slice.call(links.querySelectorAll("a"));
      var byId = {};
      anchors.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          anchors.forEach(function (a) { a.removeAttribute("aria-current"); });
          var a = byId[entry.target.id];
          if (a) a.setAttribute("aria-current", "true");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });

      document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
    }
  };
})();
