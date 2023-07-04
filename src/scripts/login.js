const userLogin = async (userLogin)=>{
    const urlBase = 'http://localhost:3333/login'
    const options = {
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogin)
    }

    const logged  = await fetch(urlBase, options)
    .then(async(res)=>{
        const resJson = await res.json()
        if(res.ok){ 
            localStorage.setItem('@petToken', resJson.token)
            setTimeout(4000,Toastify({
                text: `Logado com sucesso`,
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
                window.location.replace('./src/pages/dashboard.html');
            }, 3000);
        }else{
            throw new Error(resJson.message)
        }
    })
    .catch((error)=>{
        const message = error.message
        console.log(message)
        if('A senha está incorreta'.includes(message)){
            const senha = document.getElementById('incorrect')
            senha.style.display = 'block'
        }
        Toastify({
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
        }).showToast();
    })
    return logged
}

const login = ()=>{
    let login = {}
    const inputs = document.querySelectorAll('input')
    const btnLogin = document.getElementById('login__in')
    const areInputsFilled = () => {
        return Array.from(inputs).every(input => input.value.trim() !== '');
    }
    
    // Verifica a validade dos inputs ao digitar
    inputs.forEach(input => {
    input.addEventListener('input', () => {
        areInputsFilled()
        btnLogin.disabled = !areInputsFilled();
    });
    });
    btnLogin.addEventListener('click', (e)=>{
        e.preventDefault()
        areInputsFilled()
        if(!areInputsFilled()){
            Toastify({
                text: `Preencha os campos para continuar`,
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
            }).showToast();
            btnLogin.disabled = !areInputsFilled();
        }else{
            const spin = document.getElementById('spin')
            spin.style.display = 'flex'
            inputs.forEach((input) =>{
                login[input.name] = input.value
            })
            userLogin(login)
            btnLogin.disabled = false;
            
        }
})
    
}
login()

const btnBackRegister = document.querySelector('#register')

btnBackRegister.addEventListener('click', ()=> window.location.href='./src/pages/register.html')