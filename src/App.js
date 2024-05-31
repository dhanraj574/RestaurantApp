import {Component} from 'react'
import './App.css'
import Home from './components/Home'
import CartContext from './CartContext/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const existingItem = cartList.find(each => each.dishId === product.dishId)
    if (existingItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each =>
          each.dishId === product.dishId
            ? {...each, quantity: product.quantity}
            : each,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  removeCartItem = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.dishId !== dishId),
    }))
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Home />
      </CartContext.Provider>
    )
  }
}

export default App
