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
    data,
    status,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery('planets', fetchPlanets, {
    staleTime: 1000000,
    // cacheTime: 10,
    getNextPageParam: (lastPage) => {
      const { next } = lastPage;

      return next && next.slice(next.lastIndexOf('=') + 1);
    },
    getPreviousPageParam: (firstPage) => {
      const { previous } = firstPage;

      return previous && previous.slice(previous.lastIndexOf('=') + 1);
    },
    onSuccess: ({ pages }) => {
      setCurrentData(pages[currentPage].results);
    },
    // getFetchMore: (lastGroup, allGroup) => {
    // }
  });
  console.log('🚀 ~ file: Planets.js ~ line 22 ~ Planets ~ status', status);
  console.log('data', data);

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
      <button
        disabled={ !hasPreviousPage }
        onClick={ () => {
          if (hasPreviousPage) {
            fetchPreviousPage();
            setCurrentPage(currentPage - 1);
          }
        } }
      >
        Prev
      </button>
      { status === 'error' && (
        <div>Error fetching data</div>
      ) }
      { status === 'loading' && (
        <div>Loading data...</div>
      ) }
      { status === 'success' && (
        <div>
          { currentData.map(planet => <Planet key={ planet.name } planet={ planet } />) }
        </div>
      ) }
    </div>
  );
}

export default Planets;
