import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTripDetails } from '../../services/trip';

import './TripDetails.css';

const TripDetails = () => {
  const { tripId } = useParams();
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    fetchTripDetails();
  }, []);

  const fetchTripDetails = async () => {
    try {
      const details = await getTripDetails(tripId);
      setTripDetails(details);
    } catch (error) {
      console.error('Error fetching trip details:', error);
      // Handle error (display error message, redirect, etc.)
    }
  };

  if (!tripDetails) {
    return <div>Loading trip details...</div>;
  }

  return (
    <div className="trip-details-container">
      <h2>{tripDetails.name}</h2>
      <p>{tripDetails.description}</p>
      {/* Render other trip details */}
    </div>
  );
};

export default TripDetails;
