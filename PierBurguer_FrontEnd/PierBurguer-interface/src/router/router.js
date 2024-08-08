import Login from '../containers/Login/index.js'
import Register from '../containers/Register/index.js'
import Home from '../containers/Home/index.js'
import Product from '../containers/Products/index.js'
import Cart from '../containers/Cart/index.js' 
// import xeckup from './private-routes.js'
import { useState } from 'react'

import {  // 'Routes' Substituiu o switch
  Navigate,
  Route, 
  Routes, 
  redirect
} from 'react-router-dom'
  // 'createBrowserRouter' Atualiza a rota. ele esta no index.
  // 'Routes' examana as rotas 'route' para verificar qual delas corresponde ao pedido de camilho URL.
  // 'Route' Executa o Componente, Que esta associado a Um caminho Na 'Url', Caso Esse Caminho seja Colocado. 

function RouterPag () {
  // const [userLogin,setuserLogin] = useState(false)
  // const user = localStorage.getItem('NomeDaMykay:paraidentificar')

  // if(!user){
  //   setuserLogin(false)
  // }
  
  // setuserLogin(true)
  return ( 
    <> 
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={localStorage.getItem('NomeDaMykay:paraidentificar') ? <Home /> : <Navigate to="/login" />} /> 
        <Route path='/' element={<Navigate to="/home" />} /> 
        <Route path='/products' element={localStorage.getItem('NomeDaMykay:paraidentificar') ? <Product /> : <Navigate to="/login" />} /> 
        <Route path='/cart' element={localStorage.getItem('NomeDaMykay:paraidentificar') ? <Cart /> : <Navigate to="/login" />} /> 
      </Routes>
    </>
  )
}

export default RouterPag
