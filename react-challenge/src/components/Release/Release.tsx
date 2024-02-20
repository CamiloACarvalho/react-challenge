import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notice } from '../../types/Types';
import loadGif from '../../image/loading-2874.gif'
import favorite from '../../image/favoritado.png'
import notFavorite from '../../image/desfavoritado.png'
import style from './Release.module.css'


function Release () {
  // esse useState é para armazenar o estado de carregamento
  const [loading, setLoading] = useState(true);
  // Esse useState é para rendererizar todas as notícias
  const [allNews, setAllNews] = useState<notice[]>([]);
  // Armanezar a data atual
  const [today, setToday] = useState(new Date());
  // Salvar a notícia favorita
  const [isfavorite, setIsFavorite] = useState(false);
  // useState para armazenar o número de notícias carregadas
  const [loadedNews, setLoadedNews] = useState(6);

  // Chamada da API para atualizar quando a página for carregada
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await Api();
        setLoading(false);
        setAllNews(newsData);
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

  let datePublication: number | null = null;

  const calculateTimeDifference = (publicationDate: string) => {
    const [dayMonthYear, hourMinute] = publicationDate.split(' ');
    const [day, month, year] = dayMonthYear.split('/');
    const [hour, minute] = hourMinute.split(':');
  
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
      return `Published ${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `Published ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `Published ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };

  // const urlImagem = (wayOfImage: string) => {
  //   return `https://agenciadenoticias.ibge.gov.br/${wayOfImage}`;
  // }

  return (
    <div>
      { loading ? (
        <img className="loading" src={ loadGif } alt="loading" />
      ) : (
        <section>
          <div className="links">
            <Link to="/mostRecentely">Mais recentes</Link>
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
            // Filtra somente as notícias do tipo release
            .filter((news) => news.tipo === 'Release')
            .map((news) => (
              <div key={ news.id }>
                {/* <img
                  className={ style.image }
                  src={ urlImagem(news?.imageUrl) }
                  alt={ news.titulo }
                /> */}
                <h2 className="mainTitle">{ news.titulo }</h2>
                <p>{ news.introducao }</p>
                <p>{ calculateTimeDifference(news.data_publicacao) }</p>
                <button
                  className="link"
                >
                  <a href={ news.link }>Leia mais</a>
                </button>
                <button
                  type="button"
                  className="favoriteButton"
                  onClick={() => setIsFavorite(!isfavorite)}
                >
                  { isfavorite ?
                    <img src={ favorite } alt="Favoritado" /> :
                    <img src={ notFavorite } alt="Desfavoritado" />
                  }
                </button>
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

export default Release;