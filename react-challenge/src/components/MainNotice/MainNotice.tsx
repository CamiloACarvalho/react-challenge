import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
import { notice } from '../../types/Types';

function MainNotice () {
  // A renderização não estava reconhecendo, dessa forma tive que tipar o useState
  const [noticias, setNoticias] = useState<notice[]>([]);

  // Chamada da API para atualizar quando a página for carregada
  useEffect(() => {
    Api().then((noticias) => {
      setNoticias(noticias);
    });
  }, []);

  return (
    <div>
      <h2>Notícias Principais:</h2>
      {noticias.map((item, index) => (
          <li key={index}>{item.titulo}</li>
      ))}
    </div>
  );
}

export default MainNotice;