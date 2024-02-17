import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
import { notice } from '../../types/Types';
import loadGif from '../../image/loading-2874.gif'

function BreakNews () {
  // esse useState é para armazenar a notícia mais recente
  const [news, setNews] = useState<notice[]>([]);
  // esse useState é para armazenar o estado de carregamento
  const [loading, setLoading] = useState(true);
  // Esse useState é para verificar notícia mais recente gerada pela API
  const [lastBreakingNews, setLastBreakingNews] = useState<notice | null>(null);

  // Chamada da API para atualizar quando a página for carregada
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await Api();
        setNews(newsData);
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

  return (
    <div>
      {loading ? (
        <img className="loading" src={loadGif} alt="loading" />
      ) : (
        <>
          <h3 className="subTitle">Notícia de última hora:</h3>
          <div>
            {lastBreakingNews && (
              <div>
                <img src={lastBreakingNews?.imageUrl} alt={lastBreakingNews.titulo} /> 
                <h2 className="mainTitle">{lastBreakingNews.titulo}</h2>
                <p>{lastBreakingNews.introducao}</p>
                <a href={lastBreakingNews.link}>Leia mais</a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default BreakNews;