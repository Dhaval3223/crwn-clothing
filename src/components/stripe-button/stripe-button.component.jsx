import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
  console.log(token);
  alert('Payment successful');
}

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IW36EGJ2J3tqJXWCrZuzdCy8zHnePcKQRjKdDhIy1xGqLTlSM5Wf9ME5Np0SZ1RnNMWV4ItE8tIYWvcgxqlER9100PgsDXaBz';

  return(
    <StripeCheckout 
      label='Pay Now'
      name='CRWN Clothing Ltd. '
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
};

export default StripeCheckoutButton;
