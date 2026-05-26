import { useState } from 'react';
import { parseCSV } from '../../utils/csvParser';

function CSVUpload({ setCandidates, setStep }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFile = async (file) => {
    if (!file || !file.name.endsWith('.csv')) {
      setError('Sirf CSV file upload karo!');
      return;
    }

    try {
      const data = await parseCSV(file);
      setFileName(file.name);
      setCandidates(data);
      setError('');
      setTimeout(() => setStep(2), 800);
    } catch (err) {
      setError('CSV parse karne mein error aaya!');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="upload-container">
      <h2>Upload Candidates CSV</h2>
      <p className="subtitle">CSV mein yeh fields hone chahiye: name, email, role, start_date, duration, etc.</p>

      <div
        className={`dropzone ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('csvInput').click()}
      >
        <div className="dropzone-icon">📂</div>
        {fileName
          ? <p className="file-name">✅ {fileName} uploaded!</p>
          : <p>CSV file yahan drag karo <br /> ya <span className="browse">browse karo</span></p>
        }
        <input
          id="csvInput"
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CSVUpload;