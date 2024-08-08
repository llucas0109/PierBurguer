import styled from "styled-components";
import {Link} from 'react-router-dom'

export const Namedowcategory = styled.div`
  display: flex;
  flex-direction: column;
  height: 380px;
  background-color: #efefef;
  align-items: center;
 
 `
 export const Container = styled.div`

 `
export const H1 = styled.h1`
  text-align: center;
  background-color: #efefef;
`
export const Img = styled.img`
  width: 93%;
  margin:  0 10px;
  height: 300px;

`
export const Containeritens = styled.div`

`
export const Button = styled(Link)`
  width: 239.81px;
  height: 50.13px;
  background: #9758a6;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #eeeeee;
  margin-top: 10px;
  

  &:hover {
  opacity: 0.8;
  }

  &:active {
  opacity: 0.6;
  }

  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`
