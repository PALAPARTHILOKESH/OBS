// Profile.js

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve user details from local storage
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(storedUserDetails);
  }, []);

  return (
    <div>
      <Sidebar />
      <div>
      <p>FirstName: kst</p>
            <p>lastname:sathvik</p>
            <p>Gender: Male</p>
            <p>dateOfBirth: 26-04-2005</p>
            <p>Email:kstsathvik005@gmail.com</p>
            <p>Username:kstsathvik</p>
      </div>
    </div>
  );
};

export default Profile;
