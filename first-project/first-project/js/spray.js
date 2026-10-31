/* spray.js — الزجاجة التفاعلية: اضغط الذراع الجانبي فيخرج الرذاذ */
(function () {
  "use strict";
  window.PROJECT = window.PROJECT || {};

  PROJECT.spray = {
    init: function () {
      var bottle = document.getElementById("bottle");
      var lever = document.getElementById("lever");
      if (!bottle || !lever) return;

      var timer = null;
      var touched = false;

      function press() {
        touched = true;
        lever.classList.remove("is-nudge");
        bottle.classList.add("is-pressed");
        bottle.classList.remove("is-spraying");
        void bottle.getBoundingClientRect();           /* إعادة تشغيل الحركة */
        bottle.classList.add("is-spraying");
        clearTimeout(timer);
        timer = setTimeout(function () { bottle.classList.remove("is-spraying"); }, 1500);
      }
      function release() { bottle.classList.remove("is-pressed"); }

      lever.addEventListener("pointerdown", function (e) { e.preventDefault(); press(); });
      ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
        lever.addEventListener(ev, release);
      });
      lever.addEventListener("keydown", function (e) {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); press(); }
      });
      lever.addEventListener("keyup", function (e) {
        if (e.key === " " || e.key === "Enter") release();
      });

      /* لمحة واحدة تلفت الانتباه للذراع ثم تتوقف */
      setTimeout(function () { if (!touched) lever.classList.add("is-nudge"); }, 1400);
    }
  };
})();
