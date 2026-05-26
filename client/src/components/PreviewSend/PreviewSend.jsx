import { useState } from 'react';
import axios from 'axios';

const templateStyles = {
  1: { bg: '#F4F3FF', accent: '#6C63FF' },
  2: { bg: '#F0F0F5', accent: '#1A1A2E' },
  3: { bg: '#FFF8E7', accent: '#F7971E' }
};

function PreviewSend({ selectedCandidates, selectedTemplate, emailConfig }) {
  const [previewCandidate, setPreviewCandidate] = useState(selectedCandidates[0]);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  const style = templateStyles[selectedTemplate?.id] || {};

  const handleSend = async () => {
    console.log('API URL:', import.meta.env.VITE_API_URL);
    setSending(true);
    try {
      const res = await axios.post(`https://offerflow-server.onrender.com/api/email/send`, {
        candidates: selectedCandidates,
        subject: emailConfig.subject,
        body: emailConfig.body,
        templateId: selectedTemplate.id,
      });
      setResults(res.data.results);
      setDone(true);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="preview-container">
      <h2>Preview & Send</h2>
      <p className="subtitle">
        Offer letters will be sent to{selectedCandidates.length} candidates using the <strong>{selectedTemplate?.name}</strong> template.
      </p>

      {/* Candidate Selector */}
      <div className="candidate-tabs">
        {selectedCandidates.slice(0, 5).map((c, i) => (
          <button
            key={i}
            className={`tab ${previewCandidate === c ? 'active' : ''}`}
            onClick={() => setPreviewCandidate(c)}
          >
            {c.name?.split(' ')[0]}
          </button>
        ))}
        {selectedCandidates.length > 5 && (
          <span className="more-badge">+{selectedCandidates.length - 5} more</span>
        )}
      </div>

      {/* Preview Cards */}
      <div className="preview-grid">
        {/* Email Preview */}
        <div className="preview-card">
          <h3>📧 Email Preview</h3>
          <div className="email-preview" style={{ background: style.bg }}>
            <p className="email-subject">
              <strong>Subject:</strong>{' '}
              {emailConfig.subject?.replace('{{name}}', previewCandidate?.name)}
            </p>
            <hr />
            <p className="email-body">
              {emailConfig.body
                ?.replace(/{{name}}/g, previewCandidate?.name)
                ?.replace(/{{role}}/g, previewCandidate?.role)
                ?.replace(/{{start_date}}/g, previewCandidate?.start_date)
                ?.replace(/{{duration}}/g, previewCandidate?.duration)}
            </p>
            <p className="attachment-note" style={{ color: style.accent }}>
              📎 offer-letter-{previewCandidate?.name}.pdf
            </p>
          </div>
        </div>

        {/* Template Preview */}
        <div className="preview-card">
          <h3>📄 Template Preview</h3>
          <div
            className="template-preview-box"
            style={{ borderColor: style.accent }}
          >
            <div
              className="template-header-preview"
              style={{ background: style.accent }}
            >
              <p>ABC PRIVATE LTD</p>
            </div>
            <div className="template-body-preview">
              <p><strong>{selectedTemplate?.name}</strong></p>
              <p>Dear {previewCandidate?.name},</p>
              <p>Role: {previewCandidate?.role}</p>
              <p>Start Date: {previewCandidate?.start_date}</p>
              <p>Duration: {previewCandidate?.duration}</p>
              <p>Mode: {previewCandidate?.mode}</p>
            </div>
          </div>
        </div>
      </div>
      

      {/* Send Button */}
      {!done ? (
        <div className="send-section">
          <button
            className="btn-send"
            onClick={handleSend}
            disabled={sending}
          >
            {sending
              ? `⏳ Sending... (${selectedCandidates.length} emails)`
              : `🚀 Send to ${selectedCandidates.length} Candidates`}
          </button>
        </div>
      ) : (
        <div className="results-section">
          <h3>📊 Send Results</h3>
          <div className="results-list">
            {results.map((r, i) => (
              <div
                key={i}
                className={`result-item ${r.status === 'sent' ? 'success' : 'failed'}`}
              >
                <span>{r.email}</span>
                <span>{r.status === 'sent' ? '✅ Sent' : '❌ Failed'}</span>
              </div>
            ))}
          </div>
          <p className="summary">
            ✅ {results.filter(r => r.status === 'sent').length} sent &nbsp;|&nbsp;
            ❌ {results.filter(r => r.status === 'failed').length} failed
          </p>
        </div>
      )}
    </div>
  );
}

export default PreviewSend;