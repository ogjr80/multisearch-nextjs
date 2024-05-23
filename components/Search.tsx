'use client';

import React, { useState, useEffect } from 'react';

const SearchComponent = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [distances, setDistances] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    fetch('/volunteerLocations.json')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    fetch('/volunteerData.json')
      .then(response => response.json())
      .then(data => {
        const locationData = data[location];
        setDistances(locationData.distances);
        setTypes(locationData.opportunities.map(opportunity => opportunity.type));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDistanceChange = (e) => {
    setSelectedDistance(e.target.value);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    fetch('/volunteerData.json')
      .then(response => response.json())
      .then(data => {
        const locationData = data[selectedLocation];
        const selectedOpportunity = locationData.opportunities.find(opportunity => opportunity.type === type);
        setSubcategories(selectedOpportunity.subcategories);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with the selected filters
    console.log({
      selectedLocation,
      selectedDistance,
      selectedType,
      selectedSubcategory
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Volunteer Time</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row  items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <select
              className="w-full lg:w-auto flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">Where to volunteer?</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
            <select
              className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedDistance}
              onChange={handleDistanceChange}
              disabled={!selectedLocation}
            >
              <option value="">How far to look?</option>
              {distances.map((distance, index) => (
                <option key={index} value={distance}>{distance}</option>
              ))}
            </select>
            <select
              className="w-full lg:w-auto flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedType}
              onChange={handleTypeChange}
              disabled={!selectedLocation || !selectedDistance}
            >
              <option value="">What kind of Programs?</option>
              {types.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            <select
              className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              disabled={!selectedType}
            >
              <option value="">Initiatives</option>
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>{subcategory}</option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full lg:w-auto px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Search
            </button>
          </div>
        </form>
        <div className="mt-4">
          <a href="#" className="text-teal-500 hover:underline">Can't find what you're looking for? Create an offer</a>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
