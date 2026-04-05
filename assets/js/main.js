document.addEventListener('DOMContentLoaded', function () {

  // Mobile menu toggle
  var btn = document.getElementById('mobile-menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      btn.querySelector('.material-symbols-outlined').textContent = open ? 'menu' : 'close';
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var header = item.querySelector('.faq-header');
    var body = item.querySelector('.faq-body');
    var icon = item.querySelector('.faq-icon');
    if (!header || !body) return;
    header.addEventListener('click', function () {
      var isOpen = body.classList.contains('open');
      document.querySelectorAll('.faq-body').forEach(function (b) { b.classList.remove('open'); });
      document.querySelectorAll('.faq-icon').forEach(function (i) { if (i) i.textContent = 'add'; });
      if (!isOpen) {
        body.classList.add('open');
        if (icon) icon.textContent = 'remove';
      }
    });
  });

  // Form validation + success feedback
  document.querySelectorAll('form[data-contact]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderBottom = '2px solid #ff716c';
        } else {
          field.style.borderBottom = '';
        }
      });
      if (!valid) return;
      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        var orig = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#5dc9ff';
        submitBtn.style.color = '#000';
        submitBtn.disabled = true;
        setTimeout(function () {
          submitBtn.textContent = orig;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
          form.reset();
        }, 4000);
      }
    });
  });

  // Clean Car Club plan toggle
  var monthlyBtn = document.getElementById('plan-monthly');
  var quarterlyBtn = document.getElementById('plan-quarterly');
  var monthlyPrices = document.querySelectorAll('[data-monthly]');
  var quarterlyPrices = document.querySelectorAll('[data-quarterly]');
  if (monthlyBtn && quarterlyBtn) {
    monthlyBtn.addEventListener('click', function () {
      monthlyBtn.classList.add('bg-primary', 'text-black');
      monthlyBtn.classList.remove('text-white/60');
      quarterlyBtn.classList.remove('bg-primary', 'text-black');
      quarterlyBtn.classList.add('text-white/60');
      monthlyPrices.forEach(function (el) { el.style.display = ''; });
      quarterlyPrices.forEach(function (el) { el.style.display = 'none'; });
    });
    quarterlyBtn.addEventListener('click', function () {
      quarterlyBtn.classList.add('bg-primary', 'text-black');
      quarterlyBtn.classList.remove('text-white/60');
      monthlyBtn.classList.remove('bg-primary', 'text-black');
      monthlyBtn.classList.add('text-white/60');
      quarterlyPrices.forEach(function (el) { el.style.display = ''; });
      monthlyPrices.forEach(function (el) { el.style.display = 'none'; });
    });
  }

  // Scroll fade-in
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
