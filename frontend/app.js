(function () {
  'use strict';

  const SERVICES = [
    { icon: '\uD83E\uDD0D', name: 'Teeth Cleaning', desc: 'Professional scaling and polishing to keep your smile bright and healthy.' },
    { icon: '\uD83E\uDDB7', name: 'Whitening', desc: 'Safe, effective whitening treatments that lift stains in one visit.' },
    { icon: '\uD83D\uDD2E', name: 'Root Canal', desc: 'Painless root canal therapy with modern rotary endodontics.' },
    { icon: '\uD83D\uDEE4\uFE0F', name: 'Braces & Aligners', desc: 'Straighten your teeth with metal braces or clear invisible aligners.' },
    { icon: '\uD83D\uDC51', name: 'Dental Implants', desc: 'Permanent, natural-looking implants to replace missing teeth.' },
    { icon: '\uD83C\uDF84', name: 'Kids Dentistry', desc: 'Gentle, friendly care that makes children love visiting the dentist.' },
  ];

  const DOCTORS = [
    { initial: 'DR', name: 'Dr. Emma Reyes', specialty: 'General & Preventive Care', desc: '15+ years making healthy smiles feel simple.' },
    { initial: 'SR', name: 'Dr. Samir Kahn', specialty: 'Orthodontics', desc: 'Braces and aligners specialist for all ages.' },
    { initial: 'AP', name: 'Dr. Ava Patel', specialty: 'Cosmetic Dentistry', desc: 'Whitening, veneers and smile makeovers.' },
    { initial: 'JB', name: 'Dr. James Brooks', specialty: 'Oral Surgery', desc: 'Implants and painless wisdom tooth removal.' },
  ];

  const TESTIMONIALS = [
    { stars: 5, text: 'Scheduled my visit over WhatsApp in under a minute and was seen right on time. Amazing!', name: 'Sofia M.', detail: 'Teeth Cleaning' },
    { stars: 5, text: 'Friendly doctors, modern equipment and zero waiting. The best dental experience I have had.', name: 'Daniel R.', detail: 'Root Canal' },
    { stars: 5, text: 'My son is actually excited about dentist visits now. The kids corner and friendly doctors made all the difference.', name: 'Priya T.', detail: 'Kids Dentistry' },
  ];

  function init() {
    populateServices();
    populateDoctors();
    populateTestimonials();
    populateServiceOptions();
    bindEvents();
  }

  function populateServiceOptions() {
    var service = document.getElementById('service');
    if (service) service.innerHTML = SERVICES.map(function (s) { return '<option value="' + s.name + '">' + s.name + '</option>'; }).join('');
  }

  function populateServices() {
    var grid = document.getElementById('servicesGrid');
    if (!grid) return;
    grid.innerHTML = SERVICES.map(function (s) {
      return '<div class="service-card"><div class="service-icon">' + s.icon + '</div><h3>' + s.name + '</h3><p>' + s.desc + '</p></div>';
    }).join('');
  }

  function populateDoctors() {
    var grid = document.getElementById('doctorsGrid');
    if (!grid) return;
    grid.innerHTML = DOCTORS.map(function (d) {
      return '<div class="doctor-card"><div class="doctor-avatar">' + d.initial + '</div><h3>' + d.name + '</h3><span class="specialty">' + d.specialty + '</span><p>' + d.desc + '</p></div>';
    }).join('');
  }

  function populateTestimonials() {
    var grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    grid.innerHTML = TESTIMONIALS.map(function (t) {
      return '<div class="quote-card"><div class="stars">' + '&#9733;'.repeat(t.stars) + '</div><p>&ldquo;' + t.text + '&rdquo;</p><div class="quote-name">' + t.name + '<small>' + t.detail + '</small></div></div>';
    }).join('');
  }

  function bindEvents() {
    var navToggle = document.getElementById('navToggle');
    var mainNav = document.getElementById('mainNav');
    var bookingForm = document.getElementById('bookingForm');

    if (navToggle) {
      navToggle.addEventListener('click', function () { mainNav.classList.toggle('open'); });
    }
    if (mainNav) {
      mainNav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') mainNav.classList.remove('open');
      });
    }

    if (bookingForm) {
      bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!bookingForm.checkValidity()) {
          bookingForm.reportValidity();
          return;
        }

        var btn = bookingForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Booking...';

        var payload = {
          service: document.getElementById('service').value,
          name: document.getElementById('fullName').value.trim(),
          phone: document.getElementById('phone').value.trim(),
          email: document.getElementById('email').value.trim(),
        };

        fetch('https://backend-ton7.vercel.app/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then(function (res) {
            if (!res.ok) throw new Error('Booking failed');
            return res.json();
          })
          .then(function (appt) {
            var name = encodeURIComponent(payload.name);
            window.location.href = 'confirmation.html?name=' + name + '&token=' + appt.token;
          })
          .catch(function () {
            alert('Something went wrong. Please try again.');
            btn.disabled = false;
            btn.textContent = 'Submit Booking';
          });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
