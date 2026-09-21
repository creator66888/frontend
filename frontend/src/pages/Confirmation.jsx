import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_TEL } from '../config.js';

export default function Confirmation() {
  const [params] = useSearchParams();
  const name = params.get('name') || '';
  const token = params.get('token') || '';

  return (
    <>
      <Header />
      <main>
        <section className="section section-alt">
          <div className="container">
            <div className="confirmation-card">
              <div className="confirmation-check">{'\u2713'}</div>
              <h2>Thank You, {name}!</h2>
              <p className="confirmation-sub">
                Your booking request has been received. Contact us on WhatsApp (or call) and we will
                confirm your appointment right away.
              </p>

              {token && (
                <div className="token-box">
                  <p className="token-label">Your Token</p>
                  <p className="token-value">{token}</p>
                </div>
              )}

              <div className="whatsapp-box">
                <span className="whatsapp-icon">{'\uD83D\uDCAC'}</span>
                <p className="whatsapp-label">Book via WhatsApp</p>
                <a
                  className="whatsapp-number"
                  href={'https://wa.me/' + WHATSAPP_NUMBER}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {PHONE_DISPLAY}
                </a>
                <Link to="/#booking" className="btn btn-primary btn-block">
                  Book Now
                </Link>
              </div>

              <p className="form-note">
                Prefer to call? <a href={'tel:' + PHONE_TEL}>{PHONE_DISPLAY}</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}