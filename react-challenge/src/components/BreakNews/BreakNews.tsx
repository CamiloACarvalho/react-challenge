import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
import { notice } from '../../types/Types';
import loadGif from '../../image/loading-2874.gif'

function BreakNews () {
  // esse useState é para armazenar o estado de carregamento
  const [loading, setLoading] = useState(true);
  // Esse useState é para verificar notícia mais recente gerada pela API
  const [lastBreakingNews, setLastBreakingNews] = useState<notice | null>(null);
  // Armanezar a data atual
  const today = useState(new Date());

  // Chamada da API para atualizar quando a página for carregada
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await Api();
        setLoading(false);
        setLastBreakingNews(findMostRecent(newsData)); 
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para encontrar a notícia mais recente
  const findMostRecent = (newsData: notice[]): notice | null => {
    if (newsData.length === 0) return null;

    let mostRecent = newsData[0];
    for (let i = 1; i < newsData.length; i++) {
      const current = new Date(newsData[i].data_publicacao);
      const recent = new Date(mostRecent.data_publicacao);
      if (current > recent) {
        mostRecent = newsData[i];
      }
    }
    return mostRecent;
  };

  let datePublication: number | null = null;

  if (lastBreakingNews?.data_publicacao) {
    datePublication = Date.parse(lastBreakingNews.data_publicacao);
  }

  // Diferença entre a data atual e a data de publicação da notícia
  const difTime = datePublication ? today[0].getTime() - datePublication : 0;

  // Função para formatar o tempo de forma amigável
  function functionTime(difTime: number) {
    const minutos = Math.floor(difTime / (1000 * 60));
    const hours = Math.floor(difTime / (1000 * 60 * 60));
    const days = Math.floor(difTime / (1000 * 60 * 60 * 24));

    if (days > 0) {
        return `Publicado há ${days} ${days === 1 ? 'dia' : 'dias'}`;
    } else if (hours > 0) {
        return `Publicado há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else {
        return `Publicado há ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
    }
  }

  const tempoFormatado = functionTime(difTime);

  return (
    <div>
      { loading ? (
        <img className="loading" src={ loadGif } alt="loading" />
      ) : (
        <>
          <h3 className="subTitle">Notícia de última hora:</h3>
          <div>
            { lastBreakingNews && (
              <div>
                <img src={ lastBreakingNews.imageUrl } alt={ lastBreakingNews.titulo } /> 
                <h2 className="mainTitle">{ lastBreakingNews.titulo }</h2>
                <p>{ lastBreakingNews.introducao }</p>
                <button
                  className="link"
                >
                  <a href={ lastBreakingNews.link }>Leia mais</a>
                </button>
                <p>{ tempoFormatado }</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default BreakNews;