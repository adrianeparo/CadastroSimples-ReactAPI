import axios from 'axios'

//Criar conexão com servidor
const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export default api