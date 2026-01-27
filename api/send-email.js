// api/send-email.js
// Vercel Serverless Function to send emails via Resend

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, body, isTest } = req.body;

  // Your Resend API key
  const RESEND_API_KEY = 're_d6hCPoBY_6MAenZgjWz5R8dZ5WCmyySqD';
  const FROM_EMAIL = 'onboarding@resend.dev';
  const TEST_EMAIL = 'erbyrd22@gmail.com';

  // If test mode, send to your email instead
  const recipient = isTest ? TEST_EMAIL : to;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [recipient],
        subject: subject,
        html: body.replace(/\n/g, '<br/>'),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, id: data.id, sentTo: recipient });
    } else {
      console.error('Resend error:', data);
      return res.status(400).json({ success: false, error: data.message || 'Failed to send email' });
    }
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
