import {Component} from 'react'
import './index.css'
import CartContext from '../../CartContext/CartContext'

class DishItem extends Component {
  state = {
    quantities: 1,
  }

  onClickIncrement = () => {
    this.setState(prevState => ({quantities: prevState.quantity + 1}))
  }

  onClickDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantities: prevState.quantity - 1}))
    }
  }

  render() {
    const {activeMenuList} = this.props
    const {quantities} = this.state
    console.log(quantities)

    return (
      <CartContext.Consumer>
        <ul className='dishitem-cont'>
          {activeMenuList.map(each => {
            const addOnLength = each.addonCat
            const badgeCategory =
              each.dishType === 1
                ? 'https://img.icons8.com/?size=100&id=61082&format=png&color=000000'
                : 'https://img.icons8.com/?size=100&id=61083&format=png&color=000000'

            const quantity = quantities[each.dishId] || 0

            return (
              <li key={each.dishId} className='dish-item'>
                <div className='dish-item-cont-1'>
                  <img className='badge' src={badgeCategory} alt='veg badge' />

                  <div className='dish-details-cont'>
                    <h1 className='dish-name'>{each.dishName}</h1>
                    <span className='dish-price-cont'>
                      <p className='dish-currency'>{each.dishCurrency}</p>
                      <p className='dish-currency'>{each.dishPrice}</p>
                    </span>

                    <div className='dishdescription-cont'>
                      <p className='dish-description'>{each.dishDescription}</p>
                      <p className='dish-calories'>{`${each.dishCalories} calories`}</p>
                    </div>
                    {each.dishAvailability ? (
                      <span className='cart-buttons'>
                        <button
                          type='button'
                          className='cart-btn'
                          onClick={() => this.onClickIncrement(each)}
                        >
                          +
                        </button>
                        <p className='dish-quantity'>{quantity}</p>
                        <button
                          type='button'
                          className='cart-btn'
                          onClick={() => this.onClickDecrement(each)}
                        >
                          -
                        </button>
                      </span>
                    ) : (
                      <p className='not-available'>Not available</p>
                    )}

                    {addOnLength.length > 0 ? (
                      <p className='customization-text'>
                        Customizations Available
                      </p>
                    ) : null}
                  </div>
                </div>
                <img
                  className='dish-item-cont-2'
                  src={each.dishImage}
                  alt='dish Image'
                />
              </li>
            )
          })}
        </ul>
      </CartContext.Consumer>
    )
  }
}

DishItem.contextType = CartContext

export default DishItem
