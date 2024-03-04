import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import ContextFavorite from '../Context/ContextFavorite';
import { Link } from 'react-router-dom';
import { notice } from '../../types/Types';
import loadGif from '../../image/loading-2874.gif'
import favorite from '../../image/favoritado.png'
import notFavorite from '../../image/desfavoritado.png'
import style from './RecentlyNews.module.css';

function RecentlyNews () {
  // esse useState é para armazenar o estado de carregamento
  const [loading, setLoading] = useState(true);
  // Esse useState é para verificar notícia mais recente gerada pela API
  const [dayNews, setDayNews] = useState<notice[]>([]);

  const {
    favorites,
    handleFavorite,
  } = useContext(ContextFavorite);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await Api();
        setLoading(false);
        setDayNews(newsData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
  
    const hours = Math.floor(diffTime / (1000 * 60 * 60));

    return hours;
  };

  const urlImagem = (wayOfImage: string) => {
    return `https://agenciadenoticias.ibge.gov.br/${wayOfImage}`;
  }
  
  return (
    <div>
      { loading ? (
        <img className="loading" src={ loadGif } alt="loading" />
      ) : (
        <section className="newsOfTheDay">
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
            {dayNews ? (
              dayNews
              .filter((news) => calculateTimeDifference(news.data_publicacao) <= 48)
              .map((news) => (
                <div key={news.id}>
                  <div className={ style.mainNotice }>
                    <img
                      className={style.image}
                      src={ urlImagem(news?.imageUrl) }
                      alt={ news.titulo } 
                    /> 
                    <div className={ style.cardNews }>
                      <div className={ style.topo }>
                        <h2 className={ style['ibm-plex-othersNews'] }>{news.titulo}</h2>
                        <img
                          src={favorites.find((favorite) => favorite.id === news.id) ? favorite : notFavorite}
                          alt={favorites.find((favorite) => favorite.id === news.id) ? "Favoritado" : "Desfavoritado"}
                          className={ style.favoriteImage }
                          onClick={ () => handleFavorite(news) }
                          />
                      </div>
                      <p className={ style['poppins-regular'] }>{news.introducao}</p>
                      <div className={ style.lineEnd }>
                        <p>
                          {`Publicado há
                            ${calculateTimeDifference(news.data_publicacao)} 
                            ${calculateTimeDifference(news.data_publicacao) === 1 ? 'hora' : 'horas'}
                          `}
                        </p>
                        <button className={ style.linkBtn }>
                          <a className={ style['poppins-a'] } href={news.link}>Leia mais</a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : ( 
              <h2>Estamos há 2 dias sem notícia relevante</h2>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default RecentlyNews;