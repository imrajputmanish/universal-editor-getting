export default async function decorate(block) {
  const url = block.textContent.replace(/\s+/g, '').trim();
  if (!url) return;

  block.innerHTML = '';

  let iconName = '';
  let label = '';

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  try {
    const parsedUrl = new URL(url, window.location.origin);
    const path = parsedUrl.pathname;

    if (url.includes('instagram.com')) {
      iconName = 'instagram';
    } else if (url.includes('tiktok.com')) {
      iconName = 'tiktok';
    } else if (url.includes('threads.net')) {
      iconName = 'threads';
    } else if (url.startsWith('mailto:')) {
      iconName = 'mail';
    } else {
      if (path === '/' || path === '') {
        label = 'Home';
      } else {
        const segments = path.split('/').filter(Boolean);
        label = toTitleCase(segments[segments.length - 1].replace(/[-_]/g, ' '));
      }
    }
  } catch (e) {
    label = 'Link';
  }

  const a = document.createElement('a');
  a.href = url;
  a.className = iconName ? 'social-menu__icon' : 'link-text';

  if (!url.startsWith('/')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  // 🔥 INLINE SVG (IMPORTANT PART)
  if (iconName) {
    const res = await fetch(`/icons/${iconName}.svg`);
    const svgText = await res.text();
    a.innerHTML = svgText;
  } else {
    a.textContent = label;
  }

  block.appendChild(a);
}
