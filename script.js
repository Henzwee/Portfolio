document.addEventListener("DOMContentLoaded", function() {
  const loadingText = document.getElementById("loading-text");
  const loadingScreen = document.getElementById("loading-screen");
  const accessScreen = document.getElementById("access-screen");
  const mainContent = document.getElementById("main-content");
  const navButtons = document.querySelectorAll(".nav-button");
  const updateDate = document.getElementById("update-date");

  // --- LOADING ANIMATION (with fixed-width dots) ---
  let dots = 1;
  const baseText = "Loading";
  const maxDots = 3;
  
  // Keep the word "Loading" from shifting
  loadingText.style.display = "inline-block";
  loadingText.style.textAlign = "center";
  loadingText.innerHTML = `${baseText}<span id='dots'>.</span>`;
  
  const dotsSpan = document.getElementById("dots");
  dotsSpan.style.display = "inline-block";
  dotsSpan.style.minWidth = "3ch"; // fixed width for dots
  dotsSpan.style.textAlign = "left";
  
  // Cycle dots from 1 to 3
  setInterval(() => {
    dots = (dots % maxDots) + 1;
    dotsSpan.textContent = ".".repeat(dots) + " ".repeat(maxDots - dots);
  }, 500);

  // --- SIMULATED LOADING SEQUENCE ---
  setTimeout(() => {
    // Hide loading screen, show "Access Granted"
    loadingScreen.style.display = "none";
    accessScreen.style.display = "flex";

    setTimeout(() => {
      // Hide "Access Granted", show main content
      accessScreen.style.display = "none";
      mainContent.style.display = "block";
      mainContent.style.opacity = "1";

      // Default to "About Me"
      document.getElementById("about").classList.add("active");

      // Hide the update date by default
      updateDate.style.display = "none";
    }, 2000);
  }, 4000);

  // --- NAVIGATION LOGIC ---
  navButtons.forEach(button => {
    button.addEventListener("click", function() {
      const targetPage = this.getAttribute("data-page");
      const activeContent = document.querySelector(".text-content.active");
      const newContent = document.getElementById(targetPage);

      if (activeContent !== newContent) {
        // Animate out the current page
        activeContent.classList.remove("active");
        activeContent.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
        activeContent.style.transform = "translateX(100%)";
        activeContent.style.opacity = "0";

        setTimeout(() => {
          // Hide the old page
          activeContent.style.display = "none";

          // Show the new page
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

      // Show the update date only for Work or Experience
      if (targetPage === "work" || targetPage === "experience") {
        updateDate.style.display = "block";
      } else {
        updateDate.style.display = "none";
      }
    });
  });
});
