import { notice } from "../types/Types";
// Criei uma função para acessar a os itens da API, que são as informações das notícias.
async function Api() {
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
    const data = await response.json();
    // Processa os dados e adiciona a URL da imagem a cada objeto de notícia
    const itemsWithImages = data.items.map((item: notice) => {
      const imagensObj = JSON.parse(item.imagens);
      const imageUrl = imagensObj.image_fulltext;
      return { ...item, imageUrl };
    });
    return itemsWithImages;
  } catch (error) {
    // Caso ocorra algum erro, retorno um array vazio
    console.error('Erro ao acessar a API:', error);
    return [];
  }
}

export default Api;
