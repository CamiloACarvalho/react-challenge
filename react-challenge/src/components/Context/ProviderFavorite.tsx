import React, { useState, useEffect } from 'react';
import { ContextType, notice } from '../../types/Types';
import ContextFavorite from './ContextFavorite';

type ProviderPros = {
  children: React.ReactNode;
};

function ProviderFavorite({ children }: ProviderPros) {
  const [favorites, setFavorites] = useState<notice[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Função para salvar favoritos no localStorage
  const saveFavoritesToLocalStorage = (favorites: notice[]) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  // Função para carregar favoritos do localStorage ao carregar o componente
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleFavorite = (news: notice) => {
    const verified = favorites.find((favorite) => favorite.id === news.id);
    if (verified === undefined) {
      const updatedFavorites = [...favorites, news];
      setFavorites(updatedFavorites);
      setIsFavorite(true);
      saveFavoritesToLocalStorage(updatedFavorites);
    } else {
      const newFavorites = favorites.filter((favorite) => favorite.id !== news.id);
      setFavorites(newFavorites);
      setIsFavorite(false);
      saveFavoritesToLocalStorage(newFavorites);
    }
  };

  const values: ContextType = {
    favorites,
    isFavorite,
    handleFavorite,
  };

  return (
    <ContextFavorite.Provider value={values}>
      <div className="provider">
        {children}
      </div>
    </ContextFavorite.Provider>
  );
}

export default ProviderFavorite;
