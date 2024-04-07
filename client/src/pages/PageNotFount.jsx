import React from 'react'
import Layoyt from '../components/layout/Layoyt'
import { Link } from 'react-router-dom'

function PageNotFount() {
  return (
    <>
    <Layoyt title={'go back - page not found'}>
        <div className='pnf'>
          <h1 className='pnf-title'>404</h1>
          <h2 className='pnf-heading'>Oops ! Page Not Found</h2>
          <Link to='/' className='pnf-button'>Go Back</Link>
        </div>
    </Layoyt>
    </>
  )
}

export default PageNotFount