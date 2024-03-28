import React from 'react'
import math from '../images/math.avif'
const Home = () => {
  return (  
    <div className="home">
        <h2 className="home__title">Home</h2>
        <div className="home__image">
            <img src={math} alt="" className="home__img" />
        </div>
        <p className="home__p">
            Bien bienvenu mes amis dans ce Math a nous!
        </p>
    </div>
  )
}

export default Home
