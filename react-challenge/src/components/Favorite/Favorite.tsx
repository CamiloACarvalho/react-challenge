import React, { useContext } from 'react';
import ContextFavorite from '../Context/ContextFavorite';
import { Link } from 'react-router-dom';
import onHeart from '../../image/favoritado.png'
import offHeart from '../../image/desfavoritado.png'
import style from './Favorite.module.css'

const FavoritesPage: React.FC = () => {
  const {
    favorites,
    handleFavorite,
  } = useContext(ContextFavorite);

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

  return (
    <div className="favorites-page">
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
      <section className={ style.allNews }>
        {favorites.map((favorite) => (
          <div key={ favorite.id }>
            <div className={ style.everyNews }>
              <h2 className={ style['ibm-plex-othersNews'] }>{favorite.titulo}</h2>
              <p className={ style['nunito-sans'] }>{favorite.introducao}</p>
              <p className={ style.time }>
                {`Publicado há
                  ${calculateTimeDifference(favorite.data_publicacao)} 
                  ${calculateTimeDifference(favorite.data_publicacao) === 1 ? 'hora' : 'horas'}
                `}
              </p>
              <div className={ style.lineEnd } >
                <button className={ style.linkBtn }>
                  <a className={ style['poppins-a'] } href={favorite.link}>Leia mais</a>
                </button>
                <img
                  src={favorites.find((fav) => fav.id === favorite.id) ? onHeart : offHeart}
                  alt={favorites.find((fav) => fav.id === favorite.id) ? "Favoritado" : "Desfavoritado"}
                  onClick={() => handleFavorite(favorite)}
                  className={style.favoriteImage}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FavoritesPage;
