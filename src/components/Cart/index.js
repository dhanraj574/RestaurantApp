import './index.css'
import Navbar from '../Navbar'
import CartContext from '../../CartContext/CartContext'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { BsDashSquare } from "react-icons/bs";
import { BsPlusSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
const Cart = () => {
  const cartEmptyView = () => {
    return (
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart"
      />
    );
  };

  return (
    <>
      <Navbar />
      <CartContext.Consumer>
        {(value) => {
          if (!value) {
            return <div>Error: CartContext not found</div>;
          }

          const {
            cartList,
            removeCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            removeAllCartItems,
          } = value;

          const onRemoveCartItem = (id) => {
            console.log(`Removing item with id: ${id}`);
            removeCartItem(id);
          };
          const onIncrementQuantity = (id) => {
            console.log(`Incrementing quantity for item with id: ${id}`);
            incrementCartItemQuantity(id);
          };
          const onDecrementQuantity = (id) => {
            console.log(`Decrementing quantity for item with id: ${id}`);
            decrementCartItemQuantity(id);
          };

          const onClickRemoveAll = () => {
            console.log('Removing all items from the cart');
            removeAllCartItems();
          };

          return (
            <div>
              {cartList.length > 0 ? (
                <div className="cart-content">
                  <h1 className="cart-heading">My Cart ({cartList.length} Items)</h1>
                  <button
                    className="cart-removeall"
                    type="button"
                    onClick={onClickRemoveAll}
                  >
                    Remove All
                  </button>
                  <ul className="cart-listcont">
                    {cartList.map((each) => (
                      <li className="cart-listitem" key={each.dishId}>
                        <img
                          className="cartlist-img"
                          src={each.dishImage}
                          alt={each.dishName}
                        />
                        <p className="cartitem-name">{each.dishName}</p>
                        <div className="cart-quantity-container">
                          <button
                            type="button"
                            className="quantity-controller-button"
                            onClick={() => onDecrementQuantity(each.dishId)}
                            data-testid="minus"
                          >
                            -
                          </button>
                          <p className="cart-quantity">{each.quantity}</p>
                          <button
                            type="button"
                            className="quantity-controller-button"
                            onClick={() => onIncrementQuantity(each.dishId)}
                            data-testid="plus"
                          >
                            +
                          </button>
                        </div>
                        <p className="cartitem-price">
                          {each.dishPrice * each.quantity}
                        </p>
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() => onRemoveCartItem(each.dishId)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                cartEmptyView()
              )}
            </div>
          );
        }}
      </CartContext.Consumer>
    </>
  );
};


export default Cart
