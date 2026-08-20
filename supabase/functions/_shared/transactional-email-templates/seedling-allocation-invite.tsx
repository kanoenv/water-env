/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  organizationName?: string
  startDate?: string
}

const formatToday = () => {
  try {
    return new Date().toLocaleDateString('en-NG', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return new Date().toDateString()
  }
}

const Email = ({ startDate }: Props) => {
  const today = startDate || formatToday()
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Invitation to collect tree seedlings — Kano State Ministry of Water Resources,
        Environment and Climate Change
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={ministryEyebrow}>Kano State Government</Text>
            <Heading as="h1" style={ministryTitle}>
              Ministry of Water Resources, Environment and Climate Change
            </Heading>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={paragraph}>Dear Organization,</Text>

            <Text style={paragraph}>
              The Kano State Ministry of Water Resources, Environment &amp; Climate
              Change invites you for allocation of tree seedlings.
            </Text>

            <Text style={paragraph}>
              Kindly visit <strong>Audu Bako Secretariat, Ministry of Environment
              Conference Room</strong>, with your registered phone number or email
              for verification.
            </Text>

            <Section style={callout}>
              <Text style={calloutTitle}>Allocation Schedule</Text>
              <Text style={calloutLine}><strong>Days:</strong> Weekdays</Text>
              <Text style={calloutLine}><strong>Time:</strong> 11:00 a.m. – 2:00 p.m.</Text>
            </Section>

            <Section style={contactBox}>
              <Text style={calloutTitle}>Contact</Text>
              <Text style={calloutLine}>
                <Link href="tel:+2348137188322" style={contactLink}>
                  0813 718 8322
                </Link>
              </Text>
            </Section>

            <Text style={paragraph}>
              We appreciate your support and partnership in promoting a greener
              and more sustainable Kano State.
            </Text>

            <Text style={paragraph}>Yours faithfully,</Text>
            <Text style={signature}>
              Kano State Ministry of Water Resources,<br />
              Environment and Climate Change
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footerText}>
              Kano State Ministry of Water Resources, Environment and Climate Change ·{' '}
              <Link href="https://environment.kn.gov.ng" style={footerLink}>
                environment.kn.gov.ng
              </Link>
            </Text>
            <Text style={footerText}>
              To stop receiving these notices,{' '}
              <Link href="https://environment.kn.gov.ng/unsubscribe" style={footerLink}>
                unsubscribe here
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject:
    'Invitation to Collect Tree Seedlings — Kano State Ministry of Environment',
  displayName: 'Seedling Allocation Invitation',
  previewData: { organizationName: 'Sample Organization' },
} satisfies TemplateEntry

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily:
    '"Source Serif 4", Georgia, "Times New Roman", serif',
  color: '#0f2b1e',
}
const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '32px 28px',
}
const header: React.CSSProperties = { textAlign: 'center' as const }
const ministryEyebrow: React.CSSProperties = {
  fontFamily: '"Space Grotesk", Arial, sans-serif',
  fontSize: '12px',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  color: '#a17a1f',
  margin: '0 0 6px',
}
const ministryTitle: React.CSSProperties = {
  fontSize: '20px',
  lineHeight: '1.3',
  color: '#064e3b',
  margin: 0,
}
const hr: React.CSSProperties = {
  borderColor: '#c9a44a',
  borderStyle: 'solid',
  borderWidth: '1px 0 0',
  margin: '20px 0',
}
const paragraph: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.7',
  color: '#1c3a2b',
  margin: '0 0 14px',
}
const callout: React.CSSProperties = {
  backgroundColor: '#f4efe1',
  border: '1px solid #d9c88a',
  borderRadius: '10px',
  padding: '16px 20px',
  margin: '18px 0',
}
const contactBox: React.CSSProperties = {
  backgroundColor: '#ecfdf5',
  border: '1px solid #a7f3d0',
  borderRadius: '10px',
  padding: '16px 20px',
  margin: '18px 0',
}
const contactLink: React.CSSProperties = {
  color: '#064e3b',
  fontWeight: 700,
  textDecoration: 'none',
}
const calloutTitle: React.CSSProperties = {
  fontFamily: '"Space Grotesk", Arial, sans-serif',
  fontSize: '13px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  color: '#064e3b',
  margin: '0 0 8px',
}
const calloutLine: React.CSSProperties = {
  fontSize: '15px',
  color: '#1c3a2b',
  margin: '2px 0',
}
const signature: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#064e3b',
  fontWeight: 600,
  margin: '4px 0 0',
}
const footerText: React.CSSProperties = {
  fontFamily: '"Space Grotesk", Arial, sans-serif',
  fontSize: '12px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '4px 0',
}
const footerLink: React.CSSProperties = {
  color: '#065f46',
  textDecoration: 'underline',
}
