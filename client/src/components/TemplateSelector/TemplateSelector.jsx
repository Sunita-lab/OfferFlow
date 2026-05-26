import { useState } from 'react';

const templates = [
  {
    id: 1,
    name: 'Modern Minimal',
    desc: 'Clean white design, bold typography',
    preview: '🎨',
    color: '#6C63FF'
  },
  {
    id: 2,
    name: 'Corporate Elegant',
    desc: 'Professional dark header, formal layout',
    preview: '💼',
    color: '#1A1A2E'
  },
  {
    id: 3,
    name: 'Creative Vibrant',
    desc: 'Colorful gradient, modern feel',
    preview: '✨',
    color: '#F7971E'
  }
];

function TemplateSelector({ selectedTemplate, setSelectedTemplate, emailConfig, setEmailConfig, setStep }) {
  const [localSubject, setLocalSubject] = useState(
    emailConfig.subject || 'Offer Letter - {{name}} | ABC Private Ltd'
  );
  const [localBody, setLocalBody] = useState(
    emailConfig.body || `Dear {{name}},

Congratulations! We are pleased to offer you the position of {{role}} at ABC Private Ltd.

Please find your offer letter attached.

Regards,
ABC Private Ltd Team`
  );

  const handleNext = () => {
    if (!selectedTemplate) {
      alert('Please select a template!');
      return;
    }
    setEmailConfig({ subject: localSubject, body: localBody });
    setStep(4);
  };

  return (
    <div className="template-container">
      <h2>Choose Template</h2>
      <p className="subtitle">Select a template for your offer letter</p>

      <div className="template-grid">
        {templates.map(t => (
          <div
            key={t.id}
            className={`template-card ${selectedTemplate?.id === t.id ? 'selected' : ''}`}
            onClick={() => setSelectedTemplate(t)}
            style={{ borderColor: selectedTemplate?.id === t.id ? t.color : '' }}
          >
            <div className="template-preview" style={{ background: t.color }}>
              <span>{t.preview}</span>
            </div>
            <div className="template-info">
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
            </div>
            {selectedTemplate?.id === t.id && (
              <div className="template-check" style={{ background: t.color }}>✓</div>
            )}
          </div>
        ))}
      </div>

      <div className="email-config">
        <h3>Email Customize</h3>
        <p className="hint">Use placeholders: {`{{name}}, {{role}}, {{start_date}}, {{duration}}`}</p>

        <label>Subject</label>
        <input
          type="text"
          value={localSubject}
          onChange={e => setLocalSubject(e.target.value)}
          placeholder="Email subject..."
        />

        <label>Body</label>
        <textarea
          rows={8}
          value={localBody}
          onChange={e => setLocalBody(e.target.value)}
          placeholder="Email body..."
        />
      </div>

      <div className="actions">
        <button className="btn-secondary" onClick={() => setStep(2)}>← Back</button>
        <button className="btn-primary" onClick={handleNext}>Next → Preview</button>
      </div>
    </div>
  );
}

export default TemplateSelector;