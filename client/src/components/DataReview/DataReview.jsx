import { useState } from 'react';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function DataReview({ candidates, setSelectedCandidates, setStep }) {
  const [data, setData] = useState(candidates);
  const [selected, setSelected] = useState(candidates.map((_, i) => i));
  const [editingCell, setEditingCell] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = data.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.role?.toLowerCase().includes(search.toLowerCase()) ||
    c.organization?.toLowerCase().includes(search.toLowerCase())
  );

  const invalidEmails = data.filter(c => c.email && !isValidEmail(c.email));

  const toggleOne = (i) => {
    setSelected(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  const toggleAll = () => {
    setSelected(prev =>
      prev.length === filtered.length ? [] : filtered.map((_, i) => i)
    );
  };

  const handleEdit = (rowIndex, field, value) => {
    const updated = [...data];
    updated[rowIndex] = { ...updated[rowIndex], [field]: value };
    setData(updated);
  };

  const handleNext = () => {
    const chosen = data.filter((_, i) => selected.includes(i));
    setSelectedCandidates(chosen);
    setStep(3);
  };

  const fields = ['name', 'email', 'phone', 'organization', 'role', 'start_date', 'duration', 'mode', 'internship_name', 'AICTE_code'];

  return (
    <div className="review-container">
      <h2>Data Review</h2>
      <p className="subtitle">{selected.length} / {data.length} candidates selected</p>

      {/* Email Validation Warning */}
      {invalidEmails.length > 0 && (
        <div className="validation-warning">
          ⚠️ {invalidEmails.length} invalid email{invalidEmails.length > 1 ? 's' : ''} detected —{' '}
          {invalidEmails.map(c => c.email).join(', ')}
        </div>
      )}

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by name, email, role, organization..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-search" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      <p className="hint">💡 Click any cell to edit values directly</p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                />
              </th>
              {fields.map(f => <th key={f}>{f}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={fields.length + 1} style={{ textAlign: 'center', padding: '32px', color: '#aaaacc' }}>
                  No results found for "{search}"
                </td>
              </tr>
            ) : (
              filtered.map((c, i) => (
                <tr
                  key={i}
                  className={`${selected.includes(i) ? 'selected' : ''} ${c.email && !isValidEmail(c.email) ? 'invalid-row' : ''}`}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(i)}
                      onChange={() => toggleOne(i)}
                    />
                  </td>
                  {fields.map(field => (
                    <td
                      key={field}
                      onClick={() => setEditingCell({ row: i, field })}
                      className={field === 'email' && c.email && !isValidEmail(c.email) ? 'invalid-cell' : ''}
                    >
                      {editingCell?.row === i && editingCell?.field === field ? (
                        <input
                          className="cell-input"
                          autoFocus
                          value={c[field] || ''}
                          onChange={e => handleEdit(i, field, e.target.value)}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={e => e.key === 'Enter' && setEditingCell(null)}
                        />
                      ) : (
                        <span>{c[field] || '—'}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="actions">
        <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
        <button
          className="btn-primary"
          onClick={handleNext}
          disabled={selected.length === 0}
        >
          Next → ({selected.length} selected)
        </button>
      </div>
    </div>
  );
}

export default DataReview;