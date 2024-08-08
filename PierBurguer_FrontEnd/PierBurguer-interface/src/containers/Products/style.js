import styled from "styled-components";

export const Container = styled.div`
    background: #E5E5E5;
 `
export const HomeImg = styled.img`
height: 300px;

`
export const CategoriesMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 20px 20px 0 20px;

`

export const Button = styled.button`
cursor: pointer;
background: none;
border: none;
border-bottom: ${props => (props.$isactivicategory ?' 2px solid red':'none'
)}; // Adiciona um alinha de birda em baixo do bottom
color: ${props => (props.$isactivicategory ?'red':'brown'
)};
font-size: 17px;
line-height: 20px;

`

export const ProductsConteiner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
 `
 export const ManegerConteiner = styled.div`

 `