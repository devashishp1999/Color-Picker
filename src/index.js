import { rgbToHex, showToast } from "./method.js";

const pickBtn = document.querySelector("#clrpick");
const colorBox = document.querySelector(".result-color");
const colorText = document.querySelector(".result-text > span");
const copyBtn = document.querySelector("#copy-to-clipboard");

var colorPicked = "#ffffff";

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(colorText.innerText);
  showToast({
    text: "Copied to clipboard",
    backgroundColor: colorPicked,
    color: `${colorPicked.includes("f") ? "#000000" : "#ffffff"}`,
    fontSize: "1rem",
    fontWeight: "300",
  });
});
pickBtn.addEventListener("click", () => {
  if (!window.EyeDropper) {
    alert("Your browser does not support this tool");
    showToast();
    return;
  }

  const eyeDropper = new EyeDropper();
  const abortController = new AbortController();

  eyeDropper
    .open({ signal: abortController.signal })
    .then((result) => {
      let color = result.sRGBHex;

      color = color.slice(color[0], color.lastIndexOf(",")).replace("a", "");
      color += ")";
      color = rgbToHex(color);

      colorBox.style.backgroundColor = color;
      colorPicked = color;
      colorText.innerText = color;
    })
    .catch((err) => console.log(err));
});

// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/eyedropper-pwa/sw.js");
    }

let installPrompt;
const installBtn = document.querySelector("#install-pwa");
installBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // stop automatic showing prompt

  console.log("before-install run");

  installPrompt = e;
  installBtn.style.display = "block";

  installBtn.addEventListener("click", () => {
    try {
      installPrompt.prompt();
    } catch {}

    installBtn.style.display = "none";

    installPrompt.userChoice.then((res) => {
      if (res.outcome === "accepted") {
        console.log("User Accepted the A2HS prompt");
      } else {
        console.log("User Dismissed the A2HS prompt");
      }
      installPrompt = null;
    });
  });
});

// window size
document.addEventListener("DOMContentLoaded", (e) => {
  const isBrowser = matchMedia("(display-mode: browser)").matches;
  if (!isBrowser) {
    window.moveTo(
      window.screen.width - window.outerWidth,
      window.screen.height / 2 - window.outerHeight / 2
    );
    window.resizeTo(500, 600);
  }
});
