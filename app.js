const menuButton = document.querySelector('.menu');
menuButton?.addEventListener('click', function () {
  const open = this.getAttribute('aria-expanded') !== 'true';
  this.setAttribute('aria-expanded', String(open));
  this.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.querySelector('nav')?.classList.toggle('open', open);
});

document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  document.querySelector('nav')?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const tourFinder = document.querySelector('#tourFinder');
const tourMatch = document.querySelector('#tourMatch');
const tourOptions = {
  highlights: {
    slug: '5-day-sri-lanka-highlights',
    title: '5-Day Sri Lanka Highlights',
    note: 'A compact introduction to culture, hill country, and the coast.'
  },
  adventure: {
    slug: '7-day-sri-lanka-adventure',
    title: '7-Day Sri Lanka Adventure',
    note: 'A balanced week of culture, wildlife, scenery, and beach time.'
  },
  ultimate: {
    slug: '10-day-ultimate-sri-lanka',
    title: '10-Day Ultimate Sri Lanka Experience',
    note: 'More time for ancient cities, nature, hill country, and the coast.'
  },
  beaches: {
    slug: '10-day-beaches-and-adventure',
    title: '10-Day Beaches & Adventure',
    note: 'The strongest match for surfing, outdoor adventure, and southern beaches.'
  },
  grand: {
    slug: '14-day-grand-sri-lanka',
    title: '14-Day Grand Sri Lanka Tour',
    note: 'The complete island journey with time to travel at a relaxed pace.'
  }
};

tourFinder?.querySelector('[name="duration"]')?.addEventListener('change', (event) => {
  event.currentTarget.setCustomValidity('');
});

tourFinder?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const duration = data.get('duration');
  const style = data.get('style');
  const durationField = event.currentTarget.querySelector('[name="duration"]');
  if (!duration) {
    durationField?.setCustomValidity('Please choose how long you would like to travel.');
    durationField?.reportValidity();
    return;
  }
  const key = duration === '14'
    ? 'grand'
    : duration === '10' && style === 'adventure'
      ? 'beaches'
      : duration === '10'
        ? 'ultimate'
        : duration === '7'
          ? 'adventure'
          : 'highlights';
  const match = tourOptions[key];
  if (!tourMatch) return;
  tourMatch.querySelector('strong').textContent = match.title;
  tourMatch.querySelector('p').textContent = match.note;
  tourMatch.querySelector('a').href = `/itineraries/${match.slug}/`;
  tourMatch.hidden = false;
  tourMatch.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

const formStatus = document.querySelector('#formStatus');
if (new URLSearchParams(window.location.search).get('sent') === '1' && formStatus) {
  formStatus.textContent = 'Thank you. Your trip enquiry has been sent to Mango Land Tours.';
  formStatus.classList.add('success');
}

if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-content > *', { y: 30, opacity: 0, duration: 1, stagger: 0.13, ease: 'power2.out' });
  gsap.from('.tour-finder', { x: 35, opacity: 0, duration: 1, delay: 0.25, ease: 'power2.out' });
  gsap.to('.hero-image', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  // Keep section content visible at all times. ScrollTrigger can miss its first
  // update when a visitor follows an in-page navigation link, so opacity-based
  // reveals can otherwise leave an entire section looking empty.
  gsap.utils.toArray('.section-head,.intro-copy,.island-collage,.destination-card,.culture-image,.culture-copy,.tour-card,.about-logo,.about-copy,.fleet-head,.guide-portrait,.guide > div:last-child,.reviews h2,.contact > div').forEach((element) => {
    gsap.from(element, { y: 24, duration: 0.72, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 91%', once: true } });
  });
}
