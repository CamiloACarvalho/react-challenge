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

  const urlImagem = (wayOfImage: string) => {
    return `https://agenciadenoticias.ibge.gov.br/${wayOfImage}`;
  }

  return (
    <div className="favorites-page">
      <h1>Meus Favoritos</h1>
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
      <section>
        {favorites.map((favorite) => (
          <div key={ favorite.id }>
            { favorite.tipo === 'Release' ? (
              <div className="TypeRelease">
                <h2 className="mainTitle">{favorite.titulo}</h2>
                <p>{favorite.introducao}</p>
                <p>
                  {`Publicado há
                    ${calculateTimeDifference(favorite.data_publicacao)} 
                    ${calculateTimeDifference(favorite.data_publicacao) === 1 ? 'hora' : 'horas'}
                  `}
                </p>
                <button className="link">
                <a href={favorite.link}>Leia mais</a>
                </button>
                <button
                  type="button"
                  className="favoriteButton"
                  onClick={ () => handleFavorite(favorite) }
                >
                { favorites ?
                  <img src={ onHeart } alt="Favoritado" /> :
                  <img src={ offHeart } alt="Desfavoritado" />
                }
                </button>
              </div>
            ) : (
              <div className="TypeNotice">
                <img
                  className={style.image}
                  src={ urlImagem(favorite?.imageUrl) }
                  alt={ favorite.titulo } 
                /> 
                <h2 className="mainTitle">{favorite.titulo}</h2>
                <p>{favorite.introducao}</p>
                <p>
                  {`Publicado há
                    ${calculateTimeDifference(favorite.data_publicacao)} 
                    ${calculateTimeDifference(favorite.data_publicacao) === 1 ? 'hora' : 'horas'}
                  `}
                </p>
                <button className="link">
                  <a href={favorite.link}>Leia mais</a>
                </button>
                <button
                  type="button"
                  className="favoriteButton"
                  onClick={ () => handleFavorite(favorite) }
                >
                  { favorites ?
                    <img src={ onHeart } alt="Favoritado" /> :
                    <img src={ offHeart } alt="Desfavoritado" />
                  }
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default FavoritesPage;
