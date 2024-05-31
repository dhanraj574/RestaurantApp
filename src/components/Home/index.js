import './index.css'
import {Component} from 'react'
import Navbar from '../Navbar'
import CategorySection from '../CategorySection'
import DishItem from '../DishItem'

class Home extends Component {
  state = {
    items: [],
    activeCategoryId: '',
    activeCategoryDishes: [],
  }

  componentDidMount() {
    this.getItems()
  }

  onClickTab = data => {
    const {items} = this.state
    const activeCategory = items.find(item => item.menuCategoryId === data)
    this.setState({
      activeCategoryId: data,
      activeCategoryDishes: activeCategory ? activeCategory.categoryDishes : [],
    })
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  getItems = async () => {
    const api = 'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
    const response = await fetch(api)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.getUpdatedData(data[0].table_menu_list)
      this.setState({
        items: updatedData,
        activeCategoryDishes: updatedData[0].categoryDishes,
        activeCategoryId: updatedData[0].menuCategoryId,
      })
      console.log(updatedData)
    } else {
      console.log('Error Occurred')
    }
  }

  render() {
    const {items, activeCategoryId, activeCategoryDishes} = this.state
    console.log('Active Category ID:', activeCategoryId)
    console.log('Active Category Dishes:', activeCategoryDishes)
    return (
      <>
        <Navbar />
        <CategorySection
          menuList={items}
          activeId={activeCategoryId}
          changeActiveTab={this.onClickTab}
        />
        <DishItem activeMenuList={activeCategoryDishes} />
      </>
    )
  }
}

export default Home
