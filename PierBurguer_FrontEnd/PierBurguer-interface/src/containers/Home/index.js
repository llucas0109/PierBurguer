import { redirect } from "react-router-dom"
import Homelogo from "../../assets/img 1 1.png"
import { CategoryImg } from './style.js'
import ImagensCarrosel from "../../components/CategoryCarousel/index.js"
import OffersCarrosel from "../../components/offersCarousel/index.js"
import Hamburheand from '../../assets/img 1 1.png'
import Header from "../../components/Header/index.js"

const Home = () => {

  return(
    <>
    <Header />
    <CategoryImg src={Hamburheand}  />
    <ImagensCarrosel/>
      <OffersCarrosel/>
    </>  
  )
}

export default Home