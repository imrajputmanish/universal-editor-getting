export default function decorate(block) {
  // Read URL safely (fix UE vertical text issue)
  const url = block.textContent.replace(/\s+/g, '').trim();
  if (!url) return;

  // Clear UE generated markup
  block.innerHTML = '';

  let label = 'LINK';

  try {
    const parsedUrl = new URL(url, window.location.origin);
    let path = parsedUrl.pathname;

    if (path === '/' || path === '') {
      label = 'HOME';
    } else {
      const segments = path.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1];

      label = lastSegment
        .replace(/[-_]/g, ' ')
        .toUpperCase();
    }
  } catch (e) {
    label = 'LINK';
  }

  const a = document.createElement('a');
  a.href = url;
  a.className = 'link-text';
  a.textContent = label;

  // External links → new tab
  if (!url.startsWith('/')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  block.appendChild(a);
}