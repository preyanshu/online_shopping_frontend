import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNavigation = ({title}) => {
  return (
    <div className='sptitle'>
      <NavLink to="/">Home</NavLink>/{title}
    </div>
  )
}

export default PageNavigation
