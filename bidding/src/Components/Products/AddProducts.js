import React, { useRef, useState } from "react";
import "./AddProducts.css";
import { FaTimes } from "react-icons/fa"; // Import close icon from react-icons library
import BidNow from "../BidNow"; // Import the BidNow component
import CardList from "./CardList";

const AddProducts = ({ items, click, removeItem, setAddedItem }) => {
  const [bidAmount, setBidAmount] = useState(100); // State variable for bid amount
  const total = items
    .reduce((pre, cur) => {
      return pre + Number(cur.addNumber) * Number(cur.price);
    }, 0)
    .toFixed(2);

  const showDivRef = useRef(null);
  const [showBidNow, setShowBidNow] = useState(false); // State to control rendering of BidNow component
  const [selectedProductName, setSelectedProductName] = useState(""); // State to hold selected product name for bidding

  const handleCheckOut = (productName) => {
    setSelectedProductName(productName); // Set the selected product name for bidding
    
    // Calculate the total price in cents (Razorpay accepts price in smallest currency unit)
    const totalPriceInCents = (total * 100).toFixed(0);
  
    // Call handleBidNowClick function with the selected product name and total price
    handleBidNowClick(productName, totalPriceInCents); 
  };
  
  const handleBidNowClick = (productName, totalPrice) => {
    const options = {
      key: 'rzp_test_xUIHrkrkhUtUlU',
      key_secret: "4iNHYNHaV6AeuHX73xdzHLje",
      amount: totalPrice, // Use the total price
      currency: 'INR',
      name: productName,
      description: 'Bid for Product',
      image: '/images/IOGO.jpg',
      handler: function(response) {
        alert('Payment successful');
        setShowBidNow(false); // Close the BidNow modal after successful payment
      },
      prefill: {
        name: 'KORLA SRIKARA TRIPURA SATHVIK',
        email: 'kstsathvik005@gmail.com',
        contact: '8897674181'
      }
    };
    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error('Razorpay library not found');
    }
  };
  return (
    <div ref={showDivRef} className="addproducts__container">
      <div className="left-side">
        <div className="check-out-container">
          <div className="check-out-print">
            <h1 className="check-out-title">Shopping</h1>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th className="table-item-title">Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{item.addNumber}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="total" colSpan={2}>
                    Total
                  </td>
                  <td className="total" colSpan={2}>
                    ${total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="right-side-body">
        <div className="close-icon" onClick={() => click(false)}> {/* Close icon */}
            <FaTimes />
          </div><br></br><br></br>
          {items.map((item, i, itemsArr) => (
            <CardList
              key={item.id}
              item={item}
              removeItem={removeItem}
              setAddedItem={setAddedItem}
              itemsArr={itemsArr}
              onBidNowClick={handleCheckOut} // Pass handleCheckOut function as prop
            />
          ))}
        </div>
        <div className="right-side-footer">
          <div className="bar"></div>
          <div className="footer-head">
            <h4>Total :</h4>
            <h1>${total}</h1>
          </div>
          <div className="check-out">
            <button
              className="check-out-btn"
              onClick={() => handleCheckOut()} // Call handleCheckOut function when Check Out button is clicked
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
      {showBidNow && <BidNow productName={selectedProductName} setShowBidNow={setShowBidNow} />} {/* Pass selected product name to BidNow component */}
    </div>
  );
};

export default AddProducts;
