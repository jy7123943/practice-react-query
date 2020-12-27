import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Planets from './components/Planets';
import People from './components/People';

function App() {
  const [page, setPage] = useState('planets');

  return (
    <div className="App">
      <h1>Star Wars Info</h1>
      <NavBar setPage={ setPage } />
      <div className="content">
        { page === 'planets' ? <Planets /> : <People /> }
      </div>
    </div>
  );
}

export default App;
