export function createRaindrop() {
    const container = document.getElementById('animationContainer');
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = `${Math.random() * window.innerWidth}px`;
  
    container.appendChild(raindrop);
  
    // Remove the raindrop after animation ends to keep the DOM clean
    setTimeout(() => {
      raindrop.remove();
    }, 500); // Matches the animation duration
  }