export default async function decorate(block) {
  const url = block.textContent.replace(/\s+/g, '').trim();
  if (!url) return;

  block.innerHTML = '';

  let iconName = '';
  let label = '';

  // Helper: Title Case for normal links
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
       SOCIAL / MAIL (FIRST)
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
       NORMAL LINKS (TEXT)
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

  const a = document.createElement('a');
  a.href = url;
  a.className = iconName ? 'social-menu__icon' : 'link-text';

  // External links → new tab
  if (!url.startsWith('/')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  /* =========================
     RENDER
     ========================= */
  if (iconName) {
    // UE + Localhost SAFE absolute path
    const iconUrl = `${window.location.origin}/icons/${iconName}.svg`;
    const res = await fetch(iconUrl);
    a.innerHTML = await res.text(); // INLINE SVG
  } else {
    a.textContent = label;
  }

  block.appendChild(a);
}
