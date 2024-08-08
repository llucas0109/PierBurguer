import { ConteinerButton } from "./style"
import PropTypes from 'prop-types'
function Button(props,  { ...rest }){  // { ...rest }   Vai mostrar todos os atributos e texto dentro das tags 
  return <ConteinerButton { ...rest }>{props.children}</ConteinerButton>  // props.children Pega os Valores dentro da tag. da para pegar o atributos tbm.
}

export default Button

Button.propType = { //Determina o tipo de dado que sera recebido nas props do Button
  children: PropTypes.string
}