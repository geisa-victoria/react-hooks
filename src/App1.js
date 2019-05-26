import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);
  // primeiro parâmetro é uma função: pensar como se fosse o corpo das funções
  // de ComponentDidMount, ComponentDidUpdate, etc
  // O segundo parâmetro é em quais circunstâncias aquela função deveria ser executada,
  // e essas circunstâncias não passam de variáveis
  // por exemplo, se passar o repositories como a circunstância, esse use effect só será
  // executado quando o valor do repositories
  // mudar

  // para fazer uso do componentDidMount, é só usar outro useEffect e não passar nada como o segundo parâmetro, pois assim ele irá
  // executar apenas uma vez, quando o componente estiver sendo montado, já que ele não irá precisar de nenhum tipo de circunstância
  // para ser atualizado e por isso, nunca será executado novamente.

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/diego3g/repos');
    const data = await response.json();
    setRepositories(data);
  }, []);

  // garante que esse useEffect só seja utilizado quando a propriedade repositories tiver o seu estado alterado
  useEffect(() => {
    const filteredRepos = repositories.filter(repo => repo.favorite);

    document.title = `Você tem ${filteredRepos.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => (repo.id === id ? { ...repo, favorite: !repo.favorite } : repo));

    setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span> (Favorito) </span>}
          <button type="button" onClick={() => handleFavorite(repo.id)}>
            Favoritar
          </button>
        </li>
      ))}
    </ul>
  );
}
