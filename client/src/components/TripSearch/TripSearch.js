import React, { useState, useEffect } from 'react';
import { searchTrips } from '../../services/trip';

import './TripSearch.css';

const TripSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const performSearch = async () => {
    try {
      const results = await searchTrips(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error performing trip search:', error);
      // Handle error (display error message, etc.)
    }
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="trip-search-container">
      <h2>Find Your Perfect Trip</h2>
      <input
        type="text"
        placeholder="Search by location, duration, activity type..."
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      <div className="search-results">
        {searchResults.map((trip) => (
          <div className="search-result" key={trip.id}>
            <h3>{trip.name}</h3>
            <p>{trip.description}</p>
            {/* Render other trip details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripSearch;
