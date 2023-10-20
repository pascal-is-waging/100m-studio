/*
 * Hello world, this script will take an are.na channel
 * and then load it's contents into a grid of images.
 *
 */

let slug = "100m-posters";

async function main() {
  let channel = await fetch(
    "https://api.are.na/v2/channels/" + slug + "/contents?per=100",
  );

  let data = await channel.json();
  let contents = data.contents;

  //shuffle the contents
  contents = contents.sort(() => Math.random() - 0.5);

  let daddy = document.getElementById("daddy");

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
      let block = document.createElement("div");
      let b_css = "width: 30%; height: 30%; margin: 1%;";

      let img = document.createElement("img");
      let css = "width: 100%;";
      img.setAttribute("style", css);

      img.src = item.image.display.url;

      block.setAttribute("style", b_css);
      block.appendChild(img);

      daddy.appendChild(block);
    }
  });
}

main();
