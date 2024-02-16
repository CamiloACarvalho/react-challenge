// Criei uma função para acessar a os itens da API, que são as informações das notícias.
async function Api() {
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
    const data = await response.json();
    // Aqui estou retornando apenas os itens da API
    return data.items;
  } catch (error) {
    // Caso ocorra algum erro, retorno um array vazio
    console.error('Erro ao acessar a API:', error);
    return [];
  }
}

export default Api;
