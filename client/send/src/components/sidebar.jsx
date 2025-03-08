import React from 'react';
import controlimage from '../assets/control.png';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Sidebar({ menus, open, setOpen, admin }) {
  return (
    <div className={`fixed h-screen bg-[#282E48] transition-all duration-300 ${open ? 'w-72' : 'w-20'}`}>
      <img
        src={controlimage}
        alt="Toggle Sidebar"
        className={`absolute cursor-pointer right-[-1rem] top-9 w-9 border-2 border-[#282e48] rounded-full ${open ? "rotate-0" : "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className='flex items-center p-4'>
        <img 
          src={logo} 
          alt="Logo" 
          className={`p-0 w-[3rem]`}
          style={{ transition: 'width 0.3s ease' }} 
        />
        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"} ml-2`}>Librarium</h1>
      </div>
      <ul className='pt-6'>
        {menus.map((menu, index) => (
          <Link
            key={index} 
            to={
              menu.title === "Dashboard" ? "/about" : 
              menu.title === "Setting" ? "/admin" : 
              "/" 
            }  
            onClick={() => !admin}
          >
            <li className="flex pb-[2rem] p-4 text-white gap-3 cursor-pointer  hover:bg-gray-600">
              <img 
                src={menu.src} 
                style={{ width: '30px', height: '30px', marginRight: '8px', backgroundColor: 'transparent' }} 
                alt="" 
              />
              <span className={`text-[1.2rem] duration-300  ${!open && "scale-0"}`}>{menu.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
