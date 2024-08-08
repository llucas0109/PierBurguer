import React from 'react';
import ReactDOM from 'react-dom/client';
// 'createBrowserRouter' Atualiza a rota. 
import {BrowserRouter as Router} from 'react-router-dom'; // DeveMos Envelopar O arquivo de rotas Com browser para funcionar as rotas.
import RouterPag from './router/router.js';
import Global from  './styles/globalStyles.js';  // O nome Deve Ter A primeira Letra em maiuculo quanto é envolvido com styled 
import { ToastContainer } from 'react-toastify'; // estilo de toast
import  AppProvider  from './hooks/index.js';
import { register } from 'swiper/element/bundle'; //Estrutura base do swiper carrousel
import 'swiper/css'; //Estrutura base do swiper carrousel
import 'swiper/css/navigation'; //Etrutura base do swiper carrousel
import 'swiper/css/pagination'; //Estrutura base do swiper carrousel
import 'swiper/css/scrollbar'; //Estrutura base do swiper carrousel
register(); //Estrutura base do swiper carrousel  Apos colocar a estrutura base podemos importar em qualquer elemento e fazer um carrousel

// createRoot Cria a renderizaçao Ele recebe uma tag como parametro.
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <Global />
    <ToastContainer />
    <AppProvider> {/*Envelopando os modulos que poderam usar os dados Do context*/}
    <Router>
      <RouterPag />
    </Router>
    </AppProvider>
  </React.StrictMode>
);

