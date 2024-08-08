
import App from "./Src/app.js";
import hiau from "./Delete.js";
//const { App } = require('./Src/app.js'); 
const port = 3001
const AppInstanciado = App ;
const apl = AppInstanciado.app // Pega 'this.app' do App() 
console.log('index1');
apl.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
hiau(false) // or true
//  "type":"module",   precisa ser usado no pack.json
// 'npx sequelize db:create' Cria  um banco de dados de acordo com o nome dado nas config de acesso
// docker run --name some-postgres -e POSTGRES_PASSWORD=9981 -p 5432:5432 -d postgres  Para criar um conteiner
// docker ps mostra os conteiners em pe
// docker ps -a   mostra os conteiners ativos e pausados
// 'docker stop nameFromMyContainer'  para o conteiner
//' docker start nameFromMyContainer'  da um start no conteiner