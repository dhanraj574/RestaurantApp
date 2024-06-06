import './index.css'
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'
import CartContext from '../../CartContext/CartContext'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const {length} = cartList
        return (
          <div className="navbar-section">
            <Link className="link" to="/">
              <p className="navbar-name">UNI Resto Cafe</p>
            </Link>
            <div className="navbar-order-cont">
              <button
                className="logout-btn"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
              <p className="navbar-order-name">My Orders</p>
              <div className="cart-icon-container">
                <Link className="link" to="/cart">
                  <button className="cart-button" type="button">
                    <AiOutlineShoppingCart className="navbar-cart-icon" />
                  </button>
                </Link>
                <p className="navbar-cartitems-count">{length}</p>
              </div>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Navbar)
