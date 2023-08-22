import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import SearchResult from '@/components/SearchResult';

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

    const handleSearch = useCallback(async () => {
        if (!searchQuery) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(
                `/api/search?query=${encodeURIComponent(searchQuery)}`
            );
            const results = await response.json();
            setSearchResults(results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }, [searchQuery]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    return (
        <div className="py-5 px-4">
            <h1 className="text-red-500 text-2xl font-bold mb-4">Search Results</h1>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <div className="mt-4">
                {searchResults.length === 0 ? (
                    <p className="text-red-500">Uh-oh! No results found.</p>
                ) : (
                    searchResults.map((result) => (
                        // <MovieList title="Results" data={result} />
                        <SearchResult key={result.id} data={result} />
                    ))
                )}
            </div>
            <MovieList title="Trending Now" data={movies} />
            <MovieList title="My List" data={favorites} />
        </div>
    );
};

export default SearchPage;
