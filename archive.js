/*
 * Hello world, this script will take an are.na channel
 * and then load it's contents into a grid of images.
 *
 */

let slug = "work-kegrsmfb7le";
let slug2 = "we-re-working";

async function main() {
  let channel = await fetch(
    "https://api.are.na/v2/channels/" + slug + "/contents?per=100"
  );

  let data = await channel.json();
  let contents = data.contents;

  //shuffle the contents
  contents = contents.sort(() => Math.random() - 0.5);

  let daddy = document.getElementById("daddy");

  contents.forEach((item) => {
    if (item.class == "Image") {
      let block = document.createElement("div");
      let b_css = "margin: 1%;";
      // width: 60%; height: 30%;
      let img = document.createElement("img");
      let css = "width: 100%;";
      img.setAttribute("style", css);
      img.classList.add("block-img");
      img.src = item.image.display.url;

      block.setAttribute("style", b_css);
      block.appendChild(img);
      block.classList.add("header-right");
      block.classList.add("alter2");
      daddy.appendChild(block);
    }
  });
}
async function working() {
  let channel = await fetch(
    "https://api.are.na/v2/channels/" + slug2 + "/contents?per=100"
  );

  let data = await channel.json();
  let contents = data.contents;

  //shuffle the contents
  contents = contents.sort(() => Math.random() - 0.5);

  let daddy = document.querySelector(".header-right-alter-gallery");
  let temp = document.createElement("div");
  temp.classList.add("working-img");
  // console.log(daddy);
  contents.forEach((item) => {
    if (item.class == "Image") {
      /*
       * Daddy is the main container
       *
       * daddy has --
       *            |
       *          A block _ inside
       *                          | -> has an image inside
       *
       */
      let block = document.createElement("img");
      // console.log(item.image);
      block.classList.add("block-img-working");
      block.src = item.image.display.url;
      temp.appendChild(block);
    }
  });
  daddy.appendChild(temp);
}

// main();
working();
