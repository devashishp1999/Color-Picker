/**
 * @function Converts rgb-code to hex-c0de
 * @param {String} rgb format : rgb(r, g, b)
 * @returns #rgb HEX-Code
 */
export function rgbToHex(rgb) {
  if (rgb.startsWith("#")) return rgb;

  const intToHex = (clr, hex = Number(clr).toString(16)) =>
    hex.length < 2 ? "0" + hex : hex;

  let [r, g, b] = rgb.slice(4, -1).split(",");

  r = intToHex(r);
  g = intToHex(g);
  b = intToHex(b);

  return "#" + r + g + b;
}

/*
 *-----Parameters-----
 *text  - STRING  : Text to display.
 *posi - Number  : ~Position of toast. OPTIONS availabel:-
 *       1-----2-----3
 *       |     |     |
 *       8-----0-----4
 *       |     |     |
 *       7-----6-----5
 * time : dispaly for n seconds.
 */

export const showToast = ({
  text = "Lorem Ipsum Text",
  posi = 3,
  time = 4,
  fontSize = "1.1rem",
  backgroundColor = "#353a40",
  borderRadius = "4px",
  color = "#fefefe",
  fontWeight = "600",
  padding = "1.4vh 3vh",
  fontFamily = "Arial",
}) => {
  // Remove Previous Toast
  if ($(".toast-custom")) $(".toast-custom").remove();
  if ($(".toast-custom-css")) $(".toast-custom-css").remove();

  // Toast-DIV
  const toast = document.createElement("div");
  toast.className = "toast-custom";
  toast.innerHTML = `<p class="toast-custom-str">${text}</p>`;

  // Toast-CSS
  const toastStyle = document.createElement("style");
  toastStyle.className = "toast-custom-css";

  toastStyle.innerHTML = `.toast-custom {
        box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 
            0 4px 8px 3px rgb(60 64 67 / 15%);
        font-size: ${fontSize};
        background-color: ${backgroundColor};
        border-radius: ${borderRadius};
        color: ${color};
        font-weight: ${fontWeight};
        padding: ${padding};
        font-family:${fontFamily};
        user-select: none;
        box-sizing: border-box;
        z-index: 999;

        position: fixed;
        ${toastPosition(posi)}
        opacity: 1;
        animation: toastin 0.2s ease-in;
     }

     p.toast-custom-str {
            margin:unset;
            pointer-events: none !important;
     }

     @keyframes toastin {
        ${
          posi
            ? `0% { ${toastInSide(posi)}: 1vw; opacity: 0; }
               100% { ${toastInSide(posi)}: 2vw; opacity: 1; }`
            : `0% {  transform: translate(-50%, -50%) scale(0) ; opacity: 0; }
               100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }`
        }
        
     }`;

  // Add To DOM
  $("head").appendChild(toastStyle);
  $("body").appendChild(toast);

  // Remove From DOM
  setTimeout(removeToast, time * 1000);
  toast.onclick = () => removeToast();

  // Dependency Methods
  function $(el) {
    return document.querySelector(el);
  }
  function toastPosition(n) {
    switch (n) {
      case 0:
        return `left: 50%; top: 50%; transform: translate(-50%, -50%);`;
      case 1:
        return `left: 2vw; top: 2vw;`;
      case 3:
        return `right: 2vw; top: 2vw;`;
      case 4:
        return `right: 2vw; top: 50%; transform: translateY(-50%)`;
      case 5:
        return `right: 2vw; bottom: 2vw;`;
      case 6:
        return `left: 50%; bottom: 2vw; transform: translateX(-50%);`;
      case 7:
        return `left: 2vw; bottom: 2vw;`;
      case 8:
        return `left: 2vw; top: 50%; transform: translateY(-50%)`;
      case 2:
      default:
        return `left: 50%; top: 2vw; transform: translateX(-50%);`;
    }
  }
  function toastInSide(n) {
    switch (n) {
      case 1:
      case 7:
      case 8:
        return "left";
      case 3:
      case 4:
      case 5:
        return "right";
      case 6:
        return "bottom";
      case 2:
      default:
        return "top";
    }
  }
  function removeToast() {
    toast.remove();
    toastStyle.remove();
  }
};
