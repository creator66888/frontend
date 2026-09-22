import { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const SUBJECTS = ['Billing & Payments', 'Treatment & Care', 'Staff & Reception', 'Waiting Time', 'Other'];

export default function Complaints() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const el = e.currentTarget;
    if (!el.checkValidity()) {
      el.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  function resetForm() {
    setSubmitted(false);
  }

  return (
    <>
      <Header />
      <main>
        <section className="section section-alt" id="complaints">
          <div className="container">
            <div className="section-head">
              <p className="section-tag">Complaints &amp; Feedback</p>
              <h2>Tell Us About Your Experience</h2>
              <p>
                We take every complaint seriously. Share your details and your feedback, and our team
                will get back to you as soon as possible.
              </p>
            </div>

            {submitted ? (
              <div className="form-success">
                <div className="confirmation-check">{'\u2713'}</div>
                <h2>Thank You!</h2>
                <p className="confirmation-sub">
                  Your complaint has been received. Our team will review it and contact you shortly.
                </p>
                <button className="btn btn-outline" onClick={resetForm}>
                  Submit Another
                </button>
              </div>
            ) : (
              <div className="booking-wrap">
                <form className="booking-card booking-form" noValidate onSubmit={handleSubmit}>
                  <span className="mini-label">Your Details</span>
                  <input type="text" id="compName" placeholder="Full name *" autoComplete="name" required />
                  <input type="tel" id="compPhone" placeholder="Phone number *" autoComplete="tel" required />
                  <input type="email" id="compEmail" placeholder="Email address *" autoComplete="email" required />

                  <label className="mini-label" htmlFor="compSubject">
                    Related to
                  </label>
                  <select id="compSubject">
                    {SUBJECTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>

                  <label className="mini-label" htmlFor="compMessage">
                    Your Complaint
                  </label>
                  <textarea
                    id="compMessage"
                    placeholder="Please describe your complaint in detail *"
                    required
                  />
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit Complaint
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}