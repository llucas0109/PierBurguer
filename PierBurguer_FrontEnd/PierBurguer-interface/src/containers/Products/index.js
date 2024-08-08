import { useEffect, useState } from 'react'
import apiPierBurguer from '../../services/api'
import ProductsBurguer from '../../assets/Categoriimghamburguer.jpg'
import formatCurrency from '../../Utils/formatCurrency.js'
import { HomeImg,Button,CategoriesMenu,ProductsConteiner,ManegerConteiner } from './style.js'
import CardProducts from '../../components/CardProducts/index.js'
import Header from '../../components/Header/index.js'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const Product = () => {
  const locationState = useLocation().state // useLocation Recebe os dados que sao enviador para ele atravez do '<Link to= statate=>' por exemplo.
  
  let categoryId = 0
  if(locationState?.categoryId){  // '?' Verifica se os valores dentro do objeto existem se nao existir ele segue o fluxo da aplicaçao sem travar por nao encontrar.
    categoryId = locationState.categoryId
  }

  const [categories,setcategories] = useState([])
  const [products,setproducts] = useState([])
  const [FilteredProducts,setFilteredProducts] = useState([])
  const [activecategories,setactivecategories] = useState(categoryId)

  useEffect(() => {
    async function loadCategories() {
      const { data } = await apiPierBurguer.get('categories')

      const newCategories = [{ id: 0, name: 'Todas' }, ...data]
      setcategories(newCategories) // Atualizando o useState
    }
    loadCategories() // Chamando a funçao para q ela possa ser executado

    async function loadProducts() {
      const { data } = await apiPierBurguer.get('products')
      
      const newProducts = data.map(product => { 
      return  { ...product ,formatedPrice: formatCurrency(product.price) }})
      
      setproducts(newProducts)
    }
    loadProducts()

  }, [])

  useEffect(() => {
    if(activecategories === 0){
      setFilteredProducts(products)
    }else{
    const newFilteredProducts = products.filter(  // filter pega os itens true e acumula e guarda em si todos .
    product => product.category_id === activecategories)
    
    setFilteredProducts(newFilteredProducts)
    }
  }, [activecategories, products])
    

  return(
    // <Container>
    //   <HomeImg src={Homelogo} alt="Imagem logo" />
    //   <CategoryCarousel/>
    // </Container>
    <ManegerConteiner>
      < Header />
    <HomeImg src={ProductsBurguer} />
    <CategoriesMenu>
    {categories && categories.map(category => <Button type='button' 
    key={category.id} 
    $isactivicategory={activecategories === category.id}  // '$' Diz que esse atributo nao sera renderizado na arvore de elementos
    onClick={() =>{setactivecategories(category.id)}}
    >{category.name}</Button>)}
    </CategoriesMenu>
    <ProductsConteiner>
      {FilteredProducts &&
      FilteredProducts.map(product => (
        <CardProducts key={product.id} product = {product} />
      ))}
    </ProductsConteiner>
    </ManegerConteiner>  
  )
}

export default Product

Product.propTypes = {
location: PropTypes.object }