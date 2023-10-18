let states = ["ss01", "aalt", "ss02", "ss03", "ss04", "none"];
const header = $(".header");
// const sheet = new Sheets("1BBdx4ltlF4_FdP2KahXzP8d_DRp3KANYgfI-A04mUV4");
const sheet = new Sheets("1t5KQxRLhwsDz6YugontnYx1FkmKMXRsIm7Ty4Zba6UU");
//get data from the google sheet
doWork(sheet);
// changing typeface animation for the design guild
// change the css tag randomly based on the states array:
header.mousemove(function () {
  if (Math.random() > 0.8) {
    const temp = document.querySelectorAll(".change");
    temp.forEach((element) => {
      // console.log(element);
      console.log(`${header.width()}`);
      let ran = parseInt(Math.random() * states.length);
      element.setAttribute("style", `font-feature-settings:"${states[ran]}"`);
      if (Math.random() > 0.8) {
        if (checkCase(element.innerHTML)) {
          element.innerHTML = element.innerHTML.toLowerCase();
        } else {
          element.innerHTML = element.innerHTML.toUpperCase();
        }
        // const divleft = $(".container-left");
        // divleft.css("width", `${header.width() + 30}px `);
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
//function for reload btn
function reloadThePage() {
  window.location.reload(true);
}
async function doWork(s) {
  try {
    // location.reload(true);
    const res = await s.getMyData();
    // console.log(s);
    Rows = s.collapseKeys("Images");
    //add the last url to the background
    temp = givemethatlink(Rows);
    document.body.style.backgroundImage = `url("${temp}")`;
    document.body.style.backgroundColor = "var(--main-color)";
  } catch (err) {
    console.log(err);
  }
}
//check to ignore empty cells
function givemethatlink(r) {
  for (let i = 0; i < r.length; i++) {
    if (r[i + 1].Images == "" || r[i + 1].Images == undefined) {
      return r[i].Images;
    }
  }
}
//code I might use later:

// $(".header").draggable();
// function fixdivsize() {
//   const divleft = $(".container-left");
// }

//this thing is why I hate JS
// checkthing();

// function checkthing() {
//   const divleft = $(".container-left");
//   divleft.css("width", `${header.width() + 30}px `);
//   window.requestAnimationFrame(checkthing);
// }
