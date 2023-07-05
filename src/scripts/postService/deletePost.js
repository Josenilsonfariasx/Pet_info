import { render, openPost } from "../dashboard.js"
import { getPost } from "./getPost.js"
import { edit } from "./editPost.js"
let postes =''
let id=''
export const deletePost = async (idPost)=>{
    const token = localStorage.getItem('@petToken')
    const urlBase = `http://localhost:3333/posts/${idPost}`
    const options = {
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }
    
    const deleted = await fetch(urlBase, options)
    .then(async(res) =>{
        const resJson = await res.json()
        if(res.ok){
            postes = await getPost()
            render(postes)
            setTimeout(4000,Toastify({
                text: `Poste deletado com sucesso`,
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
            render(postes)
            openPost(postes)
            edit(postes)
            return (resJson)
        }
    })
    openModalDelete()
    return deleted
}

export const openModalDelete = ()=>{
    const btnOpen = document.querySelectorAll('.list__delete')
    const btnClose = document.querySelectorAll('.btn__cancelar')
    const modalDelete = document.querySelector('#dialog__delete')
    const btnconfirm = document.querySelector('.btn__confirm')

    btnClose.forEach((btn)=>{
        btn.addEventListener('click', ()=> {
            modalDelete.close() 
            console.log('ola')
        })
    })
    
    btnOpen.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            modalDelete.showModal()
            id = btn.id
            btnconfirm.addEventListener('click', ()=>{
                
                modalDelete.close()
                deletePost(id)
            })
        })
    })
}
openModalDelete()