import React from "react";
import api from 'services/api';

import "./styles.css";
import { useEffect, useState } from 'react';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response =>
      {
        setRepositories(response.data);
      })
  },[]);

  
  async function handleAddRepository() {
    const post = await api.post('repositories', {
      title: 'Projeto GoStack v4.0',
      url: 'www.fakegit.com',
      like: 0
    });
    const repository = post.data;
    setRepositories([...repositories, repository]);
  }
  
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const updateRepositories = repositories.filter((repository) => repository.id !== id);
    
    setRepositories(updateRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositories => <li key={repositories.id}>
          <h1>{repositories.title}</h1>
          <button onClick={() => handleRemoveRepository(repositories.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
