(() => {
  'use strict';
  const script = document.currentScript;
  const id = script && script.dataset.measurementId;
  if (!/^G-[A-Z0-9]+$/.test(id || '') || location.hostname !== 'ninedter.github.io') return;
  const key = 'henry-blog-analytics';
  const panel = document.getElementById('analytics-choice');
  let loaded = false;
  function readChoice() {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function start() {
    if (loaded) return;
    loaded = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: location.origin + location.pathname,
      page_referrer: document.referrer ? document.referrer.split(/[?#]/)[0] : '',
      cookie_domain: 'ninedter.github.io', cookie_flags: 'SameSite=Lax;Secure'
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(tag);
  }
  function choose(value) {
    try { localStorage.setItem(key, value); } catch (_) { /* Choice applies to this page. */ }
    panel.hidden = true;
    if (value === 'granted') { start(); return; }
    window['ga-disable-' + id] = true;
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      ['', ';domain=ninedter.github.io', ';domain=.ninedter.github.io'].forEach(domain => {
        document.cookie = name + '=;Max-Age=0;path=/' + domain;
      });
    });
    if (loaded) location.reload();
  }
  document.getElementById('analytics-accept').addEventListener('click', () => choose('granted'));
  document.getElementById('analytics-decline').addEventListener('click', () => choose('denied'));
  document.querySelectorAll('[data-analytics-settings]').forEach(button => {
    button.addEventListener('click', () => { panel.hidden = false; document.getElementById('analytics-accept').focus(); });
  });
  const choice = readChoice();
  if (choice === 'granted') start();
  else if (choice !== 'denied') panel.hidden = false;
})();
