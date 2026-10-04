import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_TEL } from '../config.js';
import { formatTime, formatDate } from '../format.js';

export default function Confirmation() {
  const [params] = useSearchParams();
  const name = params.get('name') || '';
  const token = params.get('token') || '';
  const date = params.get('date') || '';
  const time = params.get('time') || '';
  const day = params.get('day') || '';

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
                Your appointment is booked. Keep your token handy and arrive 10 minutes early - our
                team will confirm your visit shortly.
              </p>

              {token && (
                <div className="token-box">
                  <p className="token-label">Your Token</p>
                  <p className="token-value">{token}</p>
                </div>
              )}

              {(date || time) && (
                <div className="detail-grid">
                  {date && (
                    <div className="detail-item">
                      <span className="detail-lbl">Date</span>
                      <strong>{formatDate(date)}</strong>
                    </div>
                  )}
                  {day && (
                    <div className="detail-item">
                      <span className="detail-lbl">Day</span>
                      <strong>{day}</strong>
                    </div>
                  )}
                  {time && (
                    <div className="detail-item">
                      <span className="detail-lbl">Time</span>
                      <strong>{formatTime(time)}</strong>
                    </div>
                  )}
                </div>
              )}

              <div className="whatsapp-box">
                <span className="whatsapp-icon">{'\uD83D\uDCAC'}</span>
                <p className="whatsapp-label">Need to change or cancel?</p>
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