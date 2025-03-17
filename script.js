document.addEventListener("DOMContentLoaded", function() {
    const loadingText = document.getElementById("loading-text");
    const loadingScreen = document.getElementById("loading-screen");
    const accessScreen = document.getElementById("access-screen");
    const mainContent = document.getElementById("main-content");
    const navButtons = document.querySelectorAll(".nav-button");
    const textContents = document.querySelectorAll(".text-content");
    const buttonsContainer = document.querySelector(".buttons");
    const footer = document.querySelector("footer");

    // Loading animation (dots cycling) without shifting, always at least 1 dot
    let dots = 1;
    const baseText = "Loading";
    const maxDots = 3; // Maximum dots count
    
    loadingText.style.display = "inline-block";
    loadingText.style.textAlign = "center";
    loadingText.innerHTML = `${baseText}<span id='dots'>.</span>`;
    const dotsSpan = document.getElementById("dots");
    dotsSpan.style.display = "inline-block";
    dotsSpan.style.minWidth = "3ch"; // Ensures fixed width for dots
    dotsSpan.style.textAlign = "left"; // Align dots to the left

    setInterval(() => {
        dots = (dots % maxDots) + 1; // Cycle between 1 and maxDots
        dotsSpan.textContent = "".padEnd(dots, ".") + "".padEnd(maxDots - dots, " ");
    }, 500);

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.display = "none";
        accessScreen.style.display = "flex";

        // After 2 seconds, show main content
        setTimeout(() => {
            accessScreen.style.display = "none";
            mainContent.style.display = "block";
            mainContent.style.opacity = "1";
            document.getElementById("about").classList.add("active"); // Show default content
            footer.style.display = "none"; // Hide footer on initial load
        }, 2000);
    }, 4000);

    // Navigation button click event
    navButtons.forEach(button => {
        button.addEventListener("click", function() {
            const targetPage = this.getAttribute("data-page");
            const activeContent = document.querySelector(".text-content.active");
            const newContent = document.getElementById(targetPage);

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

            // Show footer only on 'work' page
            if (targetPage === "work") {
                footer.style.display = "block";
            } else {
                footer.style.display = "none";
            }
        });
    });
});
