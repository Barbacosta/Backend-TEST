import React from 'react'
import {FaChevronDown} from 'react-icons/fa';

const DropdownButton = ({children}) => {
  return (
    <div>{children}<span><FaChevronDown/></span></div>
  )
}

export default DropdownButton