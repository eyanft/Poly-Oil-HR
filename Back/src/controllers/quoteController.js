import { Resend } from 'resend';

function getEnv() {
  return {
    QUOTE_EMAIL: (process.env.QUOTE_EMAIL || '').trim(),
    RESEND_API_KEY: (process.env.RESEND_API_KEY || '').trim(),
    // Adresse d'envoi : utilise "onboarding@resend.dev" (fourni par Resend à l'inscription) ou ton domaine vérifié
    RESEND_FROM: (process.env.RESEND_FROM || 'Poly Oil <onboarding@resend.dev>').trim(),
  };
}

/**
 * POST /api/quote
 * Body: { name, email, phone?, company?, productName?, message }
 * Envoi par Resend (gratuit : 3000 emails/mois) — une clé API suffit, pas de SMTP.
 */
export async function sendQuote(req, res) {
  try {
    const env = getEnv();
    const { name, email, phone, company, productName, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nom et email requis' });
    }

    if (!env.QUOTE_EMAIL) {
      console.error('QUOTE_EMAIL non configuré dans .env');
      return res.status(503).json({
        error: 'Envoi de devis non configuré. Contactez l’administrateur.',
      });
    }

    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY non configuré dans .env');
      return res.status(503).json({
        error: 'Envoi d’email non configuré. Ajoutez RESEND_API_KEY dans .env.',
      });
    }

    const resend = new Resend(env.RESEND_API_KEY);

    const html = `
      <h2>Nouvelle demande de devis</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>` : ''}
      ${company ? `<p><strong>Société :</strong> ${escapeHtml(company)}</p>` : ''}
      ${productName ? `<p><strong>Produit concerné :</strong> ${escapeHtml(productName)}</p>` : ''}
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message || '(aucun message)')}</p>
      <hr>
      <p><em>Vous pouvez répondre directement à cet email (Reply-To: ${escapeHtml(email)})</em></p>
    `;

    const { data, error } = await resend.emails.send({
      from: env.RESEND_FROM,
      to: [env.QUOTE_EMAIL],
      reply_to: email,
      subject: `Demande de devis - ${name}${productName ? ` - ${productName}` : ''}`,
      html,
    });

    if (error) {
      console.error('Erreur envoi devis (Resend):', error);
      return res.status(500).json({
        error: 'Impossible d’envoyer la demande. Réessayez plus tard.',
      });
    }

    res.status(200).json({ success: true, message: 'Demande envoyée avec succès' });
  } catch (err) {
    console.error('Erreur envoi devis:', err);
    res.status(500).json({
      error: 'Impossible d’envoyer la demande. Réessayez plus tard.',
    });
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
