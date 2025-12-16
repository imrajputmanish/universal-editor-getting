export default function decorate(block) {
  const url = block.textContent.trim();
  if (!url) return;

  let label = 'LINK';

  try {
    const parsedUrl = new URL(url, window.location.origin);
    let path = parsedUrl.pathname;

    // remove trailing slash
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    // get last segment
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments.length ? segments[segments.length - 1] : '';

    if (!lastSegment) {
      label = 'HOME';
    } else {
      label = lastSegment
        .replace(/[-_]/g, ' ')
        .toUpperCase();
    }
  } catch (e) {
    label = 'LINK';
  }

  block.innerHTML = `
    <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-icon">
      <span class="icon">${label}</span>
    </a>
  `;
}