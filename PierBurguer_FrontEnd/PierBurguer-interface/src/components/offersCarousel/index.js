import { Swiper, SwiperSlide } from 'swiper/react'
import { useState,useEffect } from 'react'
import apiPierBurguer from '../../services/api.js'
import { Img, H1, Container, Button,Namedowcategory} from './style.js'
import formatCurrency from '../../Utils/formatCurrency.js'
import { useCart } from '../../hooks/CartContext.js'
import { useNavigate } from 'react-router-dom'

function OffersCarrosel(){
  const [offers,setoffers] = useState([])
  const { putProductsInCart } = useCart()
  const Navigate = useNavigate()

  useEffect(() => {
    async function loadOffers() {
      const { data } = await apiPierBurguer.get('products')

      const onlyOffers = data.filter(product => product.offer).map(product =>{ // Esta Pegando Somente os offer que sao true E jogando no map
        return { ...product,formatedPrice:formatCurrency(product.price) }  // Criando Metodo de conversao da moeda
      })  

      setoffers(onlyOffers) // Atualizando o useState
    }
    loadOffers() // Chamando a funçao para q ela possa ser executado

  }, [])
    
  return(
    <Container>
      {/* <CategoryImg src={Hamburheand}  /> */}
      <H1>Offers</H1>
      <Swiper
        slidesPerView={3}
        pagination={{ clickable: true }}
        navigation
      >
        {offers && offers.map( (item) => (
        <SwiperSlide key={item.id}>
        <Namedowcategory>
          <Img
          src={item.url}
          alt="Slider"
          className="slide-item" />
          <p>{item.name}</p>
          <p>{item.formatedPrice}</p>
          <Button onClick={() => { 
            putProductsInCart(item)
            Navigate('/cart')}
           } >Peça Agora</Button>
        </Namedowcategory>
        </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
export default OffersCarrosel