import { foo, STATES } from "./data.jsonpf";
import { h, render, createElement } from "preact";

const root = document.querySelector("#root");

const Article = ({ title, body }) => {
  console.log(title, body);
  return (
    <article>
      <h1>{title}</h1>
      <p>{body}</p>
    </article>
  );
};

const App = ({ data, state }) => {
  return (
    <main>
      {state === STATES.FETCHED &&
        data.map((props, i) => <Article {...props} key={i} />)}
    </main>
  );
};

render(<App {...foo} />, root);
