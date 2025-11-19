
document.addEventListener("DOMContentLoaded", function() {

  // if (confirm("Site is currently under maintenance. Do you want to go to GitHub?")) {
  //   window.location.href = "https://github.com/jflores45";
  // } else {
  //     // Do nothing, user stays on the page
  // }

  const roles = ["Software Engineer", "UI/UX Designer", "Creative Technologist"];
  // const roles = ["Front-end Developer", "Creative Technologist", "3D Designer"];
  let i = 0, j = 0, current = "", isDeleting = false;
  const speed = 100;

  function type() {
    current = roles[i];
    const el = document.getElementById("terminal");
    el.textContent = current.substring(0, j);

    if (!isDeleting && j < current.length) {
      j++;
      setTimeout(type, speed);
    } else if (isDeleting && j > 0) {
      j--;
      setTimeout(type, speed / 2);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, 1500);
      } else {
        isDeleting = false;
        i = (i + 1) % roles.length;
        setTimeout(type, speed);
      }
    }
  }

// function pronounceName() {
//   const speakerIcon = document.querySelector('.name-pronunce img');
//   const heading = document.querySelector('.name-pronunce h1');

//   speakerIcon.addEventListener('click', function() {
//     // Hide the heading instead of removing
//     heading.style.display = 'none';

//     // Create video wrapper
//     const videoWrapper = document.createElement('div');
//     videoWrapper.classList.add('video-wrapper');

//     const video = document.createElement('video');
//     video.src = 'assets/video/pronunciation.mp4';
//     video.autoplay = true;
//     video.muted = true;
//     video.loop = false;

//     videoWrapper.appendChild(video);

//     // Insert the video wrapper below heading (or wherever you want)
//     heading.parentNode.insertBefore(videoWrapper, speakerIcon);

