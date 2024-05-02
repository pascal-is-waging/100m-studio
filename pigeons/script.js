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
  };

  let deps = [];
  return {
    subscribe: function(dep) {
      deps.push(dep);
    },
    update: function() {
      deps.forEach((dep) => dep(memory));
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
      }
    },
  };
})();

document.addEventListener("keydown", (event) => presenter.keymanager(event));

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
    header: "Title Page",
    title: "100m Overview/Rundown",
  },

  {
    header: "Introduction",
    title: "Introduction",
    content: [
      "We're going to do some talking about how we organise, etc. Another sentence and stuff and whatever you know?",
    ],
    images: [],
  },

  {
    header: "Table of Contents",
  },

  {
    header: "How we have been organized",
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
  list.forEach((item) => {
    container.classList.add("content");

    container.appendChild(p(item));
  });

  return container;
}

function p(text) {
  let elem = document.createElement("p");
  elem.innerText = text;
  return elem;
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
