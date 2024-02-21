import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
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
  // Salvar a notícia favorita
  const [isfavorite, setIsFavorite] = useState(false);

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
          <div className="links">
            <Link to="/mostRecently">Mais recentes</Link>
            {' '}
            <Link to="/release">Release</Link>
            {' '}
            <Link to="/news">Notícia</Link>
            {' '}
            <Link to="/favorite">Favoritas</Link>
            {' '}+
          </div>
          <div className="recentlyNews">
            {dayNews ? (
              dayNews
              .filter((news) => calculateTimeDifference(news.data_publicacao) <= 48)
              .map((news) => (
                <div key={news.id}>
                  { news.tipo === 'release' ? (
                    <div className="TypeRelease">
                      <h2 className="mainTitle">{news.titulo}</h2>
                      <p>{news.introducao}</p>
                      <p>
                        {`Publicado há
                          ${calculateTimeDifference(news.data_publicacao)} 
                          ${calculateTimeDifference(news.data_publicacao) === 1 ? 'hora' : 'horas'}
                        `}
                      </p>
                      <button className="link">
                        <a href={news.link}>Leia mais</a>
                      </button>
                      <button
                        type="button"
                        className="favoriteButton"
                        onClick={() => setIsFavorite(!isfavorite)}
                      >
                        {isfavorite ? (
                          <img src={favorite} alt="Favoritado" />
                        ) : (
                          <img src={notFavorite} alt="Desfavoritado" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="TypeNotice">
                      <img
                        className={style.image}
                        src={ urlImagem(news?.imageUrl) }
                        alt={ news.titulo } 
                      /> 
                      <h2 className="mainTitle">{news.titulo}</h2>
                      <p>{news.introducao}</p>
                      <p>
                        {`Publicado há
                          ${calculateTimeDifference(news.data_publicacao)} 
                          ${calculateTimeDifference(news.data_publicacao) === 1 ? 'hora' : 'horas'}
                        `}
                      </p>
                      <button className="link">
                        <a href={news.link}>Leia mais</a>
                      </button>
                      <button
                        type="button"
                        className="favoriteButton"
                        onClick={() => setIsFavorite(!isfavorite)}
                      >
                        {isfavorite ? (
                          <img src={favorite} alt="Favoritado" />
                        ) : (
                          <img src={notFavorite} alt="Desfavoritado" />
                        )}
                      </button>
                    </div>
                  )}
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