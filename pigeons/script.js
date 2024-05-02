let main = document.querySelector(".slides-container");

// ----
// PRESENTER / CONTROLLER
// ----
// This is the Actor or the controller of the code
// It is responsible for keeping track of which slide is on
// What to do when we change slides
//
// Stuff like that
//
//       ,   ,
//     (  (    )
//   ( (     )   )
// , ( (         ) '
//  (    (   )  / )
//   ( ( \\       ) ,
//     ( |  // )
//       |   |
//       |   |
//       |   |
//       |   |
//   ``'-------------
//     ``'------
//       ``'-------
//       ``'-------
//         `'------
//       ``'------
//     ``'------
let presenter = (function() {
  let memory = {
    count: 0,
    blend: 0,
  };

  let deps = [];
  return {
    subscribe: function(dep) {
      deps.push(dep);
    },
    update: function() {
      deps.forEach((dep) => dep(memory));
      console.log(memory.blend);
      let b = memory.blend % 2 === 0 ? "multiply" : "difference";
      let image_box = document.querySelector(".image-box");
      image_box ? (image_box.style.mixBlendMode = b) : null;
      this.render();
    },
    value: function() {
      return memory.count;
    },
    slide: function() {
      return slides[memory.count];
    },
    next: function() {
      if (memory.count < slides.length - 1) {
        memory.count++;
        this.update();
      }
    },
    previous: function() {
      if (memory.count > 0) {
        memory.count--;
        this.update();
      }
    },
    render: function() {
      main.innerHTML = "";
      main.appendChild(slideElements[memory.count]);
    },

    keymanager: function(event) {
      if (event.key === "ArrowRight") {
        this.next();
      } else if (event.key === "ArrowLeft") {
        this.previous();
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        memory.blend += 1;
        this.update();
      }
    },
  };
})();

document.addEventListener("keydown", (event) => presenter.keymanager(event));
document.addEventListener("mousemove", (e) => mouse_update(e));

function mouse_update(e) {
  let image_box = document.querySelector(".image-box");
  let box_width = image_box.getBoundingClientRect().width;
  let box_height = image_box.getBoundingClientRect().height;

  let half_width = box_width / 2;
  let half_height = box_height / 2;

  image_box.style.transform = `rotateX(${(e.clientY - half_height) / 10
    }deg) rotateY(${(e.clientX - half_width) / 30}deg)
    translate(${e.clientX - half_width}px , ${e.clientY - half_height}px)
  `;
}

// ----
// CONTENT / DATASET
// ----
// Basically the content, this is the written content you see in the presentation
// If there are images, they are also here.
//           o\
//    _________/__\__________
//   |                  - (  |
//  ,'-.                 . `-|
// (____".       ,-.    '   ||
//   |          /\,-\   ,-.  |
//   |      ,-./     \ /'.-\ |
//   |     /-.,\      /     \|
//   |    /     \    ,-.     \
//   |___/_______\__/___\_____\
// --------------------------------------------
let slides = [
  {
    header: "100m",
    title: "100m Overview/Rundown",
    images: ["./images/100m_logo.png"],
  },

  {
    header: "Introduction",
    title: "Introduction",
    content: [
      `Hey everyone, so this will be a short presentation -- I will just quickly give you a brief rundown of how we have been organising ourselves over the past year, what's next, a brief overview of the conversations we had about how we want 100m to grow, and how we can sustain it. And finally I'll just introduce some of the projects we have lined up for the future.`,
    ],
    images: [
      "https://d2w9rnfcy7mm78.cloudfront.net/3834101/original_f2b333ca1d245921d35a036c3f48b62a.jpg",
    ],
  },

  {
    header: "Table of Contents",
    title: "Table of Contents",
    content: [
      "To quickly give you an overview of what I will be talking about:",
      "☞ How we have been organized",
      "➫ How we are planning on being organized in the future",
      "➥ What's next, upcoming projects and stuff ",
    ],
  },

  {
    header: "How we have been organized",
    title: "We've been working...",
    content: [
      "So the past year, we've been working in sort of these simple patterns:",
      "What do we wanna do? ➠ Then help each other.",
      "➫ Have meetings whenever things come up",
      "➥ Pick up stuff that needs to be done",
      "➠ And everyone just sort of does it",
      () => strike_through("✕ Works like a charm..."),
    ],
    images: ["./images/cur_working.png"],
  },

  {
    header: "How we will be organized",
  },

  {
    header: "Upcoming Projects",
  },
];

let slideElements = slides.map((slide) => {
  return slide_element(slide.header, slide.title, slide.content, slide.images);
});

// How a slide is created
function slide_element(header, title_text, content_list, images) {
  let slide = document.createElement("div");
  let presentation_area = document.createElement("div");
  presentation_area.classList.add("presentation-area");

  if (title_text) {
    presentation_area.appendChild(title(title_text));
  }

  if (images) {
    presentation_area.appendChild(image_box(images));
  }

  content_list ? presentation_area.appendChild(content(content_list)) : null;

  slide.appendChild(top_bar(header));
  slide.appendChild(presentation_area);

  return slide;
}

function title(title_text) {
  let elem = document.createElement("span");
  elem.classList.add("title");
  elem.innerText = title_text;
  return elem;
}

function content(list) {
  let container = document.createElement("span");
  container.classList.add("content");
  list.forEach((item) => {
    if (typeof item === "string") container.appendChild(p(item));
    if (typeof item === "function") container.appendChild(item());
    else if (item instanceof HTMLElement) container.appendChild(item);
  });

  return container;
}

function p(text) {
  let elem = document.createElement("p");
  elem.innerText = text;
  return elem;
}

function strike_through(text) {
  let elem = document.createElement("span");
  elem.style.textDecoration = "line-through";
  elem.innerText = text;

  return elem;
}

function image_box(images) {
  let container = document.createElement("div");
  container.classList.add("image-box");

  images.forEach((image) => {
    let img = document.createElement("img");
    img.src = image;
    container.appendChild(img);
  });

  return container;
}

function top_bar(header_text) {
  let elem = document.createElement("div");
  elem.classList.add("header");

  let header = document.createElement("span");
  header.innerText = header_text + " ";

  let title = document.createElement("h1");
  header.innerText = header_text;

  elem.appendChild(header);
  elem.appendChild(page_numbers());
  elem.appendChild(page_buttons());

  return elem;
}

function page_numbers() {
  let page_numbers = document.createElement("span");
  page_numbers.classList.add("page-numbers");

  let set_page = (count) => {
    let slide_num = count + 1;
    page_numbers.innerText = `${slide_num}/${slides.length}`;
  };

  presenter.subscribe((memory) => {
    set_page(memory.count);
  });

  return page_numbers;
}

function page_buttons() {
  let buttons = document.createElement("span");
  buttons.classList.add("page-buttons");

  let next = document.createElement("button");
  next.innerText = "⇢";
  next.addEventListener("click", () => presenter.next());

  let previous = document.createElement("button");
  previous.innerText = "⇠";
  previous.addEventListener("click", () => presenter.previous());

  buttons.appendChild(previous);
  buttons.appendChild(next);

  return buttons;
}

presenter.update();
