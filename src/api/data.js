import * as api from './api.js';

export const login    = api.login;
export const register = api.register;
export const logout   = api.logout;


export async function getAllMemes(){
    return api.get(`/data/books?sortBy=_createdOn%20desc`);
}

export async function addBook(book){
    
    return api.post('/data/books', book);
}

export async function detailBook(id){
    return api.get(`/data/books/${id}`);
}

export async function editBook(id, data){
    return api.put(`/data/books/${id}`, data);
}

export async function myBooks(userId){
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function deleteBook(id){
    return api.del('/data/books/' + id)

}
//-----------------------------  likes  ---------------------------------------------

export async function getLikes(bookId){
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getMyLikes(bookId, userId){
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function addLike(bookId){
    
    return api.post('/data/likes', { bookId });
}
