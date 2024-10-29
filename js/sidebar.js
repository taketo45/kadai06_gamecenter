

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.game-link');
  const iframes = document.querySelectorAll('#gameerea iframe');

  // 初期状態で最初のiframeを表示
  iframes[0].classList.add('active');
  links.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);

          iframes.forEach((iframe,id) => {
              if (iframe.id === targetId) {
                  iframe.classList.add('active');
              } else {
                  iframe.classList.remove('active');
              }
          });
      });
  });
});