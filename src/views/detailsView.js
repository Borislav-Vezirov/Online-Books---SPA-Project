import { addLike, deleteBook, detailBook, getLikes, getMyLikes } from "../api/data.js";
import { html} from "../library.js";
import { getUserData } from "../utils.js";

const detailsTemplates = (book, isOwner, onDelete, likes, showlikeBtn, onLike) => html `

<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <div class="actions">
                    ${isOwner 
                        ? html`
                        <a class="button" href="/edit/${book._id}">Edit</a>
                        <a @click="${onDelete}" class="button" href="javascript:void(0)">Delete<a>                    
                    `   : ''}
                    ${showlikeBtn 
                        ? html `<a class="button"  @click="${onLike}" href="javascript:void(0)">Like</a>`
                        : ''}
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likes}</span>
                    </div>
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>
`;

export async function detailsPage(ctx){

    const userData = getUserData();

    const [book, likes, hasLike] = await Promise.all([
        detailBook(ctx.params.id),
        getLikes(ctx.params.id),
        userData ? getMyLikes(ctx.params.id, userData.id) : 0
    ]);

    const isOwner = userData && userData.id == book._ownerId;

    const showlikeBtn = userData != null && hasLike == false && isOwner == false;

    ctx.render(detailsTemplates(book, isOwner, onDelete, likes, showlikeBtn, onLike));   

    async function onDelete(){

        const choise = confirm('Are you sure you want to delete this item?');

        if(choise){
            await deleteBook(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onLike(){

        await addLike(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}
