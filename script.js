const WHATSAPP_NUMBER = '447727056539'; // Abdul, in international format without + or spaces

document.getElementById('quoteForm').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  const val = id => document.getElementById(id).value.trim();
  const name = val('qName'), phone = val('qPhone');
  if (!name || !phone) {
    msg.textContent = 'Please add your name and phone number so we can get back to you.';
    msg.hidden = false;
    return;
  }
  const lines = [
    'Hi, I\'d like a free quote from GLrefub.',
    'Name: ' + name,
    'Phone: ' + phone,
    'Work: ' + val('qType'),
    val('qPost') ? 'Postcode: ' + val('qPost') : '',
    val('qMsg') ? 'Details: ' + val('qMsg') : ''
  ].filter(Boolean).join('
');
  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines);
  msg.innerHTML = '';
  msg.append('Your message is ready. ');
  const a = document.createElement('a');
  a.href = url; a.target = '_blank'; a.rel = 'noopener';
  a.className = 'btn btn-gold wa';
  a.textContent = 'Open WhatsApp to send';
  msg.append(a);
  msg.hidden = false;
  const w = window.open(url, '_blank', 'noopener');
});

document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', () => {
  const el = document.getElementById(b.dataset.copy);
  navigator.clipboard.writeText(el.textContent)
    .then(() => { b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy', 1500); })
    .catch(() => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
}));
