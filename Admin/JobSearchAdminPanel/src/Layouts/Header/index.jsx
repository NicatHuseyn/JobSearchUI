import React from 'react'
import { IoBag } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { RiBuilding4Fill } from "react-icons/ri";
import { BiSolidBuildings } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "./index.scss"

const Header = () => {
  return (
    <header>
        <div className="container">
          <div className="header-inner">

            <div className="logo">
              <NavLink to="/">
                <img src="https://classic.jobsearch.az/simple/images/jobsearch.svg" alt="" />
              </NavLink>
            </div>

            <nav>
              <ul>
              <li>
                  <NavLink to="/"><IoMdHome /> Ana Səhifə</NavLink>
                </li>
                <li>
                  <NavLink to="/job"><IoBag /> Elanlar</NavLink>
                </li>
                <li>
                  <NavLink to="/category"><MdCategory /> Kateqoriyalar</NavLink>
                </li>
                <li>
                  <NavLink to="/industry"><RiBuilding4Fill /> Sənaye</NavLink>
                </li>
                <li>
                  <NavLink to="/company"><BiSolidBuildings /> Şirkətlər</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard"><MdDashboardCustomize /> Dashboard</NavLink>
                </li>
              </ul>
            </nav>

            <div className="pages">
              <ul>
                <li><NavLink>Haqqımızda</NavLink></li>
                <li><NavLink>Xidmətlər</NavLink></li>
                <li><NavLink to="/contact">Əlaqə</NavLink></li>
                <li><NavLink><span><button><FaHeart /></button></span></NavLink></li>
                <li><NavLink to="/add-user"><span><button><FaUser /></button></span></NavLink></li>
              </ul>
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header