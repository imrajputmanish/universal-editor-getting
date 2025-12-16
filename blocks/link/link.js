export default function decorate(block) {
  // 1️⃣ Read URL safely (fix UE vertical text issue)
  const url = block.textContent.replace(/\s+/g, '').trim();
  if (!url) return;

  // 2️⃣ Clear Universal Editor generated markup
  block.innerHTML = '';

  let label = 'Link';
  let iconSrc = '';

  // Helper → Title Case
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  try {
    const parsedUrl = new URL(url, window.location.origin);
    const path = parsedUrl.pathname;

    // 3️⃣ Social & mail icons
    if (url.includes('instagram.com')) {
      iconSrc = 'icons/instagram.svg';
      label = 'Instagram';
    } else if (url.includes('tiktok.com')) {
      iconSrc = 'icons/tiktok.svg';
      label = 'TikTok';
    } else if (url.includes('threads.net')) {
      iconSrc = 'icons/threads.svg';
      label = 'Threads';
    } else if (url.startsWith('mailto:')) {
      iconSrc = 'icons/mail.svg';
      label = 'Email';
    } 
    // 4️⃣ Normal internal / external page links
    else {
      if (path === '/' || path === '') {
        label = 'Home';
      } else {
        const segments = path.split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        label = toTitleCase(lastSegment.replace(/[-_]/g, ' '));
      }
    }
  } catch (e) {
    label = 'Link';
  }

  // 5️⃣ Create anchor
  const a = document.createElement('a');
  a.href = url;
  a.className = 'link-text';

  // External links → new tab
  if (!url.startsWith('/')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  // 6️⃣ Add icon if available
  if (iconSrc) {
    const img = document.createElement('img');
    img.src = iconSrc;
    img.alt = label;
    a.appendChild(img);
  }

  // 7️⃣ Add text label
  const span = document.createElement('span');
  span.textContent = label;
  a.appendChild(span);

  // 8️⃣ Append to block
  block.appendChild(a);
}
