import React from 'react'
import Layoyt from '../components/layout/Layoyt'

function About() {
  return (
    <Layoyt title={'About Us - Ecommerce APP'}>
        <div className=' aboutus-container'>
          <img className='' src='https://img.freepik.com/free-vector/group-people-working-together_52683-28615.jpg?t=st=1710335231~exp=1710338831~hmac=fe2aa7f1bc1769079207d9047c654cc1ea1f5ec09522bf93fcd0b2fb67c4f027&w=996' alt='ANout Us' />
          <p className=''>Welcome to Saathjan, where passion meets innovation. Since 2024, we've been dedicated to delivering top-tier products that epitomizes quality and craftsmanship. Our curated selection, coupled with a commitment to customer satisfaction, reflects our unwavering mission. Join us on a journey of style and innovation at the forefront of our work.</p>
        </div>
    </Layoyt>
  )
}

export default About