import { createContext, useContext, useState, useEffect } from "react";  // 'useContext' Diz onde Esta o contexto E lê O Contexto
import PropTypes from 'prop-types'
// import { set } from "react-hook-form";

// Criando Contexto Ou seja Um arquivo onde contera os dados dos usuario, Para ser acessado por qualquer outro modulos.
// Await so funciona em promises
 const CartContext = createContext({}) // createContext({})' Cria Uma Contexto 

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]) // useState é Asincrono ou seja pode acontecer de ele continuar o codigo sem nescessariamente alterar o estado de si.

  const updateLocalStorage = async products => {
    await localStorage.setItem('NomeDaMykay:CartInfo', JSON.stringify(products))
  }
  
  const putProductsInCart = async product => {
    const cartIndex = cartData.findIndex(prd => prd.id == product.id)
     let newCartProducts = []
    if(cartIndex >= 0){ 
      newCartProducts = cartData
      newCartProducts[cartIndex].quantity = newCartProducts[cartIndex].quantity + 1 // quantity Acho que é um metodo padrao para saber a quantidade 
      setCartData(newCartProducts)

    }else{
      product.quantity = 1
      newCartProducts = [...cartData,product]
      setCartData(newCartProducts)
      
    }
   
    await updateLocalStorage(newCartProducts)
  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem('NomeDaMykay:CartInfo')  // Pega os dados do localStorage
      if(clientCartData) {
        
        setCartData(JSON.parse(clientCartData))  /// Look here
      }
    }

    loadUserData()

  },[]) // O Use effect è Executado quantos os itens dentro do array se modificam

  const deleteProduct = async productId =>{
    const newCart = cartData.filter(product => product.id != productId)

    setCartData(newCart)
    await updateLocalStorage(newCart)
  }

  const increaseProducts = async productId => {
    const newCart = cartData.map(product => {
    return product.id === productId
    ? { ... product, quantity: product.quantity + 1 }
    : product
    })
    setCartData(newCart)
    
    await updateLocalStorage(newCart)
    }

    const decreaseProducts = async productId => {
      const cartIndex = cartData.findIndex(pd => pd.id == productId)

      if(cartData[cartIndex].quantity > 1){
        const newCart = cartData.map(product => {
        return product.id === productId
        ? { ... product, quantity: product.quantity - 1 }
        : product
        })
        setCartData(newCart)
      
      await updateLocalStorage(newCart)
      }else{
        deleteProduct(productId)
      }
      
    }

  return (
     <CartContext.Provider value={{cartData,putProductsInCart,increaseProducts,decreaseProducts}}>  { /* Adicionando 'user' e 'otheruser' ao contexto*/}
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext) // 'useContext' Diz onde Esta o contexto E lê O Contexto

  if (!context) {
  throw new Error('useUser must be used with UserContext') // throw pausa a execuçao joga pro catch se tiver.
  }

  return context
}  

CartProvider.propTypes = {  // Configura props
  children: PropTypes.node // A props do UserProvider Vai ser do tipo de dado node
}
