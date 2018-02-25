import { foo, STATES } from "./data.jsonf";

const root = document.querySelector("#root");

foo.state === STATES.FETCHED &&
  foo.data.forEach(({ title, body }) => {
    const article = document.createElement("article");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    h1.innerHTML = title;
    p.innerHTML = body;
    article.appendChild(h1);
    article.appendChild(p);
    root.appendChild(article);
  });
