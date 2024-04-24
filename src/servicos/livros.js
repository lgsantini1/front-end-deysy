import axios from "axios";

const livrosAPI= axios.create({baseURL: "http://18.118.205.90:8000/livros"})

async function getLivros(){
    const response= await livrosAPI.get('/')
     return  response.data
}

export{
    getLivros
}