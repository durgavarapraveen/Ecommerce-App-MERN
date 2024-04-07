import React from 'react'
import { Link } from 'react-router-dom'

function Fotter() {
  return (
    <div className='fotter'>
        <h6 className='text-center'>
            All Rights Reserved &copy;  Praveen
        </h6>
        <p className='text-center mt-3'>
            <Link to='/about'>About</Link> |
            <Link to='/contact' className='ml-3'>Contact</Link> |
            <Link to='/policy' className='ml-3'>Privacy Policy</Link>
        </p>
    </div>
  )
}

export default Fotter