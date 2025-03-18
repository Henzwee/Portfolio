document.addEventListener("DOMContentLoaded", function() {
  const loadingText = document.getElementById("loading-text");
  const loadingScreen = document.getElementById("loading-screen");
  const accessScreen = document.getElementById("access-screen");
  const mainContent = document.getElementById("main-content");
  const navButtons = document.querySelectorAll(".nav-button");
  const textContents = document.querySelectorAll(".text-content");

  // Loading animation (dots cycling)
  let dots = 1;
  const baseText = "Loading";
  const maxDots = 3;
  loadingText.innerHTML = `${baseText}<span id='dots'>.</span>`;
  const dotsSpan = document.getElementById("dots");

  setInterval(() => {
    dots = (dots % maxDots) + 1;
    dotsSpan.textContent = ".".repeat(dots);
  }, 500);

  // Simulate loading time
  setTimeout(() => {
    loadingScreen.style.display = "none";
    accessScreen.style.display = "flex";

    setTimeout(() => {
      accessScreen.style.display = "none";
      mainContent.style.display = "block";
      mainContent.style.opacity = "1";
      document.getElementById("about").classList.add("active");
    }, 2000);
  }, 4000);

  // Navigation button click event
  navButtons.forEach(button => {
    button.addEventListener("click", function() {
      const targetPage = this.getAttribute("data-page");
      const activeContent = document.querySelector(".text-content.active");
      const newContent = document.getElementById(targetPage);

      if (activeContent !== newContent) {
        // Hide any update text in the active content
        const activeUpdate = activeContent.querySelector(".update-text");
        if (activeUpdate) {
          activeUpdate.style.opacity = "0";
        }

        // Animate out the active content
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

            // Delay the appearance of the update text for work and experience pages
            const updateText = newContent.querySelector(".update-text");
            if (updateText) {
              setTimeout(() => {
                updateText.style.transition = "opacity 1s ease-in-out";
                updateText.style.opacity = "1";
              }, 1000); // 1-second delay
            }
          }, 50);
        }, 500);
      }
    });
  });
});
