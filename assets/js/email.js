  document.querySelector("#contact-form form").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_lvn9l9q", "YOUR_TEMPLATE_ID", this)
      .then(() => {
        alert("✅ Message sent!");
      }, (err) => {
        console.error("❌ Failed:", err);
        alert("Failed to send. Try again later.");
      });
  });

