(function () {
  var figs= Array.prototype.slice.call(document.querySelectorAll('.photogrid figure img'));
  var box = document.getElementById('lightbox');
  if (!figs.length || !box) return;
  var big = box.querySelector('img'), count = box.querySelector('.count'), at = 0;
  function show(i) {
    at = (i + figs.length) % figs.length;
    big.src = figs[at].src; big.alt = figs[at].alt;
    count.textContent = (at + 1) + ' / ' + figs.length;
  }
  function open(i) { show(i); box.hidden = false; document.body.style.overflow = 'hidden'; }
  function close() { box.hidden = true; document.body.style.overflow = ''; }
  figs.forEach(function (im, i) { im.parentElement.addEventListener('click', function () { open(i); }); });
  box.addEventListener('click', function (e) {
    var a = e.target.getAttribute && e.target.getAttribute('data-lb');
    if (a === 'close') close();
    else if (a === 'prev') show(at - 1);
    else if (a === 'next') show(at + 1);
    else if (e.target === box) close();
  });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(at + 1);
    if (e.key === 'ArrowLeft') show(at - 1);
  });
})();
