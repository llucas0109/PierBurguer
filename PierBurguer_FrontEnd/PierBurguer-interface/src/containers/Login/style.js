import styled from "styled-components";
import Background from '../../assets/shop.jpg';
import LoginImg from '../../assets/heand.jpg'
import { ConteinerButton } from "../../components/Button/style.js";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('${Background}');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginImage = styled.div`
  width: 400px;
  height: 400px;
  background: url('${LoginImg}'); 
  background-size: cover;
  background-position: center;
  text-align: center;
  
`;

export const Logo = styled.p`
  padding-top: 30%;
  font-size: 40px;
  font-weight: 700;
`

export const ContainerItens = styled.div`
  background: #373737;
  border-radius: 0 10px 10px 0;
  height: 70%;
  padding: 25px 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  

`;

export const Label = styled.p`
  /* Adicione aqui os estilos para Label, se necessário */
`;

export const Input = styled.input`
  width: 391.42px;
  height: 38.32px;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
  border-radius: 5px;
  outline: none;
  border: ${(props => props.error? '2px solid red' //Recebendo o Atributo 'erro'(Que Foi inventado) do input
   : 'none') // caso Encontre algum tipo de erro sera true entao alteramos as configuraçoes se nao,nao.
  };
  padding-left: 10px;
`;

export const Button = styled(ConteinerButton)`  // styled(ConteinerButton) Estende o estilo de ConteinerButton
  margin-top: 75px;
  margin-bottom: 25px;
`;

export const SignInLink = styled.p`
  /* Adicione aqui os estilos para SignInLink, se necessário */
`;


