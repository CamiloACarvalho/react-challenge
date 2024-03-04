import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { notice } from '../../types/Types';
import loadGif from '../../image/loading-2874.gif'
import favorite from '../../image/favoritado.png'
import notFavorite from '../../image/desfavoritado.png'
import style from './News.module.css'
import ContextFavorite from '../Context/ContextFavorite';


function News () {
  // esse useState é para armazenar o estado de carregamento
  const [loading, setLoading] = useState(true);
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
      return `Published ${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `Published ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `Published ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };

  const urlImagem = (wayOfImage: string) => {
    return `https://agenciadenoticias.ibge.gov.br/${wayOfImage}`;
  }

  return (
    <div>
      { loading ? (
        <img className={ style.loading } src={ loadGif } alt="loading" />
      ) : (
        <section>
          <div className={ style.links }>
            <Link className={ style.subLink } to="/mostRecently">Mais recentes</Link>
            {' '}
            <Link className={ style.subLink } to="/release">Release</Link>
            {' '}
            <Link className={ style.subLink } to="/news">Notícia</Link>
            {' '}
            <Link className={ style.subLink } to="/favorite">Favoritas</Link>
            {' '}
          </div>
          <div className={ style.lastBreakingNews }>
          {allNews
            // Filtra somente as notícias do tipo notícia
            .filter((news) => news.tipo === 'Notícia')
            .map((news) => (
              <div key={ news.id }>
                <div className={ style.mainNotice }>
                  <img
                    className={ style.image }
                    src={ urlImagem(news?.imageUrl) }
                    alt={ news.titulo }
                  />
                  <div className={ style.cardNews }>
                    <div className={ style.topo }>
                      <h2 className={ style['ibm-plex-othersNews'] }>{ news.titulo }</h2>
                      <img
                        src={favorites.find((favorite) => favorite.id === news.id) ? favorite : notFavorite}
                        alt={favorites.find((favorite) => favorite.id === news.id) ? "Favoritado" : "Desfavoritado"}
                        className={ style.favoriteImage }
                        onClick={ () => handleFavorite(news) }
                      />
                    </div>                  
                    <p className={ style['poppins-regular'] }>{ news.introducao }</p>
                    <div className={ style.lineEnd }>
                      <p>{ calculateTimeDifference(news.data_publicacao) }</p>
                      <button
                        className={ style.linkBtn }
                      >
                        <a className={ style['poppins-a'] } href={ news.link }>Leia mais</a>
                      </button>
                    </div>
                  </div>  
                </div>
              </div>
            ))}
          </div>
          <div className={ style.endPage }>
            <button
              className={ style.loadMore }
              type="button"
              onClick={ handleLoadMore }
            >
              MAIS NOTÍCIAS
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default News;