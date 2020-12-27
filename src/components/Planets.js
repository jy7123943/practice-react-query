import React from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async () => {
  const res = await fetch('https://swapi.dev/api/planets/');

  return res.json();
};

function Planets() {
  const { data, status } = useQuery('planets', fetchPlanets, {
    staleTime: 1000,
    // cacheTime: 10,
    onSuccess: () => console.log('data fetched with no problem')
  });

  return (
    <div className="Planets">
      <h2>Planets</h2>
      { status === 'error' && (
        <div>Error fetching data</div>
      ) }
      { status === 'loading' && (
        <div>Loading data...</div>
      ) }
      { status === 'success' && (
        <div>
          { data.results.map(planet => <Planet key={ planet.name } planet={ planet } />) }
        </div>
      ) }
    </div>
  );
}

export default Planets;
