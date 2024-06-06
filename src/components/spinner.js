import React, { Component } from 'react'
import loading from './Spinner-Gif.gif'
const spinner = () =>{
    return (
      <div className="text-center d-flex justify-content-center align-items-center">
        <img src={loading} alt="loading"/>
      </div>
    )
}

export default spinner
