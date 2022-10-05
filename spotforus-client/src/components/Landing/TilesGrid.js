import React from 'react'
import FeatureTile from './FeatureTile'

export default function TilesGrid() {
  return (
    <>
      <h1 className='text-5xl my-4 font-semibold'>Features</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 2xl:mx-96 xl:mx-80 lg:mx-64 md-mx:64 mx-6 my-1 justify-items-center'>
          <FeatureTile/>
          <FeatureTile/>
          <FeatureTile/>
          <FeatureTile/>
      </div>
    </>
  )
}
