import React, { useCallback } from 'react'
import { Trashbin } from '../../assets'

const DeleteBtn: React.FC = () => {
  

  return (
    <button className="hover:bg-gray-200 duration-300 rounded-full p-2">
      <Trashbin/>
    </button>
  )
}

export default DeleteBtn