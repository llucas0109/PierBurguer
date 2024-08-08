import { useNavigate,useLocation  } from 'react-router-dom'
import { useUser } from '../../hooks/UserContext.js'
import { Container,
  ContainerLeft,
  PageLink,
  ContainerRight,
  ContainerText,
  Line,
  PageLinkExit } from './style.js'
import shopping from '../../assets/shopping.svg'
import person from '../../assets/person.svg'

const Header = () => {
  const { Logout,userData } = useUser()
  const location = useLocation();
  const navigate = useNavigate();
  const logoutUser = () =>{
    Logout()
    navigate('/login')
  }

  return(
    <Container>
        <ContainerLeft>
          <PageLink onClick={ () => { navigate('/home') }} $isActive={location.pathname == '/home'}>Home</ PageLink>
           <PageLink onClick={ () => { navigate('/products') }} $isActive={location.pathname == '/products'}>Ver Produtos</ PageLink>    {/*  'includes' È uma funçao nativa do javascript usada para encontrar algo espefico  */}
        </ContainerLeft>

        <ContainerRight>
          <PageLink onClick={() => { navigate('/cart') }} >
            <img src={shopping} alt='shopping' />
          </ PageLink>
          <Line></Line>
          <PageLink>
            <img src={person} alt='person' />
          </ PageLink>
        <ContainerText>
          <p>Ola {userData.name}</p> {/*  mymonmy  */}
          <PageLinkExit onClick={logoutUser}> Sair </PageLinkExit>
        </ContainerText>
      </ContainerRight>
    </Container>  
  )
}
// Quando a funçao que vai ser chamada no onclick nao tiiver parametro semplesmente colocamos o nome dela caso ela tenha parametros devemos passar um arrow function.
export default Header