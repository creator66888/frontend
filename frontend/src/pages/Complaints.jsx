import { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const SUBJECTS = ['Billing & Payments', 'Treatment & Care', 'Staff & Reception', 'Waiting Time', 'Other'];

export default function Complaints() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const el = e.currentTarget;
    if (!el.checkValidity()) {
      el.reportValidity();
      return;
    }
    const fd = new FormData(el);
    const payload = {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      subject: String(fd.get('subject') || '').trim(),
      message: String(fd.get('message') || '').trim(),
    };
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Could not send your message. Please try again.');
      }
      el.reset();
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setError('');
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
                  <input
                    type="text"
                    id="compName"
                    name="name"
                    placeholder="Full name *"
                    autoComplete="name"
                    required
                  />
                  <input
                    type="tel"
                    id="compPhone"
                    name="phone"
                    placeholder="Phone number *"
                    autoComplete="tel"
                    required
                  />
                  <input
                    type="email"
                    id="compEmail"
                    name="email"
                    placeholder="Email address *"
                    autoComplete="email"
                    required
                  />

                  <label className="mini-label" htmlFor="compSubject">
                    Related to
                  </label>
                  <select id="compSubject" name="subject">
                    {SUBJECTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>

                  <label className="mini-label" htmlFor="compMessage">
                    Your Complaint
                  </label>
                  <textarea
                    id="compMessage"
                    name="message"
                    placeholder="Please describe your complaint in detail *"
                    required
                  />
                  {error ? <p className="form-error">{error}</p> : null}
                  <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Submit Complaint'}
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
