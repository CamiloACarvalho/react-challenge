import { ContextType } from '../../types/Types';
import ContextFavorite from './ContextFavorite';

type ProviderPros = {
  children: React.ReactNode;
};


function ProviderFavorite ({ children }: ProviderPros) {

  const values: ContextType = {

  };

  return (
    <ContextFavorite.Provider value={ values }>
      <div className="provider">
        {children}
      </div>
    </ContextFavorite.Provider>
  );
}

export default ProviderFavorite;
