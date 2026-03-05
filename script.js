document.addEventListener('DOMContentLoaded', () => {
  const ghost = document.getElementById('ghostCursor');
  let mouseX = 0;
  let mouseY = 0;
  let ghostX = 0;
  let ghostY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Lerp (Linear Interpolation) for smooth following
    // ghostX += (mouseX - ghostX) * 0.1;
    // ghostY += (mouseY - ghostY) * 0.1;
    
    // Or just simple delay
    const speed = 0.05;
    const dx = mouseX - ghostX;
    const dy = mouseY - ghostY;
    
    ghostX += dx * speed;
    ghostY += dy * speed;

    if (ghost) {
      ghost.style.left = (ghostX - 20) + 'px'; // Center the ghost
      ghost.style.top = (ghostY - 20) + 'px';
    }

    requestAnimationFrame(animate);
  }

  animate();
});
