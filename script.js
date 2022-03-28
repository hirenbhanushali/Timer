// If anyone going through my code then it might look kind of messy to you coz I'm a beginner 😅, your suggestions, improvements(making the code shorter) will be welcomed 😇. Thank You!

// getting Display minutes and seconds elements
const disMinutes = document.querySelector(".minute");
const disSeconds = document.querySelector(".seconds");

// getting input minutes and seconds elements
const inpMinutes = document.getElementById("inp-minute");
const inpSeconds = document.getElementById("inp-seconds");

const circleSvg = document.querySelector("circle");

// getting all the buttons
const start = document.querySelector(".start");
const cancel = document.querySelector(".cancel");
const pauseResume = document.querySelector(".pause-resume");
const pauseResumeCancel = document.querySelector(".pause-resume-cancel");

// getting audio
const music = document.querySelector(".audio");

// Additional Variables
let resume;

disMinutes.innerHTML = "00";
disSeconds.innerHTML = "00";

// making the timer
let interval;
let totalTime;

function textCorrection(element, value) {
  element.innerHTML = value < 10 ? "0" + value : value;
}

// making the start button work
start.addEventListener("click", () => {
  totalTime = inpMinutes.value * 60 + inpSeconds.value * 1;

  circleSvg.style.animation = `Loop ${totalTime}s linear 1s`;
  circleSvg.style.animationPlayState = "running";

  if (inpMinutes.value != "" || inpSeconds.value != "") {
    start.classList.add("none");
    pauseResumeCancel.classList.remove("none");

    interval = setInterval(() => {
      const minutes = Math.floor(totalTime / 60);
      const seconds = totalTime % 60;

      if (totalTime <= 10) {
        circleSvg.style.stroke = "var(--clr-primary)";
        disMinutes.style.animation = "popup 800ms infinite ease-in-out";
        disMinutes.style.animationPlayState = "running";

        disSeconds.style.animation = "popup 800ms infinite ease-in-out";
        disSeconds.style.animationPlayState = "running";
      } else {
        circleSvg.style.stroke = "var(--clr-remaining)";
        disMinutes.style.animation = "none";
        disSeconds.style.animation = "none";
      }

      textCorrection(disMinutes, minutes);
      textCorrection(disSeconds, seconds);

      if (totalTime > 0) {
        totalTime--;
      } else {
        music.play();
        pauseResume.classList.add("none");
        circleSvg.style.animation = "none";
      }
    }, 1000);
  } else {
    disMinutes.innerHTML = "00";
    disSeconds.innerHTML = "00";
  }

  return totalTime;
});

// making the pause button work
pauseResume.addEventListener("click", () => {
  if (
    circleSvg.style.animationPlayState === "running" ||
    disMinutes.style.animationPlayState === "running" ||
    disSeconds.style.animationPlayState === "running"
  ) {
    circleSvg.style.animationPlayState = "paused";
    disMinutes.style.animationPlayState = "paused";
    disSeconds.style.animationPlayState = "paused";
  } else {
    circleSvg.style.animationPlayState = "running";
    disMinutes.style.animationPlayState = "running";
    disSeconds.style.animationPlayState = "running";
  }
  if (!resume) {
    pauseResume.innerHTML = "Resume";
    clearInterval(interval);
    resume = true;
    interval = false;
  } else {
    pauseResume.innerHTML = "Pause";
    if (!interval) {
      interval = setInterval(() => {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;

        textCorrection(disMinutes, minutes);
        textCorrection(disSeconds, seconds);

        if (totalTime > 0) {
          totalTime--;
        }
      }, 1000);
      resume = false;
    }
  }
});

// making the cancel button work
cancel.addEventListener("click", () => {
  clearInterval(interval);
  music.pause();
  music.currentTime = 0;

  disMinutes.innerHTML = "00";
  disSeconds.innerHTML = "00";
  disMinutes.style.animation = "none";
  disSeconds.style.animation = "none";
  circleSvg.style.animation = "none";
  inpMinutes.value = "";
  inpSeconds.value = "";
  start.classList.remove("none");
  pauseResume.classList.remove("none");
  pauseResumeCancel.classList.add("none");
});
