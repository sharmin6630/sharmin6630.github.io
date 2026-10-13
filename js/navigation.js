(function () {
  const tabs = Array.prototype.slice.call(document.querySelectorAll('.railnav button'));
  if (!tabs.length) return;
  function select(tab) {
    tabs.forEach(function (t) {
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      const on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (panel) panel.hidden = !on;
    });
    const panels = document.querySelector('.content-panels');
    if (panels) panels.scrollTo({ top: 0, behavior: 'auto' });
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const fwd = (e.key === 'ArrowDown' || e.key === 'ArrowRight');
      const next = tabs[(tabs.indexOf(t) + (fwd ? 1 : tabs.length - 1)) % tabs.length];
      next.focus(); select(next);
    });
  });
})();
