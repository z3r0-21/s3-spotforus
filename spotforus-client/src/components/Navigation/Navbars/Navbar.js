import React from 'react';
import { useSelector} from 'react-redux'
import AdminNav from './AdminNav';
import CtaNav from './CtaNav';
import NewUserNav from './NewUserNav';
import UserNav from './UserNav';

export default function Navbar() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const isAdmin = useSelector((state) => state.user.isAdmin)
    const isHouseholdTenant = useSelector((state) => state.user.isHouseholdTenant)
    
    let nav;

    if(isLoggedIn === true && isAdmin === false){
        if(isHouseholdTenant === true){
            nav = <UserNav/>
        }
        else{
            nav = <NewUserNav/>
        }
    }
    else if(isLoggedIn === true && isAdmin === true){
        nav = <AdminNav/>
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
