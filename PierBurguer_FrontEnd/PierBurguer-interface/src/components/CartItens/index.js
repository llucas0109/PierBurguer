import { Container,Header,Body,Img,EmptyCart,P } from './style.js'
import { useCart } from '../../hooks/CartContext.js'
import formatCurrency from '../../Utils/formatCurrency.js'

const CartItens = () => {
  const { cartData,increaseProducts,decreaseProducts } = useCart()
  console.log("O Cart product Aqui",cartData);
  return(
    <Container>
      <Header>
        <p></p>
        <P>Itens</P>
        <P>Preço</ P>
        <P>Quantidade</P>
        <P>Total</P>
      </Header>
      {cartData && cartData.length > 0 ?
      cartData.map(product => (
      <Body key={product.id}>
        <Img src={product.url}/>
        <p>{product.name}</p>
        <p>{formatCurrency(product.price)}</p>
        <div className='quantityContainer'>
          <button onClick={() => decreaseProducts(product.id)}>-</button>
            <p>{product.quantity}</p>
          <button onClick={() => increaseProducts(product.id)} >+</button>
        </div>
        <p>{formatCurrency(product.quantity * product.price)}</p>
      </Body>
      ))
        : (
          <EmptyCart>Carrinho Vazio</EmptyCart>
        )
    }
    </Container>  
    
  )
}

export default CartItens