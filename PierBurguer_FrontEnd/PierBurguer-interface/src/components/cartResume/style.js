import styled from "styled-components";
import { ConteinerButton } from '../Button/style.js'

export const Container = styled.div`
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .container-top {
  display: grid;
  grid-gap: 10px 50px;
  grid-template-areas:
  'title title'
  'items items-price'
  'delivery-tax delivery-tax-price';
  
  .title {
  grid-area: title;
  margin-bottom: 20px;
  }
  .items {
  grid-area: items;
  }
  .items-price {
  grid-area: items-price;
  }
  .delivery-tax {
  grid-area: delivery-tax;
  }
  .delivery-tax-price {
  grid-area: delivery-tax-price;
  }
}
.container-bottom{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 24px;
  margin-top: 40px;
}
 `
export const CartImg = styled.img`
width: 1000px;
height: 300px;
`
export const Wraper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  padding-bottom: 30px;
`
export const Button = styled(ConteinerButton)`
  width: 100%;
  margin-top: 30px;
`

