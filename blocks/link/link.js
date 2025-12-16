export default async function decorate(block) {
  const url = block.textContent.replace(/\s+/g, '').trim();
  if (!url) return;

  block.innerHTML = '';

  let iconName = '';
  let label = '';

  // Helper: Title Case
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  try {
    const parsedUrl = new URL(url, window.location.origin);
    const hostname = parsedUrl.hostname;
    const path = parsedUrl.pathname;

    /* =========================
       1️⃣ SOCIAL / MAIL (FIRST)
       ========================= */
    if (hostname.includes('instagram.com')) {
      iconName = 'instagram';
    } else if (hostname.includes('tiktok.com')) {
      iconName = 'tiktok';
    } else if (
      hostname.includes('threads.net') ||
      hostname.includes('threads.com')
    ) {
      iconName = 'threads';
    } else if (hostname.includes('facebook.com')) {
      iconName = 'facebook';
    } else if (
      hostname.includes('twitter.com') ||
      hostname.includes('x.com')
    ) {
      iconName = 'twitter';
    } else if (url.startsWith('mailto:')) {
      iconName = 'mail';
    }

    /* =========================
       2️⃣ NORMAL LINKS (TEXT)
       ========================= */
    else {
      if (path === '/' || path === '') {
        label = 'Home';
      } else {
        const segments = path.split('/').filter(Boolean);
        label = toTitleCase(
          segments[segments.length - 1].replace(/[-_]/g, ' ')
        );
      }
    }
  } catch (e) {
    label = 'Link';
  }

  // Create anchor
  const a = document.createElement('a');
  a.href = url;
  a.className = iconName ? 'social-menu__icon' : 'link-text';

  // External links → new tab
  if (!url.startsWith('/')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  // ICON ONLY
  if (iconName) {
    const res = await fetch(`/icons/${iconName}.svg`);
    a.innerHTML = await res.text();
  }
  // TEXT ONLY
  else {
    a.textContent = label;
  }

  block.appendChild(a);
}
