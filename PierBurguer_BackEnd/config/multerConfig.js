// Express nao  consegue importar um arquivo de foto precisamos do multer .

import multer from "multer";
import { v4 } from "uuid";
import { dirname, extname, resolve } from 'path'
import { request } from "http";
// Dentro de um modulo ES voce nao pode usar __Dirname Entao vamos replicar a funcionalidade
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // Replicando funcionalidade do dirname para um modulo
const __dirname = path.dirname(__filename);  // Replicando funcionalidade do dirname para um modulo

export default {
  storage: multer.diskStorage({  // Acho que diskStoraage pega a imagem do servidor e guarda numa pasta 
    destination: resolve(__dirname, '..', 'uploads'), // arquivo destino
    filename: (request, file, callback) => { // file = é o nome do campo que vai mandar o arquivo. callback Vai dar um nome ao arquivo.
     return callback(null, v4() + extname(file.originalname)) // dando nome do aqrquivo que vai ser feito upload. 'extname(file.originalname' = Vai ser o tipo original do arquivo .png ,jpeg etc .  null seria que nao tem erros
    }
  })
}
// No final ele deve enviar para pasta que definimos a imagem que recebemos de outro servidor com Um id proprio como nome do arquivo e logo em seguida .png no final

