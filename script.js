(() => {
  const links = window.WEDDING_LINKS || {};
  const connect = (id, value) => {
    if (typeof value !== 'string' || !value.trim()) return false;
    let url;
    try { url = new URL(value); } catch { return false; }
    if (url.protocol !== 'https:') return false;
    const element = document.getElementById(id);
    if (!element) return false;
    element.href = url.href;
    element.target = '_blank';
    element.rel = 'noopener noreferrer';
    element.removeAttribute('aria-disabled');
    element.removeAttribute('tabindex');
    element.removeAttribute('aria-describedby');
    return true;
  };
  connect('rsvp-button', links.rsvp);
  connect('telegram-link', links.telegram);

  const countdown = document.getElementById('countdown');
  if (!countdown) return;
  const target = Date.parse(countdown.dataset.target);
  if (!Number.isFinite(target)) return;
  const title = document.getElementById('countdown-title');
  let interval;
  const updateCountdown = () => {
    const total = Math.max(0, Math.ceil((target - Date.now()) / 1000));
    const values = {
      days: Math.floor(total / 86400),
      hours: Math.floor(total / 3600) % 24,
      minutes: Math.floor(total / 60) % 60,
      seconds: total % 60
    };
    for (const [unit, value] of Object.entries(values)) {
      countdown.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, '0');
    }
    if (total === 0) {
      title.textContent = 'Этот день настал!';
      clearInterval(interval);
    }
    return total;
  };
  if (updateCountdown() > 0) interval = setInterval(updateCountdown, 1000);
})();
