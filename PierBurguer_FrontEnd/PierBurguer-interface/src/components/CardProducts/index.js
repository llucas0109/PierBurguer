import PropTypes from 'prop-types'
import { Container,Image,ProductName,ProductPrice,Button } from './style.js'
import { useCart } from '../../hooks/CartContext.js';
import { useNavigate } from 'react-router-dom';

function CardProducts({ product }){
  const Navigate = useNavigate()
  const { putProductsInCart } = useCart()
  console.log("Product Do CardProduct",product);
return(
  <Container>
    <Image src={product.url}/>
    <div>
      <ProductName >{product.name}</ ProductName>
      <ProductPrice  > {product.formatedPrice}</ ProductPrice>
      <Button onClick={() => { 
        putProductsInCart(product)
        Navigate('/cart')
      }
      }>Adicionar</Button>
    </div>
  </ Container>
)
}
CardProducts.propTypes = {
  product: PropTypes.object
}
export default CardProducts