import React, { useEffect } from 'react';
// secret key 4Ok1h8a9A8sr1KTjgZKJYf7R
const PaymentComponent = (props) => {
    const options = {
        key: process.env.REACT_APP_API_PAYMENT, //rzp_test_9l7AE99IMucFA6
        amount: props.total*100, //  = INR 1
        name: props.userDetails.name,
        description: 'some description',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
            // alert(response.razorpay_payment_id);
            props.handlePay();
        },
        prefill: {
            name: props.userDetails.name,
            contact: props.userDetails.phoneno,
            email: props.userDetails.email
        },
        notes: {
            address: props.userDetails.email
        },
        theme: {
            color: '#f15d24',
            hide_topbar: false
        }
    };

    const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <button className="btn btn-block cart" onClick={openPayModal}>Pay</button>
        </>
    );
};

export default PaymentComponent;