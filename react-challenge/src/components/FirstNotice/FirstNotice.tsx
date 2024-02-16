import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
import { notice } from '../../types/Types';
import loadGif from '../../image/loading-2874.gif'

function FirstNotice () {
  // A renderização não estava reconhecendo, dessa forma tive que tipar o useState
  const [noticias, setNoticias] = useState<notice[]>([]);
  const [loading, setLoading] = useState(true);

  // Chamada da API para atualizar quando a página for carregada
  useEffect(() => {
    Api().then((noticias) => {
      setNoticias(noticias);
    });
    setLoading(false);
  }, []);

  return (
    <div>
      { loading ? <img src={loadGif} alt="loading" /> :
        <>
          <h2>Notícias Principais:</h2>
          <div>
            { noticias.map((item, index) => (
              <li key={index}>{item.titulo}</li>
            ))}
          </div>
        </>
      }
    </div>
  );
}

export default FirstNotice;