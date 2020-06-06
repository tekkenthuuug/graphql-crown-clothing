import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import flowRight from 'lodash.flowright';

import CheckoutPage from './checkout.component';

const GET_CART_ITEMS_AND_TOTAL = gql`
  {
    cartItems @client
    cartTotal @client
  }
`;

const CheckoutPageContainer = ({ data: { cartTotal, cartItems } }) => {
  return <CheckoutPage cartTotal={cartTotal} cartItems={cartItems} />;
};

export default flowRight(graphql(GET_CART_ITEMS_AND_TOTAL))(
  CheckoutPageContainer
);
