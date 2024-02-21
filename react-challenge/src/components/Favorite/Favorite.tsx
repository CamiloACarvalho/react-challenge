import React, { useContext } from 'react';
import ContextFavorite from '../Context/ContextFavorite';
import onHeart from '../../image/favoritado.png'
import offHeart from '../../image/desfavoritado.png'

const FavoritesPage: React.FC = () => {
  // Use o contexto para acessar a lista de favoritos
  const {
    favorites,
    isFavorite,
    handleFavorite,
  } = useContext(ContextFavorite);

  return (
    <div className="favorites-page">
      <h1>Meus Favoritos</h1>
      <ul>
        {favorites.map((favorite) => (
          <div className="TypeRelease">
          <h2 className="mainTitle">{ favorite.titulo }</h2>
          <p>{ favorite.introducao }</p>
          <button
            className="link"
          >
            <a href={ favorite.link }>Leia mais</a>
          </button>
          <button
            type="button"
            className="favoriteButton"
            onClick={ () => handleFavorite(favorite) }
          >
            { isFavorite ?
              <img src={ onHeart } alt="Favoritado" /> :
              <img src={ offHeart } alt="Desfavoritado" />
            }
          </button>
        </div>
          
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
