import { useState } from 'react';
import CSVUpload from './components/CSVUpload/CSVUpload';
import DataReview from './components/DataReview/DataReview';
import TemplateSelector from './components/TemplateSelector/TemplateSelector';
import PreviewSend from './components/PreviewSend/PreviewSend';
import './index.css';

const STEPS = ['CSV Upload', 'Data Review', 'Template', 'Preview & Send'];

function Hero({ onStart }) {
  return (
    <div className="hero">
      <div className="hero-badge">✦ Bulk Offer Letter Dispatcher</div>

      <h1 className="hero-title">
        <span className="gradient-text">OfferFlow</span>
      </h1>
      <p className="hero-subtitle-line">
        From CSV to inbox — offer letters in one click!
      </p>

      <button className="hero-cta" onClick={onStart}>
        Get Started →
      </button>

      <div className="hero-steps">
        {[
          { icon: '📂', num: '01', label: 'Upload CSV' },
          { icon: '👥', num: '02', label: 'Review Data' },
          { icon: '🎨', num: '03', label: 'Pick Template' },
          { icon: '🚀', num: '04', label: 'Send Emails' },
        ].map((s, i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div className="hero-step">
              <div className="step-icon">{s.icon}</div>
              <span className="step-num">{s.num}</span>
              <span className="step-label">{s.label}</span>
            </div>
            {i < arr.length - 1 && <span className="step-arrow">→</span>}
          </div>
        ))}
      </div>

      <div className="hero-stats">
        <div className="stat">
          <span className="stat-value">∞</span>
          <span className="stat-label">Candidates</span>
        </div>
        <div className="stat">
          <span className="stat-value">3</span>
          <span className="stat-label">Templates</span>
        </div>
        <div className="stat">
          <span className="stat-value">1x</span>
          <span className="stat-label">Click to Send</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [emailConfig, setEmailConfig] = useState({ subject: '', body: '' });

  return (
    <div>
      {step === 0 && <Hero onStart={() => setStep(1)} />}

      {step >= 1 && (
        <div className="app-container">
          {/* Progress Bar */}
          <div className="progress-bar">
            {STEPS.map((label, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={`progress-step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
                  <div className="progress-circle">
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span className="progress-label">{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`progress-line ${step > i + 1 ? 'done' : ''}`} />
                )}
              </div>
            ))}
          </div>

          {/* Steps */}
          {step === 1 && <CSVUpload setCandidates={setCandidates} setStep={setStep} />}
          {step === 2 && <DataReview candidates={candidates} setSelectedCandidates={setSelectedCandidates} setStep={setStep} />}
          {step === 3 && <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} emailConfig={emailConfig} setEmailConfig={setEmailConfig} setStep={setStep} />}
          {step === 4 && <PreviewSend selectedCandidates={selectedCandidates} selectedTemplate={selectedTemplate} emailConfig={emailConfig} />}
        </div>
      )}
    </div>
  );
}

export default App;