import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ variant = 'default' }) {
  const admin = variant === 'admin';
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </span>
          <span>
            XYZ Dental <small>Clinic</small>
          </span>
        </Link>
        {admin ? (
          <span className="admin-badge">Admin Panel</span>
        ) : (
          <nav className={`main-nav${open ? ' open' : ''}`}>
            <Link to="/#home" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/#services" onClick={closeMenu}>
              Services
            </Link>
            <Link to="/#booking" onClick={closeMenu}>
              Book Appointment
            </Link>
            <Link to="/dentists" onClick={closeMenu}>
              Dentists
            </Link>
            <Link to="/complaints" onClick={closeMenu}>
              Complaints
            </Link>
            <Link to="/#contact" onClick={closeMenu}>
              Contact
            </Link>
          </nav>
        )}
        {!admin && (
          <>
            <Link to="/#booking" className="btn btn-primary btn-nav" onClick={closeMenu}>
              Book Now
            </Link>
            <button
              className="nav-toggle"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              &equiv;
            </button>
          </>
        )}
      </div>
    </header>
  );
}