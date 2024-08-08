
const formatCurrency = value => {
  return new Intl.NumberFormat('pt-BR', {  // pt-BR Determinando a lingua
    style: 'currency',  // Determina que o formato È de moeda"
    currency: 'BRL'  // Determina qual a moeda
  }). format(value) // Converte o formato de acordo com a prop
}

export default formatCurrency
