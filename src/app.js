import { logout, myBooks }       from './api/data.js';
import { page, render } from './library.js';
import { getUserData }  from './utils.js';
import { catalogPage }  from './views/catalogView.js';
import { loginPage }    from './views/loginView.js';
import { registerPage } from './views/registerView.js';
import { addBookPage }  from './views/addBookView.js';
import { detailsPage }  from './views/detailsView.js';
import { editPage }     from './views/editView.js';
import { myBooksPage }  from './views/my-booksView.js';



const root = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/addbook', addBookPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-books', myBooksPage);

updateNav();
page.start();

function updateNav(){

    const userData = getUserData();

    if(userData){
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    }else{
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}

function decorateContext(ctx, next){

    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function onLogout(){

    logout();
    updateNav();
    page.redirect('/catalog');
}