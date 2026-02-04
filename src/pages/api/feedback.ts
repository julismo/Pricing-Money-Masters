import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const feedback = formData.get('feedback') as string;
        const email = formData.get('email') as string;
        const url = formData.get('url') as string;
        const userAgent = formData.get('userAgent') as string;
        const timestamp = formData.get('timestamp') as string;
        const screenshot = formData.get('screenshot') as File | null;

        // Convert screenshot to base64 if exists
        let screenshotBase64 = '';
        if (screenshot) {
            const arrayBuffer = await screenshot.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            screenshotBase64 = buffer.toString('base64');
        }

        // Send email using Resend
        const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
        const TO_EMAIL = import.meta.env.FEEDBACK_EMAIL || 'your-email@example.com';

        if (!RESEND_API_KEY) {
            console.error('RESEND_API_KEY not configured');
            return new Response(
                JSON.stringify({ error: 'Email service not configured' }),
                { status: 500 }
            );
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
        if (screenshot && screenshotBase64) {
            emailPayload.attachments = [
                {
                    filename: screenshot.name,
                    content: screenshotBase64,
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

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Feedback API error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to process feedback' }),
            { status: 500 }
        );
    }
};
