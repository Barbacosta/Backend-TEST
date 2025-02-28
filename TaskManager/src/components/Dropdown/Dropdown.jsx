import React from 'react'
import DropdownButton from '../DropdownButton/DropdownButton'
import DropdownContent from '../DropdownContent/DropdownContent'

const Dropdown = ({buttonText, content}) => {
  return (
    <div><DropdownButton>{buttonText}</DropdownButton><DropdownContent>{content}</DropdownContent></div>
  )
}

export default Dropdown