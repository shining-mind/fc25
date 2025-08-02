import sheet from "./tailwind.css" with {
  type: "css"
};

const node = document.querySelector("div");
const shadow = node.attachShadow({
  mode: "open"
});

shadow.adoptedStyleSheets = [sheet];
shadow.innerHTML = `
  <div class="bg-sky-500 m-8">
    ...
  </div>`;

