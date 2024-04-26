import React, { useState } from 'react';
import BidNow from './BidNow';
import MyBids from '../MyBids';

const ParentComponent = () => {
    const [showBidModal, setShowBidModal] = useState(false);
    const [biddedProduct, setBiddedProduct] = useState(null);

    const handleSuccessBid = (biddedProductData) => {
        setBiddedProduct(biddedProductData);
        setShowBidModal(false); // Close the bid modal after successful payment
    };

    return (
        <div>
            {showBidModal ? <BidNow setShowBidModal={setShowBidModal} onSuccessBid={handleSuccessBid} /> : null}
            {biddedProduct ? <MyBids biddedProduct={biddedProduct} /> : null}
        </div>
    );
};

export default ParentComponent;
