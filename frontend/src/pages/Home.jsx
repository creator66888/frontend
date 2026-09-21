import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { SERVICES, DOCTORS, TESTIMONIALS } from '../data.js';
import { API_URL, PHONE_TEL, PHONE_DISPLAY, EMAIL, OPENING_HOURS } from '../config.js';

const HERO_STATS = [
  { value: '12+', label: 'Years Experience' },
  { value: '8,500+', label: 'Happy Patients' },
  { value: '15', label: 'Expert Doctors' },
];

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ service: SERVICES[0].name, name: '', phone: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleBooking(e) {
    e.preventDefault();
    const el = e.currentTarget;
    if (!el.checkValidity()) {
      el.reportValidity();
      return;
    }

    const payload = {
      service: form.service,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
    };

    setSubmitting(true);
    try {
      const res = await fetch(API_URL + '/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error('Booking failed. Please check your network or database connectivity.');
      }
      const data = await res.json();
      navigate(
        '/confirmation?name=' + encodeURIComponent(payload.name) + '&token=' + encodeURIComponent(data.token)
      );
    } catch (err) {
      window.alert('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main>
        <section id="home" className="hero">
          <div className="container hero-inner">
            <div className="hero-text">
              <p className="hero-kicker">Your smile deserves the best care</p>
              <h1>
                Healthy Teeth,
                <br />
                Bright Smiles
              </h1>
              <span className="hero-tooth">
                <img src="/smile.png" alt="Bright Smile" />
              </span>
              <p className="hero-sub">
                Visit Brighton Smile Dental Clinic for painless treatments, expert doctors and modern
                equipment. Book your visit in seconds and get your token right away.
              </p>
              <div className="hero-actions">
                <a href="#booking" className="btn btn-primary">
                  Book Appointment
                </a>
                <a href="#services" className="btn btn-outline">
                  Our Services
                </a>
              </div>
              <div className="hero-stats">
                {HERO_STATS.map((s) => (
                  <div className="stat" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-inner">
                <span className="tooth">{'\uD83E\uDFF9'}</span>
                <h3>Opening Hours</h3>
                <ul>
                  {OPENING_HOURS.map((o) => (
                    <li key={o.days}>
                      {o.days} <span>{o.hours}</span>
                    </li>
                  ))}
                </ul>
                <p className="hotline">
                  Call us: <a href={'tel:' + PHONE_TEL}>{PHONE_DISPLAY}</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-head">
              <p className="section-tag">Our Services</p>
              <h2>Complete Dental Care, All in One Place</h2>
            </div>
            <div className="services-grid">
              {SERVICES.map((s) => (
                <div className="service-card" key={s.name}>
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <p className="section-tag">Book Appointment</p>
              <h2>Book Your Visit</h2>
              <p>Fill in your details and we will reach out to confirm your appointment.</p>
            </div>

            <div className="booking-wrap">
              <form className="booking-card booking-form" noValidate onSubmit={handleBooking}>
                <label className="mini-label" htmlFor="service">
                  Select Service
                </label>
                <select id="service" value={form.service} onChange={update('service')} required>
                  {SERVICES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Full name *"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  required
                />
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone number *"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  required
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email address *"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  required
                />
                <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                  {submitting ? 'Booking...' : 'Submit Booking'}
                </button>
              </form>
              <p className="form-note">
                Prefer to call? <a href={'tel:' + PHONE_TEL}>{PHONE_DISPLAY}</a>
              </p>
            </div>
          </div>
        </section>

        <section id="doctors" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <p className="section-tag">Meet Our Doctors</p>
              <h2>Specialists Who Care</h2>
            </div>
            <div className="doctors-grid">
              {DOCTORS.map((d) => (
                <div className="doctor-card" key={d.name}>
                  <div className="doctor-avatar">{d.initial}</div>
                  <h3>{d.name}</h3>
                  <span className="specialty">{d.specialty}</span>
                  <p>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <p className="section-tag">Testimonials</p>
              <h2>What Our Patients Say</h2>
            </div>
            <div className="testimonials-grid">
              {TESTIMONIALS.map((t) => (
                <div className="quote-card" key={t.name}>
                  <div className="stars">{'\u2605'.repeat(t.stars)}</div>
                  <p>&ldquo;{t.text}&rdquo;</p>
                  <div className="quote-name">
                    {t.name}
                    <small>{t.detail}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <h2>Visit Our Clinic</h2>
              <p>We are located in the heart of the city with easy parking access.</p>
              <ul className="contact-list">
                <li>{'\uD83D\uDCCD'} 124 Smile Avenue, Suite 200, Your City</li>
                <li>
                  {'\uD83D\uDCDE'} <a href={'tel:' + PHONE_TEL}>{PHONE_DISPLAY}</a>
                </li>
                <li>
                  {'\uD83D\uDCE7'} <a href={'mailto:' + EMAIL}>{EMAIL}</a>
                </li>
              </ul>
            </div>
            <div className="footer-hours">
              <h3>Opening Hours</h3>
              <ul>
                {OPENING_HOURS.map((o) => (
                  <li key={o.days}>
                    {o.days} <span>{o.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}