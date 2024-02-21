import { createContext } from 'react';
import { ContextType } from '../../types/Types';

// Criando o contexto para armazenar as informações das notícias favoritas.
// E repassar para os componentes que precisam dessas informações.

// Devia ter feito isso para outras informações, como release,notícias...

const ContextFavorite = createContext({} as ContextType);

export default ContextFavorite
