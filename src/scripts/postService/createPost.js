import { render, openPost } from "../dashboard.js"
import { getPost } from "./getPost.js"
import { openModalDelete } from "./deletePost.js"
import { edit } from "./editPost.js"
let postes = ''

export const createPost = (postData) => {
    const token = localStorage.getItem('@petToken')
    const urlBase = 'http://localhost:3333/posts/create'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    }

    const created = fetch(urlBase, options)
        .then(async (res) => {
            const resJson = await res.json()
            if (res.ok) {
                postes = await getPost()
                setTimeout(4000, Toastify({
                    text: `Poste criado com sucesso`,
                    duration: 4000,
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "green",
                    },
                    onClick: function () { } // Callback after click
                }).showToast())
                render(postes)
                openModalDelete()
                openPost(postes)
                edit(postes)
            } else {
                throw new Error(resJson.message)
            }
        })
        .catch((error) => {
            alert(error)
        })
    return true
}

export const modalCreate = () => {
    const obj = {
        title: '',
        content: ''
    }
    const btnOpen = document.querySelector('#modal__create')
    const dialog = document.querySelector('#dialog__create')
    const btnDelete = document.querySelectorAll('#close')
    const created = document.querySelector('.btn__create')

    btnOpen.addEventListener('click', () => {
        dialog.showModal()
    })

    created.addEventListener('click', () => {
        const title = document.getElementById('modal__title__crate').value
        const content = document.getElementById('text__area__create').value

        obj.title = title
        obj.content = content

        createPost(obj)
        dialog.close(btnDelete)
    })

    btnDelete.forEach((btn) => {
        btn.addEventListener('click', () => {
            dialog.close()
        })
    })
}

modalCreate()