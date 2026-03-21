import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, interest, industry, project, budget, timeline, phone, service, message } = body

    // Support both form shapes (multi-step contact + legacy single form)
    const displayName = name
    const displayEmail = email
    const displayDetails = message || project || ''
    const displayIndustry = industry || service || ''
    const displayInterest = Array.isArray(interest) ? interest.join(', ') : (interest || '')
    const displayBudget = budget || ''
    const displayTimeline = timeline || ''

    // Basic validation
    if (!displayName || !displayEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(displayEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO_EMAIL = process.env.CONTACT_EMAIL || 'iseniorprimo@gmail.com'

    if (RESEND_API_KEY) {
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Lead from SolveXAI Website</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px; font-weight: bold; width: 140px;">Name</td>
              <td style="padding: 8px;">${displayName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px; font-weight: bold;">Email</td>
              <td style="padding: 8px;"><a href="mailto:${displayEmail}">${displayEmail}</a></td>
            </tr>
            ${phone ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${phone}</td></tr>` : ''}
            ${displayInterest ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; font-weight: bold;">Interested In</td><td style="padding: 8px;">${displayInterest}</td></tr>` : ''}
            ${displayIndustry ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; font-weight: bold;">Industry</td><td style="padding: 8px;">${displayIndustry}</td></tr>` : ''}
            ${displayBudget ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; font-weight: bold;">Budget</td><td style="padding: 8px;">${displayBudget}</td></tr>` : ''}
            ${displayTimeline ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; font-weight: bold;">Timeline</td><td style="padding: 8px;">${displayTimeline}</td></tr>` : ''}
            ${displayDetails ? `<tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Project Details</td><td style="padding: 8px;">${displayDetails}</td></tr>` : ''}
          </table>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            Submitted: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST
          </p>
        </div>
      `

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'SolveXAI Website <noreply@solvexai.org>',
          to: [TO_EMAIL],
          reply_to: displayEmail,
          subject: `New lead: ${displayName} — ${displayInterest || displayIndustry || 'Website enquiry'}`,
          html: emailBody
        })
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error('Resend error:', errText)
      }
    } else {
      // No Resend key — log to console (development / fallback)
      console.log('[Contact Form] Submission (no RESEND_API_KEY set):', {
        name: displayName,
        email: displayEmail,
        interest: displayInterest,
        industry: displayIndustry,
        project: displayDetails,
        budget: displayBudget,
        timeline: displayTimeline,
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
