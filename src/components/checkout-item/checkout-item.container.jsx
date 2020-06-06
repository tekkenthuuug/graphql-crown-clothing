import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import flowRight from 'lodash.flowright';

import CheckoutItem from './checkout-item.component';

const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`;

const CheckoutItemContainer = ({
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  ...otherProps
}) => {
  return (
    <CheckoutItem
      {...otherProps}
      removeItemFromCart={(item) => removeItemFromCart({ variables: { item } })}
      addItemToCart={(item) => addItemToCart({ variables: { item } })}
      clearItemFromCart={(item) => clearItemFromCart({ variables: { item } })}
    />
  );
};

export default flowRight(
  graphql(REMOVE_ITEM_FROM_CART, { name: 'removeItemFromCart' }),
  graphql(ADD_ITEM_TO_CART, { name: 'addItemToCart' }),
  graphql(CLEAR_ITEM_FROM_CART, { name: 'clearItemFromCart' })
)(CheckoutItemContainer);
