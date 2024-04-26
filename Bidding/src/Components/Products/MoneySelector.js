import React, { useState } from 'react';

const MoneySelector = ({ minAmount, maxAmount, step = 1, onChange }) => {
  const [selectedAmount, setSelectedAmount] = useState(minAmount);

  const handleAmountChange = (event) => {
    const amount = parseInt(event.target.value, 10);
    setSelectedAmount(amount);
    onChange(amount);
  };

  const options = [];
  for (let amount = minAmount; amount <= maxAmount; amount += step) {
    options.push(
      <option key={amount} value={amount}>
        ₹{amount / 100}
      </option>
    );
  }

  return (
    <select value={selectedAmount} onChange={handleAmountChange}>
      {options}
    </select>
  );
};

export default MoneySelector;