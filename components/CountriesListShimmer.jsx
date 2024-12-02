
import React from 'react'
import './CountriesListShimmer.css'

export default function CountriesListShimmer() {
  // new Array(10).fill('')

  return (
    <div className="countries-container">
      {Array.from({ length: 10 }).map((el, i) => {
        return (
          <div key={i} className="country-desc shimmer-effect">
            <div className="flag-container"></div>
            <div className="country-content">
              <h3 className="country-name"></h3>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

