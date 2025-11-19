function pronounceName() {
    const Canvas = document.getElementById('canvas');
    const ctx = Canvas.getContext('2d');
    const speakerIcon = document.querySelector('.name-pronunce img');
    const heading = document.querySelector('.name-pronunce h1');
    
    const audio = new Audio('assets/audio/pronunciation.mp3');
    audio.crossOrigin = "anonymous";

    Canvas.width = 300;
    Canvas.height = 100;

    function animate() {
        ctx.clearRect(0, 0, Canvas.width, Canvas.height);
        const time = Date.now() * 0.002;
        const baseline = 50;
        const amplitude = 20;
        const frequency = 0.02;
        ctx.beginPath();
        
        for(let x = 0; x < Canvas.width; x++){
          let y = baseline + Math.sin(time + x * frequency) * amplitude;
          
          if (x === 0) {
              ctx.moveTo(x, y); 
            } 
          else {
              ctx.lineTo(x, y); 
          }
        }
        
        ctx.strokeStyle = '#ffffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        requestAnimationFrame(animate);
    }

    speakerIcon.addEventListener('click', function() {
      heading.style.display = 'none';
      Canvas.style.display = 'block';  
      audio.play();
      animate();
    });

  }

  type();
  pronounceName();
});