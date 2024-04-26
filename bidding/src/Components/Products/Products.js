import React, { useState, useEffect } from "react";
import Search from './Search';
import AddProducts from "./AddProducts";
import CardBody from "./CardBody";
import Button from "./Button";
import Sidebar from '../Sidebar';
import AmountPicker from "../AmountPicker"; // Import the AmountPicker component
import PaymentSuccess from "../PaymentSuccess"; // Import the PaymentSuccess component
import "./Products.css";
import { Razorpay } from "razorpay-checkout";

const cardStyle = {
  width: '200px',
  padding: '20px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  position: 'relative',
};

const bidButton = {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px 20px',
  fontSize: '18px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const Products = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState(100); // State to hold bid amount for payment
  const [displayedBidAmount, setDisplayedBidAmount] = useState(100); // State to hold displayed bid amount
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment success

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItems(data.map(item => ({...item, current_highest_bid: item.price, minimum_bid_increment: 100}))));
  }, []);

  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }

  const itemsFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    setAddedItems([...addedItems, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItems(newItems);
  }

  const handleBidNowClick = (productName) => {
    const updatedItems = items.map(item => {
      if (item.title === productName) {
        const newMRP = bidAmount > item.mrp ? bidAmount : item.mrp; // Update MRP if bid amount is greater
        return {...item, current_highest_bid: bidAmount, mrp: newMRP};
      }
      return item;
    });
    setItems(updatedItems);
    const options = {
      key: 'rzp_test_xUIHrkrkhUtUlU',
      key_secret: "4iNHYNHaV6AeuHX73xdzHLje",
      amount: bidAmount * 100, // Use bidAmount state
      currency: 'INR',
      name: productName,
      description: 'Bid for Product',
      image: '/images/IOGO.jpg',
      handler: function(response) {
        alert('Payment successful');
        setPaymentSuccess(true); // Set payment success state to true
        setDisplayedBidAmount(bidAmount); // Update displayed bid amount after successful payment
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

  const cardContainer = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  };

  const imageStyle = {
    width: '100%',
    marginBottom: '10px',
  };

  return (
    <div>
      <Sidebar />
      <div style={{ textAlign: 'center' }}>
        <div style={cardContainer}>
          {items.map((card, index) => (
            <div key={index} style={cardStyle}>
              <h3>{card.title}</h3>
              <img src={card.image} alt={card.title} style={imageStyle} />
              <p style={{ minHeight: '100px' }}>{card.description}</p>
              <p><strong>MRP:</strong> {card.mrp}</p>
              <p><strong>Current Highest Bid:</strong> {card.current_highest_bid}</p>
              {/* Render the modified AmountPicker component */}
              <center><AmountPicker onAmountChange={(amount) => setBidAmount(amount)} initialValue={displayedBidAmount} currentHighestBid={card.current_highest_bid} /></center><br /><br />
              <button style={bidButton} onClick={() => handleBidNowClick(card.title)}>Bid Now</button>
            </div>
          ))}
        </div>
      </div><br></br>
      <div className="body__container">
        <div className="nav">
          <div className="nav-right">
            <Search
              products={items}
              value={searchValue}
              onChangeData={changingSearchData}
            />
            <Button num={addedItems.length} click={setShowAddProducts} />
          </div>
        </div>

        {showAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItems}
          />
        )}
        <CardBody
          products={itemsFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
      {paymentSuccess && <PaymentSuccess amount={displayedBidAmount} />} {/* Render PaymentSuccess component if payment is successful */}
    </div>
  );
};

export default Products;
