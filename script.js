document.addEventListener("DOMContentLoaded", function() {
  const loadingText = document.getElementById("loading-text");
  const loadingScreen = document.getElementById("loading-screen");
  const accessScreen = document.getElementById("access-screen");
  const mainContent = document.getElementById("main-content");
  const navButtons = document.querySelectorAll(".nav-button");

  // --- LOADING ANIMATION (with fixed-width dots) ---
  let dots = 1;
  const baseText = "Loading";
  const maxDots = 3;
  
  loadingText.style.display = "inline-block";
  loadingText.style.textAlign = "center";
  loadingText.innerHTML = `${baseText}<span id='dots'>.</span>`;
  
  const dotsSpan = document.getElementById("dots");
  dotsSpan.style.display = "inline-block";
  dotsSpan.style.minWidth = "3ch";
  dotsSpan.style.textAlign = "left";
  
  setInterval(() => {
    dots = (dots % maxDots) + 1;
    dotsSpan.textContent = ".".repeat(dots) + " ".repeat(maxDots - dots);
  }, 500);

  // --- SIMULATED LOADING SEQUENCE ---
  setTimeout(() => {
    loadingScreen.style.display = "none";
    accessScreen.style.display = "flex";

    setTimeout(() => {
      accessScreen.style.display = "none";
      mainContent.style.display = "block";
      mainContent.style.opacity = "1";
    
      // Show default page ("About Me")
      document.getElementById("about").classList.add("active");
      document.querySelector('.nav-button[data-page="about"]').classList.add("active");

      // Re-enable scrolling after loading finishes
      document.body.style.overflow = "auto";
    }, 2000);
  }, 4000);

  // --- NAVIGATION LOGIC ---
  navButtons.forEach(button => {
    button.addEventListener("click", function() {
      const targetPage = this.getAttribute("data-page");
      const activeContent = document.querySelector(".text-content.active");
      const newContent = document.getElementById(targetPage);

      // Update nav button active state
      navButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      if (activeContent !== newContent) {
        activeContent.classList.remove("active");
        activeContent.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
        activeContent.style.transform = "translateX(100%)";
        activeContent.style.opacity = "0";

        setTimeout(() => {
          activeContent.style.display = "none";
          newContent.style.display = "block";
          newContent.style.opacity = "0";
          newContent.style.transform = "translateX(100%)";

          setTimeout(() => {
            newContent.classList.add("active");
            newContent.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
            newContent.style.transform = "translateX(0)";
            newContent.style.opacity = "1";
          }, 50);
        }, 500);
      }
    });
  });
});
<script>
  const form = document.querySelector('.contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formJSON = JSON.stringify(plainFormData);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: formJSON
      });

      if (response.ok) {
        status.textContent = 'Form Sent!';
        form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          status.textContent = data.errors.map(e => e.message).join(', ');
        } else {
          status.textContent = 'Oops! Something went wrong.';
        }
      }
    } catch (error) {
      status.textContent = 'Oops! Network error or Formspree issue.';
    }
  });
</script>
