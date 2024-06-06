import {Component} from 'react'
import './index.css'
import CartContext from '../../CartContext/CartContext'

class DishItem extends Component {
  state = {
    quantity: 0,
  }

  onDecrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
    }))
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  render() {
    const {activeMenuList, addCartItem} = this.props
    const {quantity} = this.state
    console.log(activeMenuList)

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          return (
            <ul className="dishitem-cont">
              {activeMenuList.map(each => {
                const badgeCategory =
                  each.dishType === 1
                    ? 'https://img.icons8.com/?size=100&id=61082&format=png&color=000000'
                    : 'https://img.icons8.com/?size=100&id=61083&format=png&color=000000'

                const onClickAddToCart = () => {
                  addCartItem({...each, quantity})
                }
                return (
                  <li key={activeMenuList.dishId} className="dish-item">
                    <div className="dish-item-cont-1">
                      <img
                        className="badge"
                        src={badgeCategory}
                        alt="veg badge"
                      />
                      <div className="dish-details-cont">
                        <h1 className="dish-name">{each.dishName}</h1>
                        <span className="dish-price-cont">
                          <p className="dish-currency">{each.dishCurrency}</p>
                          <p className="dish-currency">{each.dishPrice}</p>
                        </span>
                        <div className="dishdescription-cont">
                          <p className="dish-description">
                            {each.dishDescription}
                          </p>
                          <p className="dish-calories">{`${each.dishCalories} calories`}</p>
                        </div>
                        {each.dishAvailability ? (
                          <>
                            <span className="cart-buttons">
                              <button
                                type="button"
                                className="cart-btn"
                                onClick={this.onIncrementQuantity}
                              >
                                +
                              </button>
                              <p className="dish-quantity">{quantity}</p>
                              <button
                                type="button"
                                className="cart-btn"
                                onClick={this.onDecrementQuantity}
                              >
                                -
                              </button>
                            </span>
                            <button
                              type="button"
                              className="add-to-cart-btn"
                              onClick={onClickAddToCart}
                              disabled={quantity === 0}
                            >
                              Add to Cart
                            </button>
                          </>
                        ) : (
                          <p className="not-available">Not available</p>
                        )}
                        {activeMenuList.addonCat &&
                        activeMenuList.addonCat.length > 0 ? (
                          <p className="customization-text">
                            Customizations Available
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <img
                      className="dish-item-cont-2"
                      src={each.dishImage}
                      alt="dish Image"
                    />
                  </li>
                )
              })}
            </ul>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem
