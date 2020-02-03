import React from 'react'

const Filter = ({ value, onChange}) => {
  return (
    <div>
      <form>
        filter shown with <input
          value={value}
          onChange={onChange}
        />
      </form>
    </div>
  )
}

export default Filter