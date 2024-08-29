import React, { useEffect, useState } from 'react';
import '../CSS/Booking/Payment.css';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../utils/CustomFetch';
import { toast, Bounce } from 'react-toastify';
import { useAuth } from '../context/Authcontext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const PaymentForm = ({ bookingData, user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
           
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Create a payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: user.name,
            },
        });

        if (error) {
            console.error(error);
            toast.error(`Payment failed: ${error.message}`, { transition: Bounce });
            return;
        }

        // Send paymentMethod.id and other data to your backend
        try {
            const response = await axiosInstance.post('/turf/book/payment/', {
                payment_method: paymentMethod.id,
                booking_id: bookingData.booking_data.id,
                amount: bookingData.booking_data.total_amount,
            });
            console.log(response);
            
            if (response.status === 201) {
                toast.success('Payment successful!', { transition: Bounce });
                setTimeout(() => {
                    navigate('/payment/success',{replace:true})
                }, 2000);
            } else {
                toast.error('Payment failed, please try again.', { transition: Bounce });
            }
        } catch (err) {
            toast.error('Payment failed, please try again.', { transition: Bounce });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="payment-row">
                <div className="payment-col">
                    <h3 className="payment-title">Payment Summary</h3>
                    <div className="payment-inputBox">
                        <label htmlFor="turfName">Turf Name:</label>
                        <input
                            type="text"
                            id="turfName"
                            value={bookingData.turf_data?.turf_name}
                            readOnly
                        />
                    </div>
                    <div className="payment-inputBox">
                        <label htmlFor="amount">Total Amount:</label>
                        <input
                            type="text"
                            id="amount"
                            value={bookingData.booking_data?.total_amount}
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
                        <label htmlFor="cardElement">Card Details:</label>
                        <CardElement />
                    </div>
                </div>
            </div>

            <input type="submit" value="Proceed to Checkout" className="payment-submit_btn" />
        </form>
    );
};

const PaymentPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [bookingData, setBookingData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await axiosInstance(`/book/${id}/details/`);

            if (response.status === 200) {
                setBookingData(response.data);
            }
        }

        fetchData();
    }, [id]);

    return (
        <div className="payment-container">
            <Elements stripe={stripePromise}>
                <PaymentForm bookingData={bookingData} user={user} />
            </Elements>
        </div>
    );
};

export default PaymentPage;
