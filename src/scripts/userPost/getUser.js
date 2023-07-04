const token = localStorage.getItem('@petToken')
export const getUser = ()=>{
    const urlBase = 'http://localhost:3333/users/profile'
    const options = {
        method : 'GET',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }

    const users = fetch(urlBase, options)
    .then(async(res) =>{
        const resJson = await res.json()
        if(res.ok){
            localStorage.setItem('@petUsername', resJson.username)
            localStorage.setItem('@petemail', resJson.email)
            localStorage.setItem('@petavatar', resJson.avatar)
            localStorage.setItem('@petid', resJson.id)
        }else{
            throw new Error(resJson.message)
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}
getUser()