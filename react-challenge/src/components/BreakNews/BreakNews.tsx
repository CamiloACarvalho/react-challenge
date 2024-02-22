import Api from '../../utils/Api';
import { useContext, useEffect, useState } from 'react';
import ContextFavorite from '../Context/ContextFavorite';
import { Link } from 'react-router-dom';
import { notice } from '../../types/Types';
import loadGif from '../../image/loading-2874.gif'
import favorite from '../../image/favoritado.png'
import notFavorite from '../../image/desfavoritado.png'
import style from './BreakNews.module.css'

function BreakNews () {
  // esse useState é para armazenar o estado de carregamento
  const [loading, setLoading] = useState(true);
  // Esse useState é para verificar notícia mais recente gerada pela API
  const [lastBreakingNews, setLastBreakingNews] = useState<notice | null>(null);
  // Esse useState é para rendererizar todas as notícias
  const [allNews, setAllNews] = useState<notice[]>([]);
  // useState para armazenar o número de notícias carregadas
  const [loadedNews, setLoadedNews] = useState(6);

  const {
    favorites,
    handleFavorite,
  } = useContext(ContextFavorite);

  // Chamada da API para atualizar quando a página for carregada
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await Api();
        setLoading(false);
        setLastBreakingNews(findMostRecent(newsData));
        setAllNews(newsData.slice(0, loadedNews));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [loadedNews]);

  // Função para carregar mais notícias
  const handleLoadMore = () => {
    setLoadedNews(loadedNews + 6);
  };

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

  const calculateTimeDifference = (publicationDate: string) => {
    const [dayMonthYear, hourMinute] = publicationDate.split(' ');
    const [day, month, year] = dayMonthYear.split('/');
    const [hour, minute] = hourMinute.split(':');

    const today = new Date();
  
    // Validando os valores antes de criar a data
    const parsedDay = parseInt(day);
    // Meses em JavaScript começam de zero
    const parsedMonth = parseInt(month) - 1; 
    const parsedYear = parseInt(year);
    const parsedHour = parseInt(hour);
    const parsedMinute = parseInt(minute);
  
    datePublication = new Date(parsedYear, parsedMonth, parsedDay, parsedHour, parsedMinute).getTime();

    const diffTime = today.getTime() - datePublication;

    const minutes = Math.floor(diffTime / (1000 * 60));
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `Publicado há ${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
    } else if (hours > 0) {
      return `Publicado há ${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
    } else {
      return `Publicado há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
    }
  };

  const urlImagem = (wayOfImage: string) => {
    return `https://agenciadenoticias.ibge.gov.br/${wayOfImage}`;
  }
  
  return (
    <div>
      { loading ? (
        <img className="loading" src={ loadGif } alt="loading" />
      ) : (
        <section>
          <div className={ style.lastBreakingNews }>
            { lastBreakingNews && (
              <div className={ style.mainNotice }>
                <img
                  className={ style.image }
                  src={ urlImagem(lastBreakingNews?.imageUrl) }
                  alt={ lastBreakingNews.titulo } 
                /> 
                <div className={ style.cardNews }>
                  <h3 className={ style['poppins-semibold']  }>Notícia mais recente</h3>
                  <img
                    src={favorites.find((favorite) => favorite.id === lastBreakingNews.id) ? favorite : notFavorite}
                    alt={favorites.find((favorite) => favorite.id === lastBreakingNews.id) ? "Favoritado" : "Desfavoritado"}
                    className={ style.favoriteImage }
                    onClick={ () => handleFavorite(lastBreakingNews) }
                  />
                  <h2 className={ style['ibm-plex'] }>{ lastBreakingNews.titulo }</h2>
                  <p className={ style['poppins-regular'] }>{ lastBreakingNews.introducao }</p>
                  <button
                    className={ style.linkBtn }
                  >
                    <a className={ style['poppins-a'] } href={ lastBreakingNews.link }>Leia a notícia aqui</a>
                  </button>
                  <p>{ calculateTimeDifference(lastBreakingNews.data_publicacao) }</p>
                </div>
              </div>
            )}
          </div>
          <div className="links">
            <Link to="/mostRecently">Mais recentes</Link>
            {' '}
            <Link to="/release">Release</Link>
            {' '}
            <Link to="/news">Notícia</Link>
            {' '}
            <Link to="/favorite">Favoritas</Link>
            {' '}
          </div>
          <div className="allNews">
          {allNews
            // Filtra as notícias, removendo a última notícia mais recente da lista
            .filter((news) => news.id !== lastBreakingNews?.id)
            // renderiza as outras notícias (menos recentes)
            .map((news) => (
              <div key={ news.id }>
                <div className="TypeRelease">
                  <h2 className="mainTitle">{ news.titulo }</h2>
                  <p>{ news.introducao }</p>
                  <p>{ calculateTimeDifference(news.data_publicacao) }</p>
                  <button
                    className="link"
                  >
                    <a href={ news.link }>Leia mais</a>
                  </button>
                  <img
                    src={favorites.find((favorite) => favorite.id === news.id) ? favorite : notFavorite}
                    alt={favorites.find((favorite) => favorite.id === news.id) ? "Favoritado" : "Desfavoritado"}
                    className={ style.favoriteImage }
                    onClick={ () => handleFavorite(news) }
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="loadMore"
            type="button"
            onClick={ handleLoadMore }
          >
            Carregar mais
          </button>
        </section>
      )}
    </div>
  );
}

export default BreakNews;