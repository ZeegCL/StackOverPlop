'use strict'

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems, {
    edge: 'left',
    draggable: true
  });
});
