import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChangle = (event) => {
    event.preventDefault()
    const value = event.target.value
    dispatch(changeFilter(value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChangle} />
    </div>
  )
}

export default Filter