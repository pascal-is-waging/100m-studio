let states = ["ss01", "aalt", "ss02", "ss03", "ss04", "none"];
const header = $(".header");

// changing typeface animation for the design guild
// change the css tag randomly based on the states array:
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
// check if the letter is uppercase or not
function checkCase(letter) {
  let le = letter.toUpperCase();
  if (letter == le) {
    return true;
  } else {
    return false;
  }
}

// $(".header").draggable();
// function fixdivsize() {
//   const divleft = $(".container-left");
// }
// const divleft = $(".container-left");
// divleft.css("width", `${header.width() + header.width() / 5}px`);
