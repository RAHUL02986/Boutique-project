import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { sendEmail } from '@/lib/nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    try {
      await connectDB();
      const contact = new Contact({ name, email, subject, message });
      await contact.save();
    } catch (dbError) {
      console.log('MongoDB not available, skipping database save');
    }

    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@boutique.com',
        subject: `New Contact Form: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      await sendEmail({
        to: email,
        subject: 'Thank you for contacting Boutique',
        text: `
Dear ${name},

Thank you for reaching out to us! We have received your message and will get back to you within 24-48 hours.

Best regards,
The Boutique Team
        `,
        html: `
<h2>Thank you for contacting Boutique!</h2>
<p>Dear ${name},</p>
<p>Thank you for reaching out to us! We have received your message and will get back to you within 24-48 hours.</p>
<p>Best regards,<br>The Boutique Team</p>
        `,
      });
    } catch (emailError) {
      console.log('Email sending failed (SMTP not configured):', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully!' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your message' },
      { status: 500 }
    );
  }
}
