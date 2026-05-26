export const template2 = (candidate) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Georgia, serif; color: #222; background: #fff; }
    .header { background: #1A1A2E; padding: 40px; display: flex; justify-content: space-between; align-items: center; }
    .header h1 { color: #fff; font-size: 24px; letter-spacing: 3px; }
    .header .tagline { color: #E94560; font-size: 12px; letter-spacing: 2px; margin-top: 6px; }
    .red-bar { height: 5px; background: linear-gradient(to right, #E94560, #1A1A2E); }
    .content { padding: 50px; }
    .ref { font-size: 12px; color: #888; margin-bottom: 30px; }
    .date { font-size: 13px; color: #555; margin-bottom: 30px; }
    .subject { font-size: 16px; font-weight: bold; text-decoration: underline; margin-bottom: 24px; color: #1A1A2E; }
    .greeting { font-size: 15px; margin-bottom: 16px; }
    .body-text { font-size: 14px; line-height: 1.9; color: #333; margin-bottom: 16px; }
    .details-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    .details-table th { background: #1A1A2E; color: #fff; padding: 10px 16px; text-align: left; font-size: 13px; }
    .details-table td { padding: 10px 16px; font-size: 13px; border-bottom: 1px solid #eee; }
    .details-table tr:nth-child(even) td { background: #f9f9f9; }
    .signature { margin-top: 50px; }
    .signature p { font-size: 14px; line-height: 1.8; }
    .company { font-weight: bold; color: #1A1A2E; font-size: 15px; }
    .footer { margin-top: 40px; padding: 16px 50px; background: #1A1A2E; }
    .footer p { color: #888; font-size: 11px; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>ABC PRIVATE LTD</h1>
      <p class="tagline">EXCELLENCE · INTEGRITY · INNOVATION</p>
    </div>
  </div>
  <div class="red-bar"></div>
  <div class="content">
    <p class="ref">Ref: ABC/INT/${new Date().getFullYear()}/${Math.floor(Math.random() * 9000) + 1000}</p>
    <p class="date">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    <p class="subject">SUBJECT: OFFER OF INTERNSHIP</p>
    <p class="greeting">Dear ${candidate.name},</p>
    <p class="body-text">
      With reference to your application and subsequent interaction with our team, 
      we are pleased to offer you an internship with <strong>ABC Private Ltd</strong> 
      on the following terms and conditions:
    </p>
    <table class="details-table">
      <tr><th>Particulars</th><th>Details</th></tr>
      <tr><td>Name</td><td>${candidate.name}</td></tr>
      <tr><td>Role / Designation</td><td>${candidate.role}</td></tr>
      <tr><td>Internship Program</td><td>${candidate.internship_name}</td></tr>
      <tr><td>Commencement Date</td><td>${candidate.start_date}</td></tr>
      <tr><td>Duration</td><td>${candidate.duration}</td></tr>
      <tr><td>Mode of Work</td><td>${candidate.mode}</td></tr>
      <tr><td>Institution</td><td>${candidate.organization}</td></tr>
      <tr><td>AICTE Code</td><td>${candidate.AICTE_code}</td></tr>
    </table>
    <p class="body-text">
      This offer is subject to submission of required documents prior to joining. 
      Kindly acknowledge your acceptance by signing and returning a copy of this letter.
    </p>
    <div class="signature">
      <p>Yours sincerely,</p>
      <br/><br/>
      <p class="company">ABC Private Ltd</p>
      <p>Authorized Signatory</p>
      <p>Human Resources Department</p>
    </div>
  </div>
  <div class="footer">
    <p>This is a computer generated letter. © ${new Date().getFullYear()} ABC Private Ltd. All rights reserved.</p>
  </div>
</body>
</html>
`;