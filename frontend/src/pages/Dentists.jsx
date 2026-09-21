import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { DOCTORS } from '../data.js';

const STANDARDS = [
  { icon: '\uD83D\uDC89', title: 'Modern Equipment', desc: 'Digital X-rays, rotary endodontics and painless anaesthesia technology.' },
  { icon: '\uD83D\uDCCB', title: 'Flexible Hours', desc: 'Weekday and Saturday appointments so dental care fits your schedule.' },
  { icon: '\u2B50', title: 'Trusted Care', desc: 'Thousands of happy patients and a friendly team that listens to you.' },
];

export default function Dentists() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div>
              <p className="hero-kicker">Meet the team</p>
              <h1>Our Expert Dentists</h1>
              <p className="hero-sub">
                A team of experienced specialists dedicated to gentle, modern and painless dental
                care for the whole family.
              </p>
            </div>
            <div className="hero-card">
              <div className="hero-card-inner">
                <span className="tooth">{'\uD83E\uDFF9'}</span>
                <h3>Why choose us?</h3>
                <ul>
                  <li>15+ years combined experience</li>
                  <li>Modern, sterile equipment</li>
                  <li>Painless treatment methods</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <p className="section-tag">Our Dental Team</p>
              <h2>Specialists Who Care</h2>
            </div>
            <div className="doctors-grid">
              {DOCTORS.map((d) => (
                <div className="doctor-card" key={d.name}>
                  <div className="doctor-avatar">{d.initial}</div>
                  <h3>{d.name}</h3>
                  <span className="specialty">{d.specialty}</span>
                  <p>{d.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <p className="section-tag">Clinic Standards</p>
              <h2>Your Comfort Is Our Priority</h2>
              <p>
                Every appointment is handled with care, transparency and strict hygiene standards, so
                you always feel safe and relaxed.
              </p>
            </div>
            <div className="testimonials-grid">
              {STANDARDS.map((s) => (
                <div className="quote-card" key={s.title}>
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}