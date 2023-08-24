import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import SearchResult from '@/components/SearchResult';
import Navbar from '@/components/Navbar';
import useDebounce from '@/hooks/useDebounce'; 

const SearchPage = () => {
  const {
    data: movies = []
  } = useMovieList();
  const {
    data: favorites = []
  } = useFavorites();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MovieInterface[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearch = useCallback(async () => {
    if (!debouncedSearchQuery) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(debouncedSearchQuery)}`
      );
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <>
      <Navbar />
      <div className='w-full p-10 relative py-20'>
        <h1 className="text-red-500 text-2xl font-bold">Search Netflix</h1>
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mt-4 border p-1 rounded"
        />
        <div className='grid grid-cols-3 gap-2 '>
          {searchResults.length === 0 ? (
            <p className="text-red-500 mt-1">Uh-oh! No results found.</p>
          ) : (
            searchResults.map((result) => (
              <SearchResult key={result.id} data={result} />
            ))
          )}  
        </div>
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
};

export default SearchPage;
