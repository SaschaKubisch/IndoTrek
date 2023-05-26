import React, { useState, useEffect } from 'react';
import './Explore.css';

const Explore = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // Fetch tours data from API or database
    // Example: fetchTours();
  }, []);

  // Example fetchTours function
  // const fetchTours = async () => {
  //   try {
  //     const response = await fetch('API_URL');
  //     const data = await response.json();
  //     setTours(data);
  //   } catch (error) {
  //     console.log('Error fetching tours:', error);
  //   }
  // };

  return (
    <div className="explore">
      <h1 className="explore-title">Explore Tours</h1>
      {tours.length > 0 ? (
        <ul className="tour-list">
          {tours.map((tour) => (
            <li key={tour.id} className="tour-item">
              <h2 className="tour-name">{tour.name}</h2>
              <p className="tour-description">{tour.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tours">No tours available at the moment.</p>
      )}
    </div>
  );
};

export default Explore;
