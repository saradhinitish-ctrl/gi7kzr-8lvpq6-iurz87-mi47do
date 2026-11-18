(() => {

  // Feature tour: the sticky phone shows the screen for the chapter in view.
  const shots = [...document.querySelectorAll('.phone.stage img')];
  const dots = [...document.querySelectorAll('.stage-dots li')];
  const chapters = [...document.querySelectorAll('.chapter')];
  const show = (ch) => {
    const i = chapters.indexOf(ch);
    chapters.forEach(c => c.classList.toggle('on', c === ch));
    shots.forEach(img => img.classList.toggle('on', img.dataset.shot === ch.dataset.shot));
    dots.forEach((d, j) => d.classList.toggle('on', j === i));
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) show(e.target); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    chapters.forEach(c => io.observe(c));
    const rv = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('seen'); rv.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.tour-head, .gallery h2, .scene-row, .details div, .dl-card, .steps').forEach(el => { el.classList.add('reveal'); rv.observe(el); });
  } else if (chapters[0]) show(chapters[0]);
  if (chapters[0]) show(chapters[0]);

  // Scene gallery: tap a scene to bring it forward.
  const scenes = [...document.querySelectorAll('.scene')];
  const pick = (s) => scenes.forEach(x => { const on = x === s; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
  scenes.forEach((s, i) => {
    s.addEventListener('click', () => pick(s));
    s.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { const n = scenes[(i + d + scenes.length) % scenes.length]; pick(n); n.focus(); e.preventDefault(); }
    });
  });
  const cur = scenes.find(s => s.classList.contains('on')); if (cur) pick(cur);
})();
