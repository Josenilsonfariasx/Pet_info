const createUser = async (user)=>{
    const urlBase = 'http://localhost:3333/users/create'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const newUser = await fetch(urlBase, options)
    .then(async(res)=>{
        const resJson = await res.json()
        if(res.ok){
            setTimeout(4000,Toastify({
                text: `Conta criada com sucesso`,
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
            setTimeout(function() {
                window.location.replace('../../index.html');
            }, 3000);
            const spin = document.getElementById('spin')
            spin.style.display = 'flex'
        return resJson
        }else {
            throw new Error(resJson.message)
        }
    })
    .then((data)=>{
        console.log(data)
    })
    .catch((error)=>{
        setTimeout(4000,Toastify({
            text: `${error.message}`,
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
    return newUser
}


const userRegister = ()=>{
    let newUser = {}
    const btnRegister = document.getElementById('register')
    const inputs = document.querySelectorAll('input')

    btnRegister.addEventListener('click', ()=>{
        let count = 0
        inputs.forEach(input =>{
            if(input.value !==''){
                newUser[input.name] = input.value
            }
            else{
                count++
                newUser[input.name] = ''
            }
            })
            if(count == 0){
                console.log(newUser)
                createUser(newUser)
            }
            else {
                setTimeout(4000,Toastify({
                    text: `Preencha todos os campos`,
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
            }

    })
}

userRegister()


const backLogin = document.querySelectorAll('#back__login')

backLogin.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        window.location.replace('../../index.html')
    })
})