import './index.css'

const CategorySection = props => {
  const {menuList, activeId, changeActiveTab} = props
  console.log('Active ID:', activeId)

  const onClickActiveTab = data => {
    changeActiveTab(data)
  }

  return (
    <div className="menulist-cont">
      {menuList.map(each => (
        <button
          className={
            each.menuCategoryId === activeId ? 'activemenu-item' : 'menu-item'
          }
          key={each.menuCategoryId}
          onClick={() => onClickActiveTab(each.menuCategoryId)}
        >
          {each.menuCategory}
        </button>
      ))}
    </div>
  )
}

export default CategorySection