//     // When video ends, remove video and show heading again
//     video.addEventListener('ended', function() {
//       videoWrapper.remove();
//       heading.style.display = ''; // restore original display
//     });
//   });
// }
  function pronounceName() {
    const Canvas = document.getElementById('canvas');
    const ctx = Canvas.getContext('2d');
    const speakerIcon = document.querySelector('.name-pronunce img');
    const heading = document.querySelector('.name-pronunce h1');
    
    const audio = new Audio('assets/audio/name-pronounced.mp4');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 4096;
    
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    audio.crossOrigin = "anonymous";
   
    function animate() {
      requestAnimationFrame(animate);

      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, Canvas.width, Canvas.height);

      const barCount = 120;        // number of bars (not scrunched)
      const barWidth = 2;         // thin bars
      const barGap = 4;           // spacing between bars
      const step = Math.floor(dataArray.length / barCount);
      let x = 0;

      for (let i = 0; i < barCount; i++) {
        const barHeight = dataArray[i * step] * 0.8;

        ctx.fillStyle = '#fcfcfcff';

        // Draw upward bar
        ctx.fillRect(x, Canvas.height / 2 - barHeight, barWidth, barHeight);

        // Draw downward bar (mirror)
        ctx.fillRect(x, Canvas.height / 2, barWidth, barHeight);

        x += barWidth + barGap;
      }
    }
  

    speakerIcon.addEventListener('click', function() {
      audioCtx.resume().then(() => {
            heading.style.display = 'none';
            Canvas.style.display = 'block';
            audio.play();
            animate();
        });

      audio.addEventListener('ended', () => {
          Canvas.style.display = 'none';
          heading.style.display = 'block';
        }, { once: true }); // run only once
    });

  }
 
 function learnMore() { 

  const open = new Audio('assets/audio/overlay-open.mp3');
  const close = new Audio('assets/audio/overlay-close.mp3');

  document.querySelector('#about-me button').addEventListener('click', function() {
    const overlay = document.createElement('div');
    overlay.id = 'pageOverlay';
    overlay.classList.add('Mask-Center-Out');
 
    overlay.innerHTML = `
      <div class="overlay-content">
        <span class="close-btn">&times;</span>
        <h2>Coming soon!</h2>   
        <p>Currently in development. Please check back later!</p>
      </div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => {
        open.currentTime = 0;
        open.play();
    }, 500);
   

    // Close button
    overlay.querySelector('.close-btn').addEventListener('click', function() {
      overlay.classList.remove('Mask-Center-Out');
      overlay.classList.add('Mask-Center-In');
      close.currentTime = 0;
      close.play();

      // Wait for animation to finish before removing element
      overlay.addEventListener('animationend', () => {
        overlay.remove();
      }, { once: true });
    });
  });
}


function playKeyboardSound() {
    const audio = new Audio('assets/audio/soft-keyboard.mp3');
    const items = document.querySelectorAll('.creamy-sound');

    const audio2 = new Audio('assets/audio/creamy-keyboard.mp3');
    const items2 = document.querySelectorAll('.creamy-button');

    const audio3 = new Audio('assets/audio/creamy-keyboard-button.mp3');
    items3 = document.querySelectorAll('.thocky-button');

    const audio4 = new Audio('assets/audio/enter-sound.mp3');
    const items4 = document.querySelectorAll('.enter-sound');
   
    
    items.forEach(element => {
      element.addEventListener('mouseenter', () => {
        audio.currentTime = 0;
        audio.play();
      });
    });
    items2.forEach(element => {
      element.addEventListener('click', () => {
        audio2.currentTime = 0;
        audio2.play();
      });
    });

    items3.forEach(element => {
      element.addEventListener('mouseenter', () => {
        audio3.currentTime = 0;
        audio3.play();
      });
    });
    items4.forEach(element => {
      element.addEventListener('click', () => {
        audio4.currentTime = 0;
        audio4.play();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === "Enter") {
        audio4.currentTime = 0;
        audio4.play();
      }
      else if (e.key === "Space") {
        audio3.currentTime = 0;
        audio3.play();
      } 
      else {
        audio2.currentTime = 0;
        audio2.play();
      }
    });



}


  playKeyboardSound();
  learnMore();
  type();
  pronounceName();

});


function applySpinnerColors(isDark) {
  const stops = document.querySelectorAll('#circleGradient stop');
  if (stops.length >= 2) {
    stops[0].setAttribute('stop-color', isDark ? '#FF66AA' : '#FFFFFF');
    stops[1].setAttribute('stop-color', isDark ? '#FFFFFF' : '#B0A6DC');
  }
}
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('mode');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      document.querySelector(".glass").classList.toggle("dark-mode");

      const isDarkMode = document.body.classList.contains('dark-mode');

      // Save to localStorage
      localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

      // Change icon
      themeIcon.src = isDarkMode ? 'assets/images/moon_logo.png' : 'assets/images/sun_logo.png';
    });

    // Load the saved theme from localStorage
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      document.body.classList.add('dark-mode');
      document.querySelector(".glass").classList.add("dark-mode");
      themeIcon.src = 'assets/images/moon_logo.png';
    } else {
      themeIcon.src = 'assets/images/sun_logo.png';
    }
    applySpinnerColors(darkMode);
  }
});

document.querySelector("#contact-form form").addEventListener("submit", function(e) {
  e.preventDefault();
  const statusMessage = document.createElement("p");
  statusMessage.style.marginTop = "10px";
  
  emailjs.sendForm("service_lvn9l9q", "template_qkqmj79", this)
    .then(() => {
      statusMessage.textContent = "✅ Thank you! Your message has been sent. I’ll get back to you soon.";
      statusMessage.style.color = "green";
      this.appendChild(statusMessage);
      this.reset();
    })
    .catch((err) => {
      console.error("❌ Failed:", err);
      statusMessage.textContent = "❌ Failed to send. Please try again later.";
      statusMessage.style.color = "red";
      this.appendChild(statusMessage);
    });
});



 