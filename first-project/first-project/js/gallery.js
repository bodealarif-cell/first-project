/* gallery.js — معرض صور الزجاجة (يقرأ البيانات من config.js) */
(function () {
  "use strict";
  window.PROJECT = window.PROJECT || {};

  PROJECT.gallery_ui = {
    init: function () {
      var data = PROJECT.gallery || [];
      var frame = document.getElementById("gallery-frame");
      var img = document.getElementById("gallery-image");
      var caption = document.getElementById("gallery-caption");
      var thumbs = document.getElementById("gallery-thumbs");
      if (!data.length || !frame || !img || !caption || !thumbs) return;

      frame.addEventListener("error", function () { frame.classList.add("is-broken"); }, true);
      img.addEventListener("load", function () { frame.classList.remove("is-broken"); });

      function show(i, instant) {
        var item = data[i];
        var apply = function () {
          frame.classList.remove("is-broken");
          img.src = item.src;
          img.alt = item.caption;
          caption.textContent = item.caption;
          img.classList.remove("is-switching");
        };
        if (instant) { apply(); } else {
          img.classList.add("is-switching");
          setTimeout(apply, 180);
        }
        Array.prototype.forEach.call(thumbs.children, function (b, j) {
          if (j === i) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
        });
      }

      data.forEach(function (item, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "gallery__thumb";
        b.setAttribute("aria-label", item.label);
        var t = document.createElement("img");
        t.src = item.src; t.alt = ""; t.loading = "lazy";
        b.appendChild(t);
        b.addEventListener("click", function () { show(i, false); });
        thumbs.appendChild(b);
      });

      show(0, true);
    }
  };
})();
