import { generateUserList } from "../mock/generateUserList.js";

export function handleUserCreation(stream) {
    let data = '';
    
    stream.on('data', (chunk) => {
      data += chunk;
    });
  
    stream.on('end', () => {
      const userData = JSON.parse(data);
      
      // Aqui você pode fazer o processamento dos dados do usuário
      // Por exemplo, você pode armazenar os dados em um banco de dados
      
      // Exemplo de resposta bem-sucedida
      stream.respond({
        'content-type': 'application/json',
        ':status': 201
      });
      stream.end(JSON.stringify({ message: 'Usuário criado com sucesso', user: userData }));
    });
  }

  export async function handleUserListing(stream, itemsPerPage = 10, currentPage = 1) {
    const userListGenerator = generateUserList();
  
    // Calcula o índice inicial e final dos itens na página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    stream.respond({
      'content-type': 'application/json',
      ':status': 200
    });
  
    let currentIndex = 0;
  
    for await (const user of userListGenerator) {
      if (currentIndex >= startIndex && currentIndex < endIndex) {
        const userJson = JSON.stringify(user);
        stream.write(userJson);
      }
  
      currentIndex++;
  
      // Verifica se já alcançou o final da página
      if (currentIndex >= endIndex) {
        break;
      }
    }
  
    stream.end();
  }
  