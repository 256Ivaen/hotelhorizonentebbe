import React, { useState } from "react";

const RoomFilter = ({ currentFilters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(currentFilters);
  
  // Handle price change
  const handlePriceChange = (type, value) => {
    const newPrice = {
      ...localFilters.price,
      [type]: parseInt(value)
    };
    
    // Make sure min doesn't exceed max
    if (type === 'min' && newPrice.min > localFilters.price.max) {
      newPrice.min = localFilters.price.max;
    }
    
    // Make sure max doesn't go below min
    if (type === 'max' && newPrice.max < localFilters.price.min) {
      newPrice.max = localFilters.price.min;
    }
    
    setLocalFilters({
      ...localFilters,
      price: newPrice
    });
  };
  
  // Handle filter apply
  const applyFilters = () => {
    onFilterChange(localFilters);
  };
  
  // Handle filter reset
  const resetFilters = () => {
    const defaultFilters = {
      price: { min: 0, max: 10000 },
      beds: null,
      guests: null
    };
    
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Filter Rooms</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <label htmlFor="min-price" className="text-sm text-gray-600 mb-1">Min</label>
              <input
                id="min-price"
                type="number"
                min="0"
                max={localFilters.price.max}
                value={localFilters.price.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <span className="mt-6">-</span>
            <div className="flex flex-col">
              <label htmlFor="max-price" className="text-sm text-gray-600 mb-1">Max</label>
              <input
                id="max-price"
                type="number"
                min={localFilters.price.min}
                value={localFilters.price.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Beds */}
        <div>
          <h3 className="font-medium mb-2">Beds</h3>
          <select
            value={localFilters.beds || ''}
            onChange={(e) => setLocalFilters({
              ...localFilters,
              beds: e.target.value === '' ? null : parseInt(e.target.value)
            })}
            className="border rounded-md px-3 py-2 w-full"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
        
        {/* Guests */}
        <div>
          <h3 className="font-medium mb-2">Guests</h3>
          <select
            value={localFilters.guests || ''}
            onChange={(e) => setLocalFilters({
              ...localFilters,
              guests: e.target.value === '' ? null : parseInt(e.target.value)
            })}
            className="border rounded-md px-3 py-2 w-full"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
          </select>
        </div>
      </div>
      
      {/* Filter Actions */}
      <div className="flex justify-end mt-6 gap-3">
        <button
          onClick={resetFilters}
          className="text-gray-600 hover:text-gray-800 px-4 py-2"
        >
          Reset
        </button>
        <button
          onClick={applyFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default RoomFilter;