import React from 'react';

const PaymentSuccess = ({ amount }) => {
  return (
    <div>
      <h2>Payment Successful</h2>
      <p>You have successfully paid ${amount}</p>
      {/* Add any other relevant information or options */}
    </div>
  );
};

export default PaymentSuccess;
