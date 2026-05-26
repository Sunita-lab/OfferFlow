export const template3 = (candidate) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: #fff; color: #333; }
    .header { background: linear-gradient(135deg, #F7971E, #FFD200); padding: 50px 40px; position: relative; overflow: hidden; }
    .header::before { content: ''; position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.15); border-radius: 50%; }
    .header::after { content: ''; position: absolute; bottom: -80px; left: -30px; width: 250px; height: 250px; background: rgba(255,255,255,0.1); border-radius: 50%; }
    .header h1 { color: #fff; font-size: 30px; font-weight: 800; letter-spacing: 2px; position: relative; z-index: 1; }
    .header p { color: rgba(255,255,255,0.85); font-size: 13px; margin-top: 6px; position: relative; z-index: 1; }
    .badge { display: inline-block; background: #fff; color: #F7971E; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-top: 12px; position: relative; z-index: 1; letter-spacing: 1px; }
    .content { padding: 40px; }
    .congrats { font-size: 22px; font-weight: 800; color: #F7971E; margin-bottom: 6px; }
    .name { font-size: 28px; font-weight: 900; color: #1a1a1a; margin-bottom: 24px; }
    .body-text { font-size: 14px; line-height: 1.8; color: #555; margin-bottom: 20px; }
    .cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 30px 0; }
    .card { background: #FFF8E7; border-radius: 12px; padding: 16px 20px; border-left: 4px solid #F7971E; }
    .card .label { font-size: 11px; color: #F7971E; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
    .card .value { font-size: 14px; font-weight: 600; color: #333; }
    .highlight { background: linear-gradient(135deg, #F7971E, #FFD200); color: #fff; border-radius: 12px; padding: 20px 24px; margin: 20px 0; }
    .highlight p { font-size: 14px; line-height: 1.7; }
    .signature { margin-top: 40px; }
    .signature p { font-size: 14px; line-height: 1.8; color: #555; }
    .company { font-weight: 800; font-size: 16px; color: #F7971E; }
    .footer { background: linear-gradient(135deg, #F7971E, #FFD200); padding: 16px 40px; margin-top: 40px; }
    .footer p { color: rgba(255,255,255,0.9); font-size: 11px; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>ABC PRIVATE LTD</h1>
    <p>Internship Offer Letter</p>
    <div class="badge">🎉 CONGRATULATIONS</div>
  </div>
  <div class="content">
    <p class="congrats">Congratulations!</p>
    <p class="name">${candidate.name}</p>
    <p class="body-text">
      We are thrilled to welcome you to the <strong>ABC Private Ltd</strong> family! 
      After a thorough review, we are excited to offer you this internship opportunity. 
      We believe you will make a fantastic addition to our team!
    </p>
    <div class="cards-grid">
      <div class="card">
        <p class="label">Role</p>
        <p class="value">${candidate.role}</p>
      </div>
      <div class="card">
        <p class="label">Program</p>
        <p class="value">${candidate.internship_name}</p>
      </div>
      <div class="card">
        <p class="label">Start Date</p>
        <p class="value">${candidate.start_date}</p>
      </div>
      <div class="card">
        <p class="label">Duration</p>
        <p class="value">${candidate.duration}</p>
      </div>
      <div class="card">
        <p class="label">Work Mode</p>
        <p class="value">${candidate.mode}</p>
      </div>
      <div class="card">
        <p class="label">Institution</p>
        <p class="value">${candidate.organization}</p>
      </div>
      <div class="card">
        <p class="label">AICTE Code</p>
        <p class="value">${candidate.AICTE_code}</p>
      </div>
      <div class="card">
        <p class="label">Partner</p>
        <p class="value">${candidate.partner_name}</p>
      </div>
    </div>
    <div class="highlight">
      <p>Please confirm your acceptance by replying to this email. 
      We look forward to an exciting and productive journey together! 🚀</p>
    </div>
    <div class="signature">
      <p>With excitement,</p>
      <br/>
      <p class="company">ABC Private Ltd</p>
      <p>HR & Onboarding Team</p>
      <p>${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
  </div>
  <div class="footer">
    <p>© ${new Date().getFullYear()} ABC Private Ltd · All Rights Reserved</p>
  </div>
</body>
</html>
`;