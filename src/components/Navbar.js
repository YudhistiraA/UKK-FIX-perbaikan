import React from "react"
import {Link} from "react-router-dom"
import "./Nav.css";
import image from "../pages/images/logo3.png"

import { FaUser,FaPowerOff,FaWarehouse,FaRegPaperPlane ,FaListUl,FaFeatherAlt} from "react-icons/fa";
class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }
    render(){
        return(
            <div>
           

        <div class="nav" id="navbar">
            <nav class="nav__container">
                <div>
                   
    
                    <div class="nav__list">
                        <div class="nav__items">
                            <h3 class="nav__subtitle">MENU</h3>
    
                            <Link to="/" class="nav__link active">
                            <i class='bx bx-home nav__icon'><FaWarehouse/></i>
                                <span class="nav__name">Home</span>
                            </Link>
                            
                            
                                <Link to="/pengaduan" class="nav__link">
                                    <i class='bx bx-home nav__icon' ><FaRegPaperPlane/></i>
                                    <span class="nav__name">Pengaduan</span>
                                    <i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                                </Link>

                               
                            </div>
                      
                            <Link to="/tanggapan" class="nav__link">
                                <i  class='bx bx-home nav__icon' ><FaFeatherAlt/></i>
                                <span class="nav__name">Tanggapan</span>
                            </Link>
                            </div>
                        </div>
    
                        
              

                <Link  onClick={() => this.Logout()} class="nav__link nav__logout">
                    <i class='bx bx-log-out nav__icon' ><FaPowerOff/></i>
                    <span class="nav__name"> Log Out</span>
                </Link>
            </nav>
        </div>
        <header class="header">
            <div class="header__container">
                <div class="header__img"><FaUser/></div>

                <Link to="/" class="header__logo"><img src={image} /></Link>
    
               <center><Link to="/" className="text-white"><h3><b>Admin Pengaduan</b></h3></Link></center>
                
                  
               
    
                <div class="header__toggle">
                    <i class='bx bx-menu' id="header-toggle"></i>
                </div>
            </div>
          
        </header>
        </div>
        )
    }
}
export default Navbar;