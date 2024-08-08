import React from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import api from "../../services/api.js";
import { Link } from "react-router-dom";
import { useState,useRef } from "react";
import { toast } from "react-toastify";
// import { yupResolver } from "@hookform/resolvers/yup"

import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  Button,
  Logo
} from './style.js'
import styled from "styled-components";

function Register(){
  const schema = yup.object().shape({
    name: yup.string('O seu nome é obrigatório').required(),
    email: yup.string()
    .email('Digite um e-mail válido')
    .required('0 e-mail é obrigatório'),
    password: yup.string()
    .required('A senha é obrigatória')
    .min(5, 'A senha deve ter pelo 6 digítos'),
    confirmPassword: yup.string()
    .required('A senha é obrigatória').oneOf([yup.ref('password')], 'As Senha deve, ser iguais')  // oneOf() Compara dois campos 
  })
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm()
  const {
    register, // Registra o campo
    handleSubmit, 
    watch,
    formState: { errors }, // Pega os erros se existirem nos parametros passados em register
  } = useForm()

  const HandleonSubmitData = async clientData => { // clientData Esta recebendo os Dados dos Campos de input
    try{ 
      const { status } = await api.post('users',{  // api.post(pastaCaminhoUrl,DadosQueSeramEnviados) Faz o envio dos dados para o back end Passando Um 'corpo',body,{}.
      name: clientData.name,
      email: clientData.email,
      password: clientData.password
    }, { validateStatus: () => true }
    )
    if (status ===201 || status ===200) {
      toast.success('Cadastro criado com sucesso')
      } else if (status === 409) {
      toast.error('E-mail ja cadastrado! Faça login para continuar')
      } else {
      throw new Error()
      }
    }catch(err){
      toast.error('Falha no sistema! Tente novamente' )
    }
  }  
  const spanconfirmPassword = useRef()
  const spanpassword = useRef()
  function validate(){
    const alertPassword1 = document.getElementById('validSAmePassword1')
    const alertPassword2 = document.getElementById('validSAmePassword2')
    const inputPassword = document.getElementById('password')
    const inputPasswordConfirm = document.getElementById('ConfirmPassword')
    const size = inputPassword.value.length
    if(inputPasswordConfirm.value != inputPassword.value 
      &&  inputPassword.value.length >= size 
      &&  inputPasswordConfirm.value.length >= size){
      alertPassword1.innerHTML = 'The passaword need be the same'
      alertPassword2.innerHTML = 'The passaword need be the same'
    }else{
      alertPassword1.innerHTML = ''
      alertPassword2.innerHTML = ''
    }
  }
  return (
    <Container>
      <LoginImage>
      <Logo> Santa monica </Logo>
      </LoginImage>
      <ContainerItens>
        <img />
        <h1> Cadastresse </h1>
         <form onSubmit={handleSubmit(HandleonSubmitData)}> {/* handleSubmit Recebe Os dados E Envia Para A dentro da sua prop que é uma funçao, os dados dos campos . */}
          {/* type="email" pelo fato de estar dentro do form é configurado automaticamente assim como o type="password" Isso é do html  caso nao queiramos passamos uma configuraçao no form 'noValidate' para validar somente pelo reactHookForm*/}

          <Label>Name</ Label>
          <Input placeholder="Your Name" type="text" id="name" {...register('name', { required: true })} error={errors.name?.type} />  
          {errors.name && errors.name.type === "required" && <span>name is required</span>}

          <Label>Email</ Label>
          {/*// ...register chama a funçao register e cadastra o campo e ja da um name automaticamente  como se fosse Um 'ref' */}
          {/*Podemos passar validaçoes no segundo parametro de '...register()' */}
          <Input placeholder="Your email" id="email" {...register('email', { required: true })} error={errors.email?.type} />   
          {errors.email && errors.email.type === "required" && <span>Email is required</span>}  {/* Se ouver um erro em : 'errors.email', Ele exibira a mensagem de erro. */}
          <Label>password</ Label>
          <Input placeholder="Your Password" type="password"  id="password" {...register('password', { required: true, minLength: 5 })} error={errors.password?.type}  onChange={validate}
           />   
           {errors.password && errors.password.type === "required" &&  <span>password is required</span>}   {/*errors.NomeDoCampo.message     Para exibir o erro ao usuario*/}
           {errors.password && errors.password.type === "minLength" &&  <span>Your Password could be more than 5 numbers</span>}
           <span id="validSAmePassword1" ></span>
          <Label>Confirm Password</ Label>
          <Input placeholder="Confirm Your Password" id="ConfirmPassword"  type="password"  {...register('ConfirmPassword', { required: true, minLength: '5' })} error={errors.ConfirmPassword?.type}  onChange={validate}
          
            />   
           {errors.ConfirmPassword && errors.ConfirmPassword.type === "required" &&  <span>ConfirmPassword is required</span>} 
           {errors.ConfirmPassword && errors.ConfirmPassword.type === "minLength" &&  <span>Your Password could be more than 5 numbers</span>}
           <span id="validSAmePassword2" ></span>

          <Button type="submit" > Sign Up </ Button>  {/* type="submit"  por estar dentro do formulario vai submeter os dados */}
        </form>
        <SignInLink>
        Já possui conta ? <Link style={{color:'#fff'}} to="/login">SignIn</Link>
        </SignInLink>
      </ ContainerItens>
    </ Container>
  )
}


export default Register