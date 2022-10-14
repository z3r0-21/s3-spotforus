import React from 'react'
import Navbar from '../components/Navigation/CtaNavbar';
import TilesGrid from '../components/Landing/TilesGrid';
import Profile from '../components/Auth/Profile';

export default function LandingPage() {
  return (
    <>
    <section id="ctaNav" className="h-screen w-full bg-cover bg-landing-page">
      <Navbar/>
    </section>
    <section id="features">
      <TilesGrid/>
    </section>
    <section>
      <h1 className='text-5xl my-4 font-semibold'>About</h1>
      <p className='2xl:mx-96 xl:mx-80 lg:mx-32 md:mx-24 mx-6 mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
      pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. 
      Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, 
      in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
      per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut 
      vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.
      Integer eu nibh at nisi ullamcorper sagittis id vel leo. Integer feugiat 
      faucibus libero, at maximus nisl suscipit posuere. Morbi nec enim nunc. 
      Phasellus bibendum turpis ut ipsum egestas, sed sollicitudin elit convallis. 
      Cras pharetra mi tristique sapien vestibulum lobortis. Nam eget bibendum metus, 
      non dictum mauris. Nulla at tellus sagittis, viverra est a, bibendum metus.
      </p>
    </section>
    <Profile/>
    </>
  )
}
