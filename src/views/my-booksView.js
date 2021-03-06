import { myBooks } from "../api/data.js";
import { html } from "../library.js";
import { getUserData } from "../utils.js";


const booksTemplate = (books) => html `

<section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <ul class="my-books-list">
                ${books.length > 0 
                    ? books.map(bookTemplate)
                    : html `<p class="no-books">No books in database!</p>`}
            </ul>
        </section>
`;

const bookTemplate = (book) => html`

    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
`

export async function myBooksPage(ctx){

    const userData = getUserData();

    const books = await myBooks(userData.id)
    
    ctx.render(booksTemplate(books));
  }