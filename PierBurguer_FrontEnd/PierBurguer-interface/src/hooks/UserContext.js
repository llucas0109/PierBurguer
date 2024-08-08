import { createContext, useContext, useState, useEffect } from "react";  // 'useContext' Diz onde Esta o contexto E lê O Contexto
import PropTypes from 'prop-types'
// import { set } from "react-hook-form";

// Criando Contexto Ou seja Um arquivo onde contera os dados dos usuario, Para ser acessado por qualquer outro modulos.

 const UserContext = createContext({}) // createContext({})' Cria Uma Contexto 

 export const UserProvider = ({ children }) => {
  const [userData, setuserData] = useState({})

  const putUserData = async userInfo => {
    setuserData(userInfo)
    // JSON.stringify(userInfo) Tranforma o objeto em string
    await localStorage.setItem('NomeDaMykay:paraidentificar', JSON.stringify(userInfo))  // localStorage.setItem Guarda os itens no chorme.
  }

  const Logout = async () => {
  await localStorage.removeItem( 'NomeDaMykay:paraidentificar' )
 }

  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('NomeDaMykay:paraidentificar')  // Pega os dados do localStorage

      if(clientInfo) {
        setuserData(JSON.parse(clientInfo))  
      }
    }

    loadUserData()

  },[])

  return (
     <UserContext.Provider value={{userData,putUserData,Logout}}>  { /* Adicionando 'user' e 'otheruser' ao contexto*/}
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext) // 'useContext' Diz onde Esta o contexto E lê O Contexto
  
  if (!context) {
  throw new Error('useUser must be used with UserContext') // throw pausa a execuçao joga pro catch se tiver.
  }

  return context
}  

UserProvider.propTypes = {  // Configura props
  children: PropTypes.node // A props do UserProvider Vai ser do tipo de dado node
}
