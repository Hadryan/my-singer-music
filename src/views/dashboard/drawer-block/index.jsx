import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import './style.styl'

const DrawerBlock = (props) => {
  const { route, isShow } = props
  const { title, items } = route
  return (
    <div className="drawer-block">
      {title ? <h4 className={isShow ? '' : 'hide'}>{title}</h4> : null}
      <ul className="items">
        {// 此处有两种对象，一种是显式路由以及对应的组件，例如findmusic，是要做导航渲染的Link
        // 一种是仅仅是组件，没有导航，只是渲染Route,例如artistinfo，需要排除此类对象
        items.map(item =>
            (item.icon ? (
              <li key={JSON.stringify(item)} className="item">
                <NavLink to={item.path}>
                  <i className={item.icon} />
                  {item.text}
                </NavLink>
              </li>
            ) : null))}
      </ul>
    </div>
  )
}

export default withRouter(DrawerBlock)
