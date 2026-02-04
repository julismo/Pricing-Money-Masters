import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { feedback, email, url, userAgent, timestamp, screenshot } = req.body;

        // Send email using Resend
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const TO_EMAIL = process.env.FEEDBACK_EMAIL || 'julismoquinto@gmail.com';

        if (!RESEND_API_KEY) {
            console.error('RESEND_API_KEY not configured');
            return res.status(500).json({ error: 'Email service not configured' });
        }

        const emailBody = `
      <h2>Novo Feedback Recebido</h2>
      <p><strong>Data/Hora:</strong> ${new Date(timestamp).toLocaleString('pt-PT')}</p>
      <p><strong>URL:</strong> ${url}</p>
      ${email ? `<p><strong>Email do Utilizador:</strong> ${email}</p>` : ''}
      
      <h3>Feedback:</h3>
      <p>${feedback.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p><strong>User Agent:</strong> ${userAgent}</p>
      ${screenshot ? '<p><strong>Screenshot:</strong> Anexado</p>' : ''}
    `;

        const emailPayload: any = {
            from: 'ROI Calculator <onboarding@resend.dev>',
            to: TO_EMAIL,
            subject: `[Feedback] ${email || 'Anónimo'} - ${new Date(timestamp).toLocaleDateString('pt-PT')}`,
            html: emailBody,
        };

        // Add attachment if screenshot exists
        if (screenshot) {
            emailPayload.attachments = [
                {
                    filename: screenshot.filename,
                    content: screenshot.content,
                },
            ];
        }

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify(emailPayload),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Resend API error:', error);
            throw new Error('Failed to send email');
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Feedback API error:', error);
        return res.status(500).json({ error: 'Failed to process feedback' });
    }
}
