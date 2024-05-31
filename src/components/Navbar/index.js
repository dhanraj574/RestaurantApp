import './index.css'
import {React, useState} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../CartContext/CartContext'

const Navbar = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const {length} = cartList
      return (
        <div className="navbar-section">
          <p className="navbar-name">UNI Resto Cafe</p>
          <div className="navbar-order-cont">
            <p className="navbar-order-name">My Orders</p>
            <div>
              <AiOutlineShoppingCart className="navbar-cart-icon" />
              <p className="navbar-cartitems-count">{length}</p>
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Navbar
