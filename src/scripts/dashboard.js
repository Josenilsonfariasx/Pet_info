import { getPost } from "./postService/getPost.js"
import { edit} from "./postService/editPost.js"
import { openModalDelete } from "./postService/deletePost.js"

const permission = ()=>{
    const token = localStorage.getItem('@petToken')
    if(!token){
        const body = document.querySelector('main, header')
        const div = document.querySelector('span')
        div.style.display = 'none'
        body.style.display = 'none'

        setTimeout(function(){
            Toastify({
                text: `Efetue o login antes de acessar`,
                duration: 4000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "red",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        }, 100)
        setTimeout(()=>{
            window.location.href='../../index.html'
        }, 3000)
    }
}
permission()
const postes = await getPost()
export const render = (postes)=>{
    const logoUser = localStorage.getItem('@petavatar')
    const img = document.querySelector('#img-logo')
    const ul = document.querySelector('.list__container')
    const id = localStorage.getItem('@petid')
    img.src = logoUser
    let html = ''

    postes.forEach(element => {
        const novData = new Date(element.createdAt)
        const options = { month: 'long', year: 'numeric' };
        const formattedDate = novData.toLocaleDateString('pt-BR', options);
        if(element.user.id === id){

        html+= `
        <li class="list__posts">
            <div class="list__header">
                <div>
                    <img class="list__logo" id="img-logo" src="${element.user.avatar}" alt="logo">
                    <span class="list__name">${element.user.username}</span>
                    <span class="list__bar">|</span>
                    <span class="list__time-post">${formattedDate}</span>
                </div>
                <div class="list__buttons">
                    <button class="list__edit" id='${element.id}'>Editar</button>
                    <button class="list__delete" id='${element.id}'>Excluir</button>
                    </div>
            </div>
            <div class="post">
                <h3>${element.title}</h3>
                <span>${element.content}</span>
                <button type="button" id="${element.id}" class="btn__open">Acessar publicação</button>
            </div>
        </li>`
        }else {
            html+= `
        <li class="list__posts">
            <div class="list__header">
                <div>
                    <img class="list__logo" id="img-logo" src="${element.user.avatar}" alt="logo">
                    <span class="list__name">${element.user.username}</span>
                    <span class="list__bar">|</span>
                    <span class="list__time-post">${formattedDate}</span>
                </div>
            </div>
            <div class="post">
                <h3>${element.title}</h3>
                <span>${element.content}</span>
                <button type="button" id="${element.id}" class="btn__open">Acessar publicação</button>
            </div>
        </li>`
        }
    });
    ul.innerHTML = html
    getPost()
}
    
render(postes)
edit(postes)
openModalDelete()

// render(postes)
// savePost()

export const openPost = (postes)=>{
    // modal - request tags, id, class
    const logo = document.getElementById('img-logoModal')
    const postTime = document.getElementById('postTime')
    const listName = document.querySelector('.name')
    const title = document.getElementById('modal__title')
    const textarea = document.getElementById('text__area')
    const dialog = document.getElementById('dialog')

    const btnClose = document.querySelector('.btn__closeModal')
    btnClose.addEventListener('click', ()=>dialog.close())
    const btnOpen = document.querySelectorAll('.btn__open')
    btnOpen.forEach(btn =>{
        btn.addEventListener('click',(e)=>{
            const post = postes.filter(element =>{
                return (element.id == btn.id)
            })
            
            const novData = new Date(post[0].createdAt)
            const options = { month: 'long', year: 'numeric' };
            const formattedDate = novData.toLocaleDateString('pt-BR', options);
            logo.src = post[0].user.avatar
            listName.innerText = post[0].user.username
            title.innerText = post[0].title
            textarea.innerText = post[0].content
            postTime.innerText = formattedDate
            dialog.showModal()
        } )
    })
    
}
openPost(postes)

const logout = ()=>{
    const btnLogouth = document.getElementById('logout')
    btnLogouth.addEventListener('click', ()=>{
        setTimeout(function(){
            Toastify({
                text: `Logout com feito com sucesso`,
                duration: 4000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "green",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        }, 100)
        setTimeout(()=>{
            window.location.href='../../index.html'
        }, 3000)
        localStorage.removeItem('@petToken')
    })
}

logout()