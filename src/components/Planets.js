import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async ({ pageParam = 1 }) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${pageParam}`);

  return res.json();
};

function Planets() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentData, setCurrentData] = useState(null);
  const {
    status,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery('planets', fetchPlanets, {
    staleTime: 1000000,
    // cacheTime: 10,
    getNextPageParam: (lastPage) => {
      const { next } = lastPage;

      return next && next.slice(next.lastIndexOf('=') + 1);
    },
    // getPreviousPageParam: (firstPage) => {
    //   const { previous } = firstPage;
    //   console.log('🚀 ~ file: Planets.js ~ line 31 ~ Planets ~ previous', previous);
    // },
    onSuccess: ({ pages }) => {
      setCurrentData(pages[currentPage].results);
    },
  });

  return (
    <div className="Planets">
      <h2>Planets</h2>
      <button
        disabled={ !hasNextPage }
        onClick={ () => {
          if (hasNextPage) {
            fetchNextPage();
            setCurrentPage(currentPage + 1);
          }
        } }
      >
        Next
      </button>
      { status === 'error' && (
        <div>Error fetching data</div>
      ) }
      { status === 'loading' && (
        <div>Loading data...</div>
      ) }
      { status === 'success' && currentData && (
        <div>
          { currentData.map(planet => <Planet key={ planet.name } planet={ planet } />) }
        </div>
      ) }
    </div>
  );
}

export default Planets;
