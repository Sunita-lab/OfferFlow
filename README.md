# OfferFlow — Bulk Offer Letter Dispatcher

**Developed by:** Sunita Satpathy  
**Organization:** Xyzon Innovations Pvt Ltd  
**Context:** Internship Task 2  
**Live URL:** https://offer-flow-chi.vercel.app

---

## 1. Overview

OfferFlow is a web-based bulk offer letter dispatcher that automates the process of generating and sending personalized offer letters to candidates. Instead of manually creating and emailing each letter, HR teams can upload a CSV file and send hundreds of personalized offer letters with PDF attachments in one click.

---

## 2. Problem Statement

Organizations conducting bulk internship or job programs face a repetitive challenge — generating individual offer letters and emailing them one by one is time-consuming and error-prone. OfferFlow solves this by automating the entire pipeline from data ingestion to email delivery.

---

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | Node.js + Express.js |
| Email Delivery | SendGrid API |
| PDF Generation | jsPDF |
| CSV Parsing | PapaParse |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Version Control | GitHub |

---

## 4. Core Features

- **CSV Upload** — Drag and drop or browse to upload candidate data
- **Data Review** — Interactive table with inline cell editing, search/filter, and select/deselect
- **Email Validation** — Automatically detects and highlights invalid email addresses
- **Template Selection** — 3 professionally designed offer letter templates
- **Email Customization** — Editable subject and body with dynamic placeholders
- **Bulk Send** — Generates personalized PDFs and sends emails to all selected candidates
- **Send Results** — Per-candidate success/failure status after dispatch

---

## 5. Four-Step Workflow

**Step 1 — CSV Upload**  
Upload a CSV file containing candidate records. Supported fields: `name, email, phone, organization, role, start_date, duration, mode, internship_name, AICTE_code, partner_name, registration_date, attendance_status, status, payment_status`

**Step 2 — Data Review**  
All uploaded records appear in an editable table. Users can search by name, email, role, or organization; select or deselect individual rows; edit any cell inline; and view invalid email warnings before proceeding.

**Step 3 — Template & Email Customization**  
Choose from three templates — Modern Minimal, Corporate Elegant, or Creative Vibrant. Customize the email subject and body using placeholders like `{{name}}` and `{{role}}` which are automatically replaced per candidate.

**Step 4 — Preview & Send**  
Preview the email and template for each candidate before sending. On confirmation, the system generates a personalized PDF for each candidate and dispatches emails with attachments via SendGrid.

---

## 6. Project Structure

```
offer-letter-dispatcher/
├── client/                        # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── CSVUpload/         # File upload with drag & drop
│   │   │   ├── DataReview/        # Candidate table with editing & search
│   │   │   ├── TemplateSelector/  # Template cards + email config
│   │   │   └── PreviewSend/       # Preview + bulk send
│   │   ├── utils/
│   │   │   ├── csvParser.js       # PapaParse wrapper
│   │   │   └── generatePdf.js     # jsPDF generation
│   │   ├── templates/             # Frontend template definitions
│   │   ├── App.jsx                # 4-step flow controller
│   │   └── index.css              # Global styles
│   └── package.json
│
└── server/                        # Node.js Backend
    ├── routes/
    │   ├── upload.js              # CSV upload + parse route
    │   ├── email.js               # Email dispatch route
    │   └── pdf.js                 # PDF route (legacy)
    ├── templates/                 # Server-side HTML templates
    ├── utils/
    │   └── mailer.js              # SendGrid client
    ├── .env                       # Environment variables
    └── index.js                   # Express server entry point
```

---

## 7. Environment Variables

```
# Server (.env)
PORT=5000
SMTP_USER=your@gmail.com
SENDGRID_API_KEY=SG.xxxxxxxxxx
```

---

## 8. Key Technical Decisions

**PDF on Frontend**  
Initially Puppeteer was used on the backend for HTML-to-PDF conversion. Render's free tier does not support Chrome installation, so PDF generation was moved to the frontend using jsPDF — a pure JavaScript library with no external dependencies.

**SendGrid over SMTP**  
Gmail SMTP via Nodemailer failed on Render due to IPv6 connectivity issues and port restrictions. SendGrid's HTTP-based API bypasses these limitations entirely and provides reliable delivery.

**Stateless Architecture**  
No database is used for candidate data. Records live only in browser memory during the session — keeping the system simple, fast, and privacy-friendly.

---

## 9. Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://offer-flow-chi.vercel.app |
| Backend | Render | https://offer-flow-server.onrender.com |

CI/CD is configured via GitHub — every push to main triggers automatic redeployment on both platforms.

---

## 10. Future Enhancements

- **Authentication** — JWT-based admin login
- **Database-driven templates** — MongoDB Atlas template storage with admin panel
- **Throttle delay** — Configurable dispatch delay to prevent SMTP rate limiting
- **Execution logs** — Campaign history and delivery audit trail
- **Excel support** — `.xlsx` file ingestion via SheetJS
- **Custom branding** — Organization logo upload per campaign

---

*OfferFlow — From CSV to inbox, in one click.*

