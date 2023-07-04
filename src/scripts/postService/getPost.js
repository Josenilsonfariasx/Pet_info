const token = localStorage.getItem('@petToken')
export const getPost = ()=>{
    const urlBase = 'http://localhost:3333/posts'
    const options = {
        method : 'GET',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }

    const posts = fetch(urlBase, options)
    .then(async(res) =>{
        const resJson = await res.json()
        if(res.ok){
            return resJson
        }else{
            throw new Error(resJson.message)
        }
    })
    .catch((error)=>{
        console.log(error)
    })
    return posts
}
getPost()