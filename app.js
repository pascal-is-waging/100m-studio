let states = ["ss01", "aalt", "ss02", "ss03", "ss04", "none"];
const header = $(".titleocad");
addEventListener("mousemove", (event) => {});
header.mousemove(function () {
  if (Math.random() > 0.8) {
    const temp = document.querySelectorAll(".change");
    temp.forEach((element) => {
      // console.log(element);
      let ran = parseInt(Math.random() * states.length);
      element.setAttribute("style", `font-feature-settings:"${states[ran]}"`);
      if (Math.random() > 0.8) {
        if (checkCase(element.innerHTML)) {
          console.log("here");
          element.innerHTML = element.innerHTML.toLowerCase();
        } else {
          element.innerHTML = element.innerHTML.toUpperCase();
        }
      }
    });
  } else {
  }
});
// $(".header").draggable();
function checkCase(letter) {
  let le = letter.toUpperCase();
  if (letter == le) {
    return true;
  } else {
    return false;
  }
}
