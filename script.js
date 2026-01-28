document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 8) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  });
  var reveals = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (el) { io.observe(el); });
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dot');
  var idx = 0;
  function show(i) {
    idx = i;
    var track = document.querySelector('.slides');
    if (!track) return;
    track.style.transform = 'translateX(' + (-i * 100) + '%)';
    dots.forEach(function (d, di) { if (di === i) d.classList.add('active'); else d.classList.remove('active'); });
  }
  if (slides.length) {
    show(0);
    setInterval(function () { show((idx + 1) % slides.length); }, 4200);
  }
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var headerEl = item.querySelector('.accordion-header');
    var bodyEl = item.querySelector('.accordion-body');
    if (!headerEl || !bodyEl) return;
    headerEl.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      if (open) {
        bodyEl.style.height = bodyEl.scrollHeight + 'px';
      } else {
        bodyEl.style.height = '0px';
      }
    });
  });
});
