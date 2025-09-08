document.addEventListener("DOMContentLoaded", function() {
  const roles = ["Software Engineer", "UX Designer", "Creative Technologist"];
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

  type();
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
      document.querySelector(".inner").classList.toggle("dark-mode");

      const isDarkMode = document.body.classList.contains('dark-mode');

      // Save to localStorage
      localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

      // Change icon
      themeIcon.src = isDarkMode ? 'assets/images/moon.png' : 'assets/images/sun_logo.png';
    });

    // Load the saved theme from localStorage
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      document.body.classList.add('dark-mode');
      document.querySelector(".inner").classList.add("dark-mode");
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
