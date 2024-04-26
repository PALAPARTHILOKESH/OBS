// AmountPicker.js

import React, { useState } from "react";

const AmountPicker = ({ onAmountChange, initialValue }) => {
  const [amount, setAmount] = useState(initialValue);

  const handleAmountChange = (e) => {
    const newAmount = parseInt(e.target.value);
    setAmount(newAmount);
    onAmountChange(newAmount);
  };

  return (
    <input
      type="number"
      value={amount}
      onChange={handleAmountChange}
      min={initialValue}
    />
  );
};

export default AmountPicker;
