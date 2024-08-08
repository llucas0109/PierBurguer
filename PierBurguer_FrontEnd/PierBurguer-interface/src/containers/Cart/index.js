import CartLogo from '../../assets/foto de entrega.jpg'
import { CartImg,Container,Wraper } from './style.js'
import CartResume from '../../components/cartResume/index.js'
import CartItens from '../../components/CartItens/index.js'
import Header from '../../components/Header/index.js'

const Cart = () => {
 
  return(
    <Container>
    <Header/>
    <CartImg src={CartLogo} />
    <Wraper>
      <CartItens />
      <CartResume />
    </Wraper>
    </Container>  
  )
}

export default Cart