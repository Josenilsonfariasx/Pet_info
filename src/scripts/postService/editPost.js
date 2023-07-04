import { render, openPost } from "../dashboard.js"
import { getPost } from "./getPost.js"
import { openModalDelete } from "./deletePost.js"

export const edit = (postes) => {
    const userName = localStorage.getItem('@petUsername')
    const userAvatar = localStorage.getItem('@petavatar')
    const userId = localStorage.getItem('@petid')
    const token = localStorage.getItem('@petToken')
    const urlBase = 'http://localhost:3333/posts/'

    const btns = document.querySelectorAll('.list__edit')
    const modal = document.querySelector('#dialog__edit')
    let htmlModal = ''

    btns.forEach((btn) => {
        // console.log(btn.id)
        btn.addEventListener('click', () => {
            const post = postes.filter((Element) => {
                return (Element.id == btn.id)
            })
            console.log(post)
            const novData = new Date(post[0].createdAt)
            const options = { month: 'long', year: 'numeric' };
            const formattedDate = novData.toLocaleDateString('pt-BR', options);
            htmlModal = ` 
        <section class="list__header modal">
            <div>
                <img class="list__logo" id="img-logoModal" src="${userAvatar}" alt="logo">
                <span class="list__name name">${userName}</span>
                <span class="list__bar">|</span>
                <span class="list__time-post" id="postTime">${formattedDate}</span>
                <div id="closex">
                    <button type="button" class="btn__closeModal">x</button>
                </div>
            </div>
        </section>
        <section class="modal__content">
            <div class="post">
                <input type='text' id="modal__title" class='title_edit' value='${post[0].title}'>
                <textarea class="conteudoEdit" id="text__area" cols="50" rows="10">${post[0].content}</textarea>
            </div>
            <section class="modal__edit__buttons">
                <button class="btn__cancelar btn__closeModal">Cancelar</button>
                <button class="btn__save" id='save'>Salvar alterações</button>
            </section>
        </section>`
            modal.innerHTML = htmlModal
            modal.showModal()

            const btnSave = document.getElementById('save');
            const title = document.querySelector('.title_edit')
            const conteudo = document.querySelector('.conteudoEdit')
            btnSave.addEventListener('click', () => {
                const editObj = {
                    title : title.value,
                    content : conteudo.value
                }
                const options = {
                    method: 'PATCH',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editObj)
                }
                const postEdit = fetch(urlBase+post[0].id,options)
                .then(async(res)=>{
                    const resJson = await res.json()
                    if(res.ok){
                        modal.close()
                        setTimeout(4000,Toastify({
                            text: `Editado com sucesso`,
                            duration: 4000,
                            newWindow: true,
                            close: true,
                            gravity: "bottom", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "green",
                            },
                            onClick: function(){} // Callback after click
                        }).showToast())
                        const postes = await getPost()

                        render(postes)
                        edit(postes)
                        openPost(postes)
                        openModalDelete()
                        
                    return resJson
                    }else {
                        throw new Error(resJson.message)
                    }
                })
                .then((data)=>{
                    console.log(data)
                })
                .catch((err)=>{
                    setTimeout(4000,Toastify({
                        text: `${err.message}`,
                        duration: 4000,
                        newWindow: true,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "red",
                        },
                        onClick: function(){} // Callback after click
                    }).showToast())
                })
            })
            const btn_cancelar = document.querySelectorAll('.btn__closeModal')
            btn_cancelar.forEach((btn)=>{
                btn.addEventListener('click',()=>{
                    modal.close()
                })
            })
        })
        
    })
}   