export const template1 = (candidate) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; color: #333; background: #fff; }
    .header { padding: 40px; border-bottom: 4px solid #6C63FF; }
    .header h1 { font-size: 28px; color: #6C63FF; letter-spacing: 2px; }
    .header p { color: #888; font-size: 13px; margin-top: 4px; }
    .content { padding: 40px; }
    .date { text-align: right; color: #888; font-size: 13px; margin-bottom: 30px; }
    .greeting { font-size: 18px; font-weight: 600; margin-bottom: 20px; }
    .body-text { line-height: 1.8; font-size: 14px; color: #444; }
    .details-box { background: #F4F3FF; border-left: 4px solid #6C63FF; padding: 20px 24px; margin: 30px 0; border-radius: 4px; }
    .details-box table { width: 100%; border-collapse: collapse; }
    .details-box td { padding: 8px 0; font-size: 14px; }
    .details-box td:first-child { color: #888; width: 40%; }
    .details-box td:last-child { font-weight: 600; color: #333; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; font-size: 13px; color: #888; }
    .company-name { font-weight: 700; color: #6C63FF; }
  </style>
</head>
<body>
  <div class="header">
    <h1>ABC PRIVATE LTD</h1>
    <p>Offer of Internship</p>
  </div>
  <div class="content">
    <p class="date">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    <p class="greeting">Dear ${candidate.name},</p>
    <p class="body-text">
      We are delighted to offer you an internship position at <strong>ABC Private Ltd</strong>.
      After careful consideration, we are pleased to extend this opportunity to you.
    </p>
    <div class="details-box">
      <table>
        <tr><td>Role</td><td>${candidate.role}</td></tr>
        <tr><td>Internship</td><td>${candidate.internship_name}</td></tr>
        <tr><td>Start Date</td><td>${candidate.start_date}</td></tr>
        <tr><td>Duration</td><td>${candidate.duration}</td></tr>
        <tr><td>Work Mode</td><td>${candidate.mode}</td></tr>
        <tr><td>Organization</td><td>${candidate.organization}</td></tr>
        <tr><td>AICTE Code</td><td>${candidate.AICTE_code}</td></tr>
      </table>
    </div>
    <p class="body-text">
      We look forward to having you on board. Please confirm your acceptance by replying to this email.
    </p>
    <div class="footer">
      <p>Warm regards,</p>
      <br/>
      <p class="company-name">ABC Private Ltd</p>
      <p>HR Department</p>
    </div>
  </div>
</body>
</html>
`;