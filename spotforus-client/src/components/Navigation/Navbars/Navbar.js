import React from 'react';
import { useSelector} from 'react-redux'
import CtaNav from './CtaNav';
import NewUserNav from './NewUserNav';
import UserNav from './UserNav';

export default function Navbar() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    
    let nav;

    if(isLoggedIn === true){
        nav = <UserNav/>
    }
    else{
        nav = <CtaNav/>
    }

  return (
    <>
    {nav}
    </>
  )
}
