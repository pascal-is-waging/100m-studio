// isMobile by kaimallea https://github.com/kaimallea/isMobile
// Minified version of isMobile included in the HTML since it's small
(function () {
  var a = {};
  var f = /iPhone/i,
    h = /iPod/i,
    i = /iPad/i,
    r = /\biOS-universal(?:.+)Mac\b/i,
    g = /\bAndroid(?:.+)Mobile\b/i,
    j = /Android/i,
    c = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,
    d = /Silk/i,
    b = /Windows Phone/i,
    k = /\bWindows(?:.+)ARM\b/i,
    m = /BlackBerry/i,
    n = /BB10/i,
    o = /Opera Mini/i,
    p = /\b(CriOS|Chrome)(?:.+)Mobile/i,
    q = /Mobile(?:.+)Firefox\b/i;
  function s(l) {
    return function ($) {
      return $.test(l);
    };
  }
  function e(l) {
    var $ = (l =
      l || ("undefined" != typeof navigator ? navigator.userAgent : "")).split(
      "[FBAN"
    );
    void 0 !== $[1] && (l = $[0]),
      void 0 !== ($ = l.split("Twitter"))[1] && (l = $[0]);
    var a = s(l),
      e = {
        apple: {
          phone: a(f) && !a(b),
          ipod: a(h),
          tablet: !a(f) && a(i) && !a(b),
          universal: a(r),
          device: (a(f) || a(h) || a(i)) && !a(b),
        },
        amazon: { phone: a(c), tablet: !a(c) && a(d), device: a(c) || a(d) },
        android: {
          phone: (!a(b) && a(c)) || (!a(b) && a(g)),
          tablet: !a(b) && !a(c) && !a(g) && (a(d) || a(j)),
          device: (!a(b) && (a(c) || a(d) || a(g) || a(j))) || a(/\bokhttp\b/i),
        },
        windows: { phone: a(b), tablet: a(k), device: a(b) || a(k) },
        other: {
          blackberry: a(m),
          blackberry10: a(n),
          opera: a(o),
          firefox: a(q),
          chrome: a(p),
          device: a(m) || a(n) || a(o) || a(q) || a(p),
        },
        any: !1,
        phone: !1,
        tablet: !1,
      };
    return (
      (e.any =
        e.apple.universal ||
        e.apple.device ||
        e.android.device ||
        e.windows.device ||
        e.other.device),
      (e.phone = e.apple.phone || e.android.phone || e.windows.phone),
      (e.tablet = e.apple.tablet || e.android.tablet || e.windows.tablet),
      e
    );
  }
  a = e();
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = a;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return a;
    });
  } else {
    this["isMobile"] = a;
  }
})();
let states = ["ss01", "aalt", "ss02", "ss03", "ss04", "none"];
const header = $(".header");
const temppop = $(".popup");
//notice
let text = "Currently Updating the website";
const notice = $(".notice");
const not_container = $(".notice-container");
let letters = text.split("");
not_container.mousemove(() => {
  if (Math.random() > 0.9) {
    const temp = document.querySelectorAll(".notice");
    temp.forEach((element) => {
      // console.log(`${header.width()}`);
      let ran = parseInt(Math.random() * states.length);
      element.setAttribute("style", `font-feature-settings:"${states[ran]}"`);
      if (Math.random() > 0.8) {
        if (checkCase(element.innerHTML)) {
          element.innerHTML = element.innerHTML.toLowerCase();
        } else {
          element.innerHTML = element.innerHTML.toUpperCase();
        }
      }
    });
  } else {
  }
});
// changing typeface animation for the 100m studio

// change the css tag randomly based on the states array:
const rangeSlider = document.getElementById("myRange");
$("#myRange").on("input", function () {
  const currentValue = rangeSlider.value;
  localStorage.setItem("sliderValue", currentValue);
  //if the cursor is in the both randomly change the font-feature attribute
  if (Math.random() > 0.5) {
    const temp = document.querySelectorAll(".change");
    let ranstate = [];
    temp.forEach((element) => {
      // console.log(`${header.width()}`);
      let ran = parseInt(Math.random() * states.length);
      const changeblock = $(".block-title");
      // console.log(changeblock);
      ranstate.push(`${states[ran]}`);
      changeblock.css(
        "font-feature-settings",
        `"${ranstate[ranstate.length - 1]}"`
      );
      element.setAttribute(
        "style",
        `font-feature-settings:"${ranstate[ranstate.length - 1]}"`
      );

      if (Math.random() > 0.8) {
        if (checkCase(element.innerHTML)) {
          element.innerHTML = element.innerHTML.toLowerCase();
        } else {
          element.innerHTML = element.innerHTML.toUpperCase();
        }
      }
    });
    ranstate = JSON.stringify(ranstate);
    localStorage.setItem("header-state", ranstate);
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
//popup action for the images
$(".block-img").click((e) => {
  const temp2 = $(".popup-content");
  temppop.addClass("active");
  temp2.attr("src", e.target.getAttribute("src"));
});
$(".popup-content").click(() => {
  temppop.removeClass("active");
});
window.addEventListener("load", function () {
  // Retrieve the value from Local Storage
  const localSliderValue = localStorage.getItem("sliderValue");
  if (localSliderValue) {
    rangeSlider.value = localSliderValue;
  }
  let index = 0;
  let myarray = localStorage.getItem("header-state");
  myarray = JSON.parse(myarray);
  const temp = document.querySelectorAll(".change");
  console.log(myarray);
  temp.forEach((element) => {
    console.log("wje s");
    const changeblock = $(".block-title");
    changeblock.css("font-feature-settings", `"${myarray[index]}"`);
    element.setAttribute("style", `font-feature-settings:"${myarray[index]}"`);
    index++;
  });
});

if (isMobile.any) {
  // console.log("mobile");
  // console.log(header.width());
  const mainthing = $(".main");
  const needed = $(".navbar-container");
  mainthing.css("top", `${needed.outerHeight() + 30}px`);
}
// //if mobile change when scroll
// if (isMobile.any) {
//   $(document).on("scroll", function (e) {
//     e.preventDefault();
//     if (Math.random() > 0.8) {
//       const temp = document.querySelectorAll(".change");
//       temp.forEach((element) => {
//         // console.log(element);
//         // console.log(`${header.width()}`);
//         let ran = parseInt(Math.random() * states.length);
//         element.setAttribute("style", `font-feature-settings:"${states[ran]}"`);
//         if (Math.random() > 0.8) {
//           if (checkCase(element.innerHTML)) {
//             element.innerHTML = element.innerHTML.toLowerCase();
//           } else {
//             element.innerHTML = element.innerHTML.toUpperCase();
//           }
//           // const divleft = $(".container-left");
//           // divleft.css("width", `${header.width() + 30}px `);
//         }
//       });
//     } else {
//     }
//   });
// }
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

// // const sheet = new Sheets("1BBdx4ltlF4_FdP2KahXzP8d_DRp3KANYgfI-A04mUV4");
// const sheet = new Sheets("1t5KQxRLhwsDz6YugontnYx1FkmKMXRsIm7Ty4Zba6UU");
// //get data from the google sheet
// doWork(sheet);
