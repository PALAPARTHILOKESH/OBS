import React, { useState } from 'react';

const Filter = ({ cardData, setFilteredData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = cardData.filter((card) =>
      card.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Filter;