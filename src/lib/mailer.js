import nodemailer from 'nodemailer';

let cachedTransporter = null;

function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSmtpConfig() {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '').trim();
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const port = Number(process.env.SMTP_PORT || 465);
  const notifyTo = (process.env.NOTIFY_EMAIL || user).trim();

  if (!user || !pass) {
    return null;
  }

  return { user, pass, host, port, notifyTo };
}

function getTransporter() {
  const config = getSmtpConfig();
  if (!config) return null;

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });
  }

  return { transporter: cachedTransporter, config };
}

function renderRowsHtml(rows) {
  return rows
    .filter((r) => r && r.value !== undefined && r.value !== null && String(r.value).trim() !== '')
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e5ece6;font-weight:600;color:#173B26;width:36%;vertical-align:top;font-size:13px;background:#f8fbf8;">
          ${escapeHtml(r.label)}
        </td>
        <td style="padding:10px 14px;border-bottom:1px solid #e5ece6;color:#374151;vertical-align:top;font-size:13px;white-space:pre-line;">
          ${escapeHtml(r.value)}
        </td>
      </tr>`
    )
    .join('');
}

function buildEmailLayout({ badge, heading, intro, rows, footerNote }) {
  return `
  <!DOCTYPE html>
  <html>
    <body style="margin:0;padding:0;background:#f4f7f4;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;background:#f4f7f4;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border:1px solid #dce5dd;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="background:#173B26;padding:20px 24px;">
                  <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#86efac;font-weight:700;margin-bottom:4px;">
                    ${escapeHtml(badge)}
                  </div>
                  <div style="font-size:20px;font-weight:700;color:#ffffff;">
                    KR Environ Solutions
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:24px;">
                  <h2 style="margin:0 0 10px 0;font-size:18px;color:#173B26;">
                    ${escapeHtml(heading)}
                  </h2>
                  <p style="margin:0 0 18px 0;font-size:14px;line-height:1.6;color:#4b5563;">
                    ${escapeHtml(intro)}
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dce5dd;border-radius:8px;overflow:hidden;border-collapse:collapse;">
                    ${renderRowsHtml(rows)}
                  </table>
                  ${
                    footerNote
                      ? `<p style="margin:18px 0 0 0;font-size:13px;line-height:1.6;color:#4b5563;">${escapeHtml(footerNote)}</p>`
                      : ''
                  }
                </td>
              </tr>
              <tr>
                <td style="background:#f5f8f3;padding:14px 24px;border-top:1px solid #dce5dd;font-size:12px;color:#68756d;">
                  KR Environ Solutions &bull; Ranchi (Jharkhand) &amp; Lucknow (UP)<br/>
                  Phone: +91 8317054180, +91 9155796749 &bull; Landline: 0651-4051577
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

async function sendDualEmails({
  adminSubject,
  adminBadge,
  adminHeading,
  adminIntro,
  adminRows,
  customerEmail,
  customerSubject,
  customerBadge,
  customerHeading,
  customerIntro,
  customerRows,
  customerFooterNote
}) {
  const mailClient = getTransporter();
  if (!mailClient) {
    console.warn('SMTP credentials are not configured; skipping form email notifications.');
    return { adminSent: false, customerSent: false, skipped: true };
  }

  const { transporter, config } = mailClient;
  const fromAddress = `"KR Environ Solutions" <${config.user}>`;

  const adminMailPromise = transporter.sendMail({
    from: fromAddress,
    to: config.notifyTo,
    replyTo: customerEmail || config.notifyTo,
    subject: adminSubject,
    html: buildEmailLayout({
      badge: adminBadge,
      heading: adminHeading,
      intro: adminIntro,
      rows: adminRows,
      footerNote: 'You can reply directly to this email to respond to the sender.'
    })
  });

  const cleanCustomerEmail = (customerEmail || '').trim();
  const customerMailPromise = cleanCustomerEmail
    ? transporter.sendMail({
        from: fromAddress,
        to: cleanCustomerEmail,
        replyTo: config.notifyTo,
        subject: customerSubject,
        html: buildEmailLayout({
          badge: customerBadge,
          heading: customerHeading,
          intro: customerIntro,
          rows: customerRows,
          footerNote: customerFooterNote
        })
      })
    : Promise.resolve({ skipped: true });

  const [adminRes, customerRes] = await Promise.allSettled([adminMailPromise, customerMailPromise]);

  if (adminRes.status === 'rejected') {
    console.error('Admin notification email failed:', adminRes.reason?.message || adminRes.reason);
  }
  if (customerRes.status === 'rejected') {
    console.error('Customer thank-you email failed:', customerRes.reason?.message || customerRes.reason);
  }

  return {
    adminSent: adminRes.status === 'fulfilled',
    customerSent: customerRes.status === 'fulfilled' && !customerRes.value?.skipped
  };
}

export async function sendEnquiryEmails(enquiry) {
  const rows = [
    { label: 'Full Name', value: enquiry.name },
    { label: 'Department / Organization', value: enquiry.organization || 'Not specified' },
    { label: 'Email Address', value: enquiry.email },
    { label: 'Contact Phone', value: enquiry.phone },
    { label: 'Service / Technology', value: enquiry.service || 'General Enquiry' },
    { label: 'Project Details / Message', value: enquiry.message || 'No additional details provided' }
  ];

  return sendDualEmails({
    adminSubject: `New Enquiry: ${enquiry.service || 'Consultation'} — ${enquiry.name}`,
    adminBadge: 'New Website Enquiry',
    adminHeading: 'New Contact / Consultation Enquiry Received',
    adminIntro: `A new enquiry has been submitted through the KR Environ Solutions website by ${enquiry.name}.`,
    adminRows: rows,
    customerEmail: enquiry.email,
    customerSubject: 'Thank You for Contacting KR Environ Solutions',
    customerBadge: 'Enquiry Confirmation',
    customerHeading: `Thank You, ${enquiry.name}!`,
    customerIntro:
      'We have received your enquiry and appreciate you reaching out to KR Environ Solutions. Our technical liaison team will review your requirements and contact you shortly.',
    customerRows: [
      { label: 'Selected Requirement', value: enquiry.service || 'General Enquiry' },
      { label: 'Organization', value: enquiry.organization || 'Not specified' },
      { label: 'Contact Number', value: enquiry.phone },
      { label: 'Your Message', value: enquiry.message || '—' }
    ],
    customerFooterNote:
      'If your request is urgent, feel free to call us at +91 8317054180 or +91 9155796749.'
  });
}

export async function sendCareerApplicationEmails(application) {
  const rows = [
    { label: 'Position Applied', value: application.careerTitle },
    { label: 'Department', value: application.department || 'Environmental & Forestry' },
    { label: 'Applicant Name', value: application.applicantName },
    { label: 'Email Address', value: application.email },
    { label: 'Mobile Number', value: application.phone },
    { label: 'Current City', value: application.city || 'Not specified' },
    { label: 'College / University', value: application.collegeOrUniversity || 'Not specified' },
    { label: 'Degree / Qualification', value: application.qualification || 'Not specified' },
    { label: 'Passing Year', value: application.passingYear || 'Not specified' },
    { label: 'Experience / Skills', value: application.experienceSummary || 'Not specified' },
    { label: 'Statement / Note', value: application.coverNote || '—' }
  ];

  return sendDualEmails({
    adminSubject: `New Career Application: ${application.careerTitle} — ${application.applicantName}`,
    adminBadge: 'New Career / Internship Application',
    adminHeading: 'New Candidate Application Received',
    adminIntro: `${application.applicantName} has applied for ${application.careerTitle} via the Careers page.`,
    adminRows: rows,
    customerEmail: application.email,
    customerSubject: `Application Received — ${application.careerTitle} | KR Environ Solutions`,
    customerBadge: 'Application Confirmation',
    customerHeading: `Thank You for Applying, ${application.applicantName}!`,
    customerIntro: `We have received your application for "${application.careerTitle}" at KR Environ Solutions. Our recruitment team will review your profile and reach out if shortlisted.`,
    customerRows: [
      { label: 'Position Applied', value: application.careerTitle },
      { label: 'Qualification', value: application.qualification || 'Not specified' },
      { label: 'College / University', value: application.collegeOrUniversity || 'Not specified' },
      { label: 'Mobile Number', value: application.phone }
    ],
    customerFooterNote:
      'Thank you for your interest in building a career in environmental stewardship and wildlife conservation with KR Environ Solutions.'
  });
}

