import React, { useState } from "react";

const AmountPicker = ({ onAmountChange }) => {
  const [amount, setAmount] = useState(100); // Default amount

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
    onAmountChange(newAmount); // Pass the new amount to the parent component
  };

  const incrementAmount = () => {
    const newAmount = amount + 10; // Increment by 10, you can adjust this value
    setAmount(newAmount);
    onAmountChange(newAmount); // Pass the new amount to the parent component
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
    <center>
      <input
        type="number"
        value={amount}
        onChange={(e) => handleAmountChange(parseInt(e.target.value))}
        min={1}
        step={1}
        style={{ marginRight: "10px", width: "70px", padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }}
      />
      <button
        onClick={incrementAmount}
        style={{ padding: "8px 12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", transition: "background-color 0.3s ease" }}
      >
        +10
      </button>
    </center>
    </div>
  );
};

export default AmountPicker;
