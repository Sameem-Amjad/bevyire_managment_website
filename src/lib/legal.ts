import { site } from "./site";

export interface LegalSection {
  heading: string;
  body: string[];
}

export const LEGAL_UPDATED = "19 July 2026";

export const privacySections: LegalSection[] = [
  {
    heading: "Introduction",
    body: [
      `${site.legalName} ("Bevy Irie", "we", "us" or "our") respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use and safeguard the information you share with us through this website.`,
      "This is a template privacy policy provided as a starting point and should be reviewed by a qualified professional before publication.",
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "When you complete our contact form, we collect the details you choose to provide — typically your name, email address, phone number, property address and the contents of your message.",
      "We may also collect limited technical information automatically, such as your device type, browser and general usage patterns, to help us improve the website.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use the information you provide solely to respond to your enquiry, provide the services you request, and communicate with you about your property. We do not sell your personal data to third parties.",
      "Where we use email delivery providers to send correspondence, your data is processed only for the purpose of delivering those messages.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Our website uses a small number of cookies to remember your preferences and to understand how the site is used. You can accept or decline non-essential cookies at any time using the on-site consent controls, or through your browser settings.",
    ],
  },
  {
    heading: "Data Retention & Security",
    body: [
      "We retain enquiry information only for as long as necessary to serve you and to meet our legal obligations. We apply appropriate technical and organisational measures to protect your data against unauthorised access, loss or disclosure.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "You have the right to request access to, correction of, or deletion of the personal data we hold about you. To exercise any of these rights, please contact us using the details below.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `If you have any questions about this policy or how we handle your data, please email us at ${site.contact.email} or write to us at ${site.contact.address.full}.`,
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "Agreement to Terms",
    body: [
      `By accessing and using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the site.`,
      "This is a template terms document provided as a starting point and should be reviewed by a qualified professional before publication.",
    ],
  },
  {
    heading: "Use of the Website",
    body: [
      "This website is provided for general information about Bevy Irie's property services. You agree to use it lawfully and not to misuse it in any way that could damage, disable or impair the site or interfere with any other party's use of it.",
    ],
  },
  {
    heading: "No Professional Advice",
    body: [
      "The content on this website is for informational purposes only and does not constitute legal, financial or investment advice. Any decisions you make regarding property should be taken after seeking appropriate professional guidance.",
    ],
  },
  {
    heading: "Enquiries & Communication",
    body: [
      "Submitting an enquiry through our contact form does not create a binding agreement for services. Any engagement will be governed by a separate written agreement setting out the specific scope, fees and terms.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "All content on this website, including text, graphics, logos and design, is the property of Bevy Irie or its licensors and is protected by applicable intellectual property laws. You may not reproduce it without our written permission.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "While we take care to keep the information on this site accurate and up to date, we make no warranties as to its completeness or accuracy. To the fullest extent permitted by law, we are not liable for any loss arising from reliance on the content of this website.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about these terms can be directed to ${site.contact.email} or ${site.contact.address.full}.`,
    ],
  },
];
