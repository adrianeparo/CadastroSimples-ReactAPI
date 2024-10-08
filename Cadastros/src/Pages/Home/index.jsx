import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/16qg.svg'
import api from '../../services/api'


function Home() {

  const [users, setUsers] = useState([])

  // Ref para os input. É um link entre a informação e o input
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  //Buscar usuarios
  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  //Criar usuarios
  async function createUsers() {

    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    //Atualizar dados automaticamente
    getUsers()

  }

  //Deletar usuarios
  //chamar função no button de lixeira
  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    //Atualizar dados automaticamente
    getUsers()
  }


  useEffect(() => {
    getUsers()
  }, [])


  return (

    <div className='container'>

      <form>
        <h1>Cadastro de usuários</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputName} />
        <input placeholder="Idade" name='Idade' type='number' ref={inputAge} />
        <input placeholder="exemplo@email.com" name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastra</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}

    </div>

  )
}

export default Home
