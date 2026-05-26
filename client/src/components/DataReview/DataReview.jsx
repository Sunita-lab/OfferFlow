import { useState } from 'react';

function DataReview({ candidates, setSelectedCandidates, setStep }) {
  const [selected, setSelected] = useState(
    candidates.map((_, i) => i)
  );

  const toggleOne = (i) => {
    setSelected(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  const toggleAll = () => {
    setSelected(prev =>
      prev.length === candidates.length ? [] : candidates.map((_, i) => i)
    );
  };

  const handleNext = () => {
    const chosen = candidates.filter((_, i) => selected.includes(i));
    setSelectedCandidates(chosen);
    setStep(3);
  };

  const fields = ['name', 'email', 'role', 'start_date', 'duration', 'mode', 'organization'];

  return (
    <div className="review-container">
      <h2>Data Review</h2>
      <p className="subtitle">{selected.length} / {candidates.length} candidates selected</p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selected.length === candidates.length}
                  onChange={toggleAll}
                />
              </th>
              {fields.map(f => <th key={f}>{f}</th>)}
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, i) => (
              <tr key={i} className={selected.includes(i) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(i)}
                    onChange={() => toggleOne(i)}
                  />
                </td>
                {fields.map(f => <td key={f}>{c[f] || '—'}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="actions">
        <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
        <button className="btn-primary" onClick={handleNext} disabled={selected.length === 0}>
          Next → ({selected.length} selected)
        </button>
      </div>
    </div>
  );
}

export default DataReview;