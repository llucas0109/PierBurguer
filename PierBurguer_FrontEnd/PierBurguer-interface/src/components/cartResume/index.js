import { useEffect, useState } from 'react'
import api from '../../services/api.js'
import { useCart } from '../../hooks/CartContext.js'
import { Container,Button } from './style.js'
import formatCurrency from '../../Utils/formatCurrency.js'
import { toast } from 'react-toastify'

const CartResume = () => {
  const [finalPrice, setFinalPrice] = useState(0)
  const [deliveryTax] = useState(5)

  const {cartData} = useCart()
  
  useEffect(() => {
    // Reduce usa o acc, current  passano acc como valor Do index 0 do array e current Como Sendo o valor do index final. entao assim como loop for ele repete ate finalizar o numero itens dentro do array.
    const sumAllItems = cartData.reduce((acc, current) => {  // reduce Intera Todos os itens dentro de um array
    return current.price * current.quantity + acc
  }, 0)
    setFinalPrice(sumAllItems)
    }, [cartData, deliveryTax])

  const submitorder = async () => {
    const order = cartData.map(product => {
    return {id: product.id, quantity: product.quantity}
    })

    await toast.promise(api.post('orders',{ products : order }),{
      pending: 'Realizando o seu pedido ... ',
      success: 'Pedido realizado com sucesso',
      error: 'Falha ao tentar realizar o seu pedido, tente novamente'
    })
  }  
  
  return(
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do pedido</h2>
          <p className="itens">Itens</p>
          <p className="items-price">{formatCurrency(finalPrice)}</p>
          <p className="delivery-tax">Taxa de entrega</p>
          <p className="delivery-tax-price">{formatCurrency(deliveryTax)}</p>
        </div>
        <div className='container-bottom'>
          <p>Total</p>
          <p>{formatCurrency(finalPrice + deliveryTax)}</p>
        </div>
      </Container>  
      <Button onClick={submitorder} > Finalizar Pedido </Button>
    </div>
  )
}

export default CartResume