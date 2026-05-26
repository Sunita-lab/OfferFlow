import { jsPDF } from 'jspdf';

export const generatePdf = (candidate, templateId) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const colors = {
    1: { primary: [108, 99, 255], light: [244, 243, 255] },
    2: { primary: [26, 26, 46], light: [240, 240, 245] },
    3: { primary: [247, 151, 30], light: [255, 248, 231] },
  };

  const color = colors[templateId] || colors[1];

  // Header background
  doc.setFillColor(...color.primary);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ABC PRIVATE LTD', 14, 15);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Offer of Internship', 14, 25);

  // Date
  doc.setTextColor(130, 130, 130);
  doc.setFontSize(10);
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text(date, pageWidth - 14, 45, { align: 'right' });

  // Greeting
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(`Dear ${candidate.name},`, 14, 55);

  // Body text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  const bodyText = `We are delighted to offer you an internship position at ABC Private Ltd. After careful consideration, we are pleased to extend this opportunity to you.`;
  const splitBody = doc.splitTextToSize(bodyText, pageWidth - 28);
  doc.text(splitBody, 14, 68);

  // Details box background
  doc.setFillColor(...color.light);
  doc.roundedRect(10, 85, pageWidth - 20, 75, 3, 3, 'F');

  // Details box border
  doc.setDrawColor(...color.primary);
  doc.setLineWidth(0.5);
  doc.roundedRect(10, 85, pageWidth - 20, 75, 3, 3, 'S');

  // Details
  doc.setFontSize(10);
  const details = [
    ['Role', candidate.role],
    ['Internship', candidate.internship_name],
    ['Start Date', candidate.start_date],
    ['Duration', candidate.duration],
    ['Work Mode', candidate.mode],
    ['Organization', candidate.organization],
    ['AICTE Code', candidate.AICTE_code || 'N/A'],
  ];

  details.forEach(([label, value], i) => {
    const y = 95 + i * 9;
    doc.setTextColor(130, 130, 130);
    doc.setFont('helvetica', 'normal');
    doc.text(label, 16, y);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(value || 'N/A', 70, y);
  });

  // Closing text
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(11);
  doc.text('We look forward to having you on board.', 14, 170);
  doc.text('Please confirm your acceptance by replying to this email.', 14, 180);

  // Signature
  doc.setTextColor(80, 80, 80);
  doc.text('Warm regards,', 14, 200);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...color.primary);
  doc.setFontSize(12);
  doc.text('ABC Private Ltd', 14, 210);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text('HR Department', 14, 218);

  // Footer
  doc.setFillColor(...color.primary);
  doc.rect(0, 280, pageWidth, 17, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`© ${new Date().getFullYear()} ABC Private Ltd. All Rights Reserved.`, pageWidth / 2, 290, { align: 'center' });

  return doc.output('arraybuffer');
};