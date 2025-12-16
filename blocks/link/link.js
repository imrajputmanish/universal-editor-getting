export default function decorate(block) {
  // Fix UE vertical text issue
  const url = block.textContent.replace(/\s+/g, '').trim();
  if (!url) return;

  // Clear UE markup
  block.innerHTML = '';

  let label = 'Link';

  // Helper: Title Case converter
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  try {
    const parsedUrl = new URL(url, window.location.origin);
    let path = parsedUrl.pathname;

    if (path === '/' || path === '') {
      label = 'Home';
    } else {
      const segments = path.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1];

      const formatted = lastSegment.replace(/[-_]/g, ' ');
      label = toTitleCase(formatted);
    }
  } catch (e) {
    label = 'Link';
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