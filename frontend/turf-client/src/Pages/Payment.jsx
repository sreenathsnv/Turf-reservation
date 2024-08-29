import React, { useEffect, useState } from 'react';
import '../CSS/Booking/Payment.css'; // Assuming you have a CSS file named PaymentPage.css
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../utils/CustomFetch';
import { toast, Bounce } from 'react-toastify';
import { useAuth } from '../context/Authcontext';

const PaymentPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [BookingData, setBookingData] = useState({});

    const [formData, setFormData] = useState({
        booking_id: id,
        amount: 0,         
        payment_method: ''
    });

    useEffect(() => {
        async function fetchData() {
            const response = await axiosInstance(`/book/${id}/details/`);

            if (response.status === 200) {
                console.log(response.data);
                setBookingData(response.data);
                setFormData({ ...formData, amount: response.data.booking_data?.total_amount });
            }
        }

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            booking_id: id,
            amount: BookingData.booking_data?.total_amount,
            ...formData,
            [name]: value
        });
    };

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Data Submitted:', formData);
    };

    return (
        <div className="payment-container">
            <form onSubmit={handleSubmit}>
                {/* Display Turf Name and Amount */}
                <div className="payment-row">
                    <div className="payment-col">
                        <h3 className="payment-title">Payment Summary</h3>
                        <div className="payment-inputBox">
                            <label htmlFor="turfName">Turf Name:</label>
                            <input
                                type="text"
                                id="turfName"
                                value={BookingData.turf_data?.turf_name}
                                readOnly
                            />
                        </div>
                        <div className="payment-inputBox">
                            <label htmlFor="amount">Total Amount:</label>
                            <input
                                type="text"
                                id="amount"
                                value={formData.amount}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div className="payment-row">
                    <div className="payment-col">
                        <h3 className="payment-title">Billing Address</h3>
                        <div className="payment-inputBox">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={user.name}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="payment-col">
                        <h3 className="payment-title">Payment Information</h3>
                        <div className="payment-inputBox">
                            <label htmlFor="cardAccepted">Card Accepted:</label>
                            <img
                                src="https://media.geeksforgeeks.org/wp-content/uploads/20240715140014/Online-Payment-Project.webp"
                                alt="credit/debit card image"
                            />
                        </div>
                        <div className="payment-inputBox">
                            <label htmlFor="cardName">Name On Card:</label>
                            <input
                                type="text"
                                placeholder="Enter card name"
                                required
                            />
                        </div>
                        <div className="payment-inputBox">
                            <label htmlFor="cardNum">Credit Card Number:</label>
                            <input
                                type="text"
                                id="cardNum"
                                placeholder="1111-2222-3333-4444"
                                maxLength="19"
                                required
                            />
                        </div>
                        <div className="payment-inputBox">
                            <label htmlFor="expMonth">Exp Month:</label>
                            <select
                                id="expMonth"
                                required
                            >
                                <option value="">Choose month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                        <div className="payment-flex">
                            <div className="payment-inputBox">
                                <label htmlFor="expYear">Exp Year:</label>
                                <select
                                    id="expYear"
                                    required
                                >
                                    <option value="">Choose Year</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                            </div>
                            <div className="payment-inputBox">
                                <label htmlFor="cvv">CVV:</label>
                                <input
                                    type="number"
                                    id="cvv"
                                    placeholder="123"
                                    required
                                />
                            </div>
                        </div>
                        {/* Payment Method Dropdown */}
                        <div className="payment-inputBox">
                            <label htmlFor="paymentMethod">Payment Method:</label>
                            <select
                                id="paymentMethod"
                                name="payment_method"
                                value={formData.payment_method}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled selected>Select Payment Method</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="PayPal">PayPal</option>
    
                                <option value="Bank Transfer">Bank Transfer</option>
                                
                            </select>
                        </div>
                    </div>
                </div>

                <input type="submit" value="Proceed to Checkout" className="payment-submit_btn" />
            </form>
        </div>
    );
};

export default PaymentPage;
