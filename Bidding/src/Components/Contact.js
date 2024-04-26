import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/submit-form', formData);
      console.log('Form submitted successfully!');

      // Reset form fields after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div style={styles.contactContainer}>
      <Header />
      <div style={styles.contactFormContainer}>
        <h2 style={styles.heading}>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              style={styles.textarea}
              required
            ></textarea>
          </div>

          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

const styles = {
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contactFormContainer: {
    maxWidth: '600px',
    padding: '40px',
    margin: '40px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#1565c0', // Header color
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
    resize: 'vertical',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1565c0', // Button color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0d47a1', // Button hover color
  },
};
