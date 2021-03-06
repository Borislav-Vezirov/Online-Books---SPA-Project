import { getAllMemes } from "../api/data.js";
import { html } from "../library.js";



const template = (books) => html `
  <section id="dashboard-page" class="dashboard">
      <h1>Dashboard</h1>
      <ul class="other-books-list">
          ${books.length == 0
            ? html`<p class="no-books">No books in database!</p>`
            : books.map(ideaTemplate)}
      </ul>
  </section>
`;

const ideaTemplate = (book) => html `
  <li class="otherBooks">
      <h3>${book.title}</h3>
      <p>${book.type}</p>
      <p class="img"><img src=${book.imageUrl}></p>
      <a class="button" href="/details/${book._id}">Details</a>
  </li>
`;

export async function catalogPage(ctx){

  const books = await getAllMemes()
  
  ctx.render(template(books));
}