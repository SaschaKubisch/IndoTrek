import React, { useState, useEffect } from 'react';
import './Explore.css';

const Explore = () => {
  const [island, setIsland] = useState('');
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const islands = ['Sumatra', 'Java', 'Bali']; // List of islands

  useEffect(() => {
    // Fetch tours data based on selected island from API or database
    if (island) fetchTours(island);
  }, [island]);

  const fetchTours = async (island) => {
    try {
      // Example API request based on selected island
      const response = await fetch(`API_URL/tours?island=${island}`);
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.log('Error fetching tours:', error);
    }
  };

  return (
    <div className="explore">
      <h1 className="explore-title">Explore Tours</h1>

      {/* Dropdown for island selection */}
      <select onChange={(e) => setIsland(e.target.value)} value={island}>
        <option value="">Select Island</option>
        {islands.map((island, index) => (
          <option key={index} value={island}>
            {island}
          </option>
        ))}
      </select>

      {/* Display tours */}
      {tours.length > 0 ? (
        <div className="tour-list">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="tour-item"
              onClick={() => setSelectedTour(tour)}
            >
              <img src={tour.image} alt={tour.name} />
              <h2 className="tour-name">{tour.name}</h2>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-tours">No tours available at the moment.</p>
      )}

      {/* Display selected tour details */}
      {selectedTour && (
        <div className="tour-detail">
          <h2>{selectedTour.name}</h2>
          <p>{selectedTour.description}</p>
          <p>Days: {selectedTour.days}</p>
          <p>Pickup available: {selectedTour.pickupAvailable ? 'Yes' : 'No'}</p>
          {/* Further options can go here */}
        </div>
      )}
    </div>
  );
};

export default Explore;
