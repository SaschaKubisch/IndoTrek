import React, { useState, useEffect } from 'react';
import { getTripDetails, customizeTrip } from '../../services/trip';

import './CustomizeTrip.css';

const CustomizeTrip = ({ tripId }) => {
  const [tripDetails, setTripDetails] = useState(null);
  const [customizationOptions, setCustomizationOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetchTripDetails();
  }, []);

  const fetchTripDetails = async () => {
    try {
      const details = await getTripDetails(tripId);
      setTripDetails(details);
      // Initialize the selectedOptions state with default values from the trip details
      const initialOptions = {};
      details.customizationOptions.forEach((option) => {
        initialOptions[option.name] = option.default;
      });
      setSelectedOptions(initialOptions);
    } catch (error) {
      console.error('Error fetching trip details:', error);
      // Handle error (display error message, etc.)
    }
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customizeTrip(tripId, selectedOptions);
      // Handle successful customization (display success message, etc.)
    } catch (error) {
      console.error('Error customizing trip:', error);
      // Handle error (display error message, etc.)
    }
  };

  if (!tripDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customize-trip-container">
      <h2>Customize Your Trip</h2>
      <form onSubmit={handleSubmit}>
        {tripDetails.customizationOptions.map((option) => (
          <div className="form-group" key={option.name}>
            <label htmlFor={option.name}>{option.label}</label>
            <select
              id={option.name}
              name={option.name}
              value={selectedOptions[option.name]}
              onChange={handleOptionChange}
            >
              {option.choices.map((choice) => (
                <option value={choice} key={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit">Customize Trip</button>
      </form>
    </div>
  );
};

export default CustomizeTrip;
