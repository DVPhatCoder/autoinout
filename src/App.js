import React, { useState } from 'react';
import './App.css';
import { setValue } from './utils';

function App() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [startCell, setStartCell] = useState('');
  const [sheetName, setSheetName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const values = setValue(Number(month), Number(year));
      const res = await fetch('https://autoinoutin.onrender.com/api/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spreadsheetId,
          range: `${sheetName}!${startCell}`,
          values,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('thành công!');
      } else {
        setMessage('Lỗi: ' + (data.error || 'Không xác định'));
      }
    } catch (err) {
      setMessage('Lỗi kết nối server!');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h2>Ghi dữ liệu vào Google Sheets</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tháng (1-12): </label>
          <input type="number" value={month} onChange={e => setMonth(e.target.value)} min="1" max="12" required />
        </div>
        <div>
          <label>Năm (vd: 2024): </label>
          <input type="number" value={year} onChange={e => setYear(e.target.value)} required />
        </div>
        <div>
          <label>Spreadsheet ID: </label>
          <input type="text" value={spreadsheetId} onChange={e => setSpreadsheetId(e.target.value)} required />
        </div>
        <div>
          <label>Ô bắt đầu (vd: C16): </label>
          <input type="text" value={startCell} onChange={e => setStartCell(e.target.value)} required />
        </div>
        <div>
          <label>Tên sheet: </label>
          <input type="text" value={sheetName} onChange={e => setSheetName(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Đang ghi...' : 'Ghi dữ liệu'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
