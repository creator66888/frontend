import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { API_URL } from '../config.js';
import { formatTime } from '../format.js';

export default function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const loadAppointments = useCallback(async () => {
    try {
      const res = await fetch(API_URL + '/api/appointments');
      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      window.alert('Error loading appointments: ' + err.message);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const filtered = useMemo(() => {
    return appointments
      .filter((a) => (statusFilter === 'all' || a.status === statusFilter) && (!dateFilter || a.date === dateFilter))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [appointments, statusFilter, dateFilter]);

  const stats = useMemo(
    () => ({
      total: filtered.length,
      pending: filtered.filter((a) => a.status === 'pending').length,
      confirmed: filtered.filter((a) => a.status === 'confirmed').length,
      cancelled: filtered.filter((a) => a.status === 'cancelled').length,
    }),
    [filtered]
  );

  async function updateStatus(id, status) {
    try {
      await fetch(API_URL + '/api/appointments/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      loadAppointments();
    } catch (err) {
      window.alert('Error updating status: ' + err.message);
    }
  }

  async function deleteAppointment(id) {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await fetch(API_URL + '/api/appointments/' + id, { method: 'DELETE' });
      loadAppointments();
    } catch (err) {
      window.alert('Error deleting appointment: ' + err.message);
    }
  }

  const statCards = [
    { label: 'Total', value: stats.total },
    { label: 'Pending', value: stats.pending, cls: 'stat-pending' },
    { label: 'Confirmed', value: stats.confirmed, cls: 'stat-confirmed' },
    { label: 'Cancelled', value: stats.cancelled, cls: 'stat-cancelled' },
  ];

  return (
    <>
      <Header variant="admin" />
      <main>
        <section className="section">
          <div className="container">
            <div className="section-head">
              <p className="section-tag">Appointments</p>
              <h2>Manage Bookings</h2>
            </div>

            <div className="admin-stats">
              {statCards.map((s) => (
                <div className={'stat-card ' + (s.cls || '')} key={s.label}>
                  <span className="stat-num">{s.value}</span>
                  <span className="stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="admin-filters">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
              <button className="btn btn-outline" onClick={loadAppointments}>
                Refresh
              </button>
            </div>

            <div className="admin-table-wrap">
              {filtered.length === 0 ? (
                <p className="empty-state">No appointments found.</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Token</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a) => (
                      <tr className={'status-row-' + a.status} key={a.id}>
                        <td data-label="Token">
                          <strong>{a.token}</strong>
                        </td>
                        <td data-label="Name">{a.name}</td>
                        <td data-label="Phone">{a.phone}</td>
                        <td data-label="Email">{a.email}</td>
                        <td data-label="Service">{a.service}</td>
                        <td data-label="Date">{a.date}</td>
                        <td data-label="Time">{formatTime(a.time)}</td>
                        <td data-label="Status">
                          <span className={'badge badge-' + a.status}>{a.status}</span>
                        </td>
                        <td className="actions-cell" data-label="Actions">
                          {a.status === 'pending' && (
                            <button
                              className="btn-sm btn-confirm"
                              onClick={() => updateStatus(a.id, 'confirmed')}
                            >
                              Confirm
                            </button>
                          )}
                          {a.status !== 'cancelled' && (
                            <button
                              className="btn-sm btn-cancel"
                              onClick={() => updateStatus(a.id, 'cancelled')}
                            >
                              Cancel
                            </button>
                          )}
                          <button className="btn-sm btn-delete" onClick={() => deleteAppointment(a.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}