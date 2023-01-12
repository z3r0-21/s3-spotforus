import React from 'react'
import CtaNav from '../components/Navigation/Navbars/CtaNav';
import TilesGrid from '../components/Landing/TilesGrid';
import Profile from '../components/Auth/Profile';
import LogOutButton from '../components/Auth/LogoutButtons'

export default function LandingPage() {
  return (
    <>
    <section id="ctaNav" className="h-screen w-full bg-cover bg-landing-page">
    </section>
    <section>
      <h1 className='text-5xl my-4 font-semibold'>About</h1>
      <p className='2xl:mx-96 xl:mx-80 lg:mx-32 md:mx-24 mx-6 mb-8'>
        Welcome to SpotForUs, the ultimate online management tool for student households. Our website makes it easy for tenants to join their household, communicate with their fellow housemates, and stay organized with our built-in cleaning schedule feature. By creating an account, students can view and post announcements, as well as receive updates from their property managers. Our goal is to make life easier for students, so they can focus on their studies and enjoy their college experience. With SpotForUs, managing a student household has never been more convenient. Sign up today and experience the difference.
      </p>
    </section>
    </>
  )
}
