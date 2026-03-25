import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const RESEND_API_URL = 'https://api.resend.com/emails'
const LEADS_DIR = join(process.cwd(), 'data')
const LEADS_FILE = join(LEADS_DIR, 'leads.json')

interface LeadEntry {
  id: string
  submittedAt: string
  name: string
  email: string
  businessName: string
  businessType: string
  needs: string[]
  budget: string
  timeline: string
  projectDetails: string
  source: string
}

function storeLead(lead: LeadEntry) {
  try {
    if (!existsSync(LEADS_DIR)) mkdirSync(LEADS_DIR, { recursive: true })
    const existing: LeadEntry[] = existsSync(LEADS_FILE)
      ? JSON.parse(readFileSync(LEADS_FILE, 'utf-8'))
      : []
    existing.push(lead)
    writeFileSync(LEADS_FILE, JSON.stringify(existing, null, 2), 'utf-8')
  } catch (err) {
    console.error('[qualify] Failed to store lead locally:', err)
  }
}

function buildEmailHtml(lead: LeadEntry): string {
  const rows = [
    ['Name', lead.name],
    ['Email', `<a href="mailto:${lead.email}">${lead.email}</a>`],
    ['Business Name', lead.businessName],
    ['Business Type', lead.businessType],
    ['Needs', lead.needs.join(', ')],
    ['Budget', lead.budget],
    ['Timeline', lead.timeline],
    ['Source', lead.source],
  ]
    .map(
      ([label, value]) =>
        `<tr style="border-bottom:1px solid #eee;">
          <td style="padding:10px 12px;font-weight:600;width:160px;color:#555;">${label}</td>
          <td style="padding:10px 12px;">${value}</td>
        </tr>`
    )
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#7c3aed,#2563eb);padding:28px 32px;">
        <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">New Lead — SolveXAI</h1>
        <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">
          Submitted ${new Date(lead.submittedAt).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST
        </p>
      </div>

      <div style="padding:24px 32px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>

        <div style="margin-top:24px;padding:16px;background:#f8f5ff;border-left:4px solid #7c3aed;border-radius:4px;">
          <p style="margin:0 0 8px;font-weight:600;color:#7c3aed;">Project Details</p>
          <p style="margin:0;white-space:pre-wrap;color:#333;">${lead.projectDetails}</p>
        </div>

        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${lead.email}"
             style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">
            Reply to ${lead.name} →
          </a>
        </div>
      </div>

      <div style="padding:16px 32px;background:#f9f9f9;border-top:1px solid #eee;">
        <p style="margin:0;font-size:12px;color:#999;text-align:center;">
          Lead ID: ${lead.id} · SolveXAI Lead Qualification System
        </p>
      </div>
    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      businessName,
      businessType,
      needs,
      budget,
      timeline,
      projectDetails,
      source,
    } = body

    // Basic validation
    if (!name || !email || !businessName || !businessType || !budget || !timeline || !projectDetails || !source) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (!Array.isArray(needs) || needs.length === 0) {
      return NextResponse.json({ error: 'Please select at least one need' }, { status: 400 })
    }

    const lead: LeadEntry = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      submittedAt: new Date().toISOString(),
      name,
      email,
      businessName,
      businessType,
      needs,
      budget,
      timeline,
      projectDetails,
      source,
    }

    // Store locally
    storeLead(lead)

    // Send email via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO_EMAIL = process.env.CONTACT_EMAIL || 'iseniorprimo@gmail.com'

    if (RESEND_API_KEY) {
      const res = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'SolveXAI Leads <noreply@solvexai.org>',
          to: [TO_EMAIL],
          reply_to: email,
          subject: `New Lead: ${name} — ${businessName} (${budget})`,
          html: buildEmailHtml(lead),
        }),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error('[qualify] Resend error:', errText)
        // Don't fail — lead is stored locally
      }
    } else {
      console.log('[qualify] No RESEND_API_KEY — lead stored locally only:', lead.id)
    }

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 200 })
  } catch (error) {
    console.error('[qualify] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
