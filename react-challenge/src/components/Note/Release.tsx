import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import ContextFavorite from '../Context/ContextFavorite';
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
  // useState para armazenar o número de notícias carregadas
  const [loadedNews, setLoadedNews] = useState();

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
          <div className={ style.allNews }>
          {allNews
            // Filtra somente as notícias do tipo release
            .filter((news) => news.tipo === 'Release')
            .map((news) => (
              <div key={ news.id }>
                <div className={ style.everyNews }>
                  <h2 className={ style['ibm-plex-othersNews'] }>{ news.titulo }</h2>
                  <p className={ style['nunito-sans'] }>{ news.introducao }</p>
                  <p className={ style.time }>{ calculateTimeDifference(news.data_publicacao) }</p>
                  <div className={ style.lineEnd } >
                    <button
                      className={ style.linkBtn }
                    >
                      <a className={ style['poppins-a'] } href={ news.link }>Leia mais</a>
                    </button>
                    <img
                        src={favorites.find((favorite) => favorite.id === news.id) ? favorite : notFavorite}
                        alt={favorites.find((favorite) => favorite.id === news.id) ? "Favoritado" : "Desfavoritado"}
                        className={ style.favoriteImage }
                        onClick={ () => handleFavorite(news) }
                      />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Release;