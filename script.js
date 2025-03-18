document.addEventListener("DOMContentLoaded", function() {
  const loadingText = document.getElementById("loading-text");
  const loadingScreen = document.getElementById("loading-screen");
  const accessScreen = document.getElementById("access-screen");
  const mainContent = document.getElementById("main-content");
  const navButtons = document.querySelectorAll(".nav-button");
  const updateDate = document.getElementById("update-date");

  // --- LOADING ANIMATION WITH FIXED-WIDTH DOTS ---
  let dots = 1;
  const baseText = "Loading";
  const maxDots = 3;
  
  // Style the loading text so it doesn't shift
  loadingText.style.display = "inline-block";
  loadingText.style.textAlign = "center";
  loadingText.innerHTML = `${baseText}<span id='dots'>.</span>`;
  
  const dotsSpan = document.getElementById("dots");
  dotsSpan.style.display = "inline-block";
  dotsSpan.style.minWidth = "3ch"; // Fixed width for dots
  dotsSpan.style.textAlign = "left";
  
  // Cycle dots (1 to 3) while preserving fixed width
  setInterval(() => {
    dots = (dots % maxDots) + 1;
    dotsSpan.textContent = ".".repeat(dots) + " ".repeat(maxDots - dots);
  }, 500);

  // --- SIMULATED LOADING SEQUENCE ---
  setTimeout(() => {
    // Hide loading screen and show "Access Granted"
    loadingScreen.style.display = "none";
    accessScreen.style.display = "flex";

    setTimeout(() => {
      // Hide "Access Granted" and display main content
      accessScreen.style.display = "none";
      mainContent.style.display = "block";
      mainContent.style.opacity = "1";

      // Default to "About Me"
      document.getElementById("about").classList.add("active");

      // Hide update date initially (only appears on Work/Experience)
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
        // Animate out current content
        activeContent.classList.remove("active");
        activeContent.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
        activeContent.style.transform = "translateX(100%)";
        activeContent.style.opacity = "0";

        setTimeout(() => {
          // Hide old content
          activeContent.style.display = "none";

          // Show and animate in new content
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

      // Show update date only on Work or Experience pages
      if (targetPage === "work" || targetPage === "experience") {
        setTimeout(() => {
          updateDate.style.display = "block";
        }, 500);
      } else {
        updateDate.style.display = "none";
      }
    });
  });
});
