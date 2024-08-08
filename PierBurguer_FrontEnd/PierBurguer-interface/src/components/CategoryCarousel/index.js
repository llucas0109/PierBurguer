import { Swiper, SwiperSlide } from 'swiper/react'
import { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import apiPierBurguer from '../../services/api.js'
import { Img, H1, Container, CategoryImg,Namedowcategory,Button} from './style.js'


function ImagensCarrosel(){


  const [categories,setcategories] = useState([])

  useEffect(() => {
    async function loadCategories() {
      const { data } = await apiPierBurguer.get('categories')

      setcategories(data) // Atualizando o useState
    }
    loadCategories() // Chamando a funçao para q ela possa ser executado

  }, [])
    
  return(
    <Container>
      <H1>Categorias</H1>
      <Swiper
        slidesPerView={3}
        navigation
      >
        {categories && categories.map( (item) => (
        <SwiperSlide key={item.id}>
        <Namedowcategory>
          <Img
          src={item.url}
          alt="Slider"
          className="slide-item" />
          <Button to= '/products'  // 'to' Rediricionando para pagina e passando um dado
           state = {{ categoryId: item.id }}
           >{item.name}</Button>
        </Namedowcategory>
        </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
export default ImagensCarrosel