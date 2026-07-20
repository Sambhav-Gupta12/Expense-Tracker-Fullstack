import React from "react";
import { NavLink } from "react-router-dom";
import dashboard from "../../assets/dashboard.png";
import Transactions from "../../assets/Transactions.png";
import budgets from "../../assets/budgets.png";
import profile from "../../assets/profile.png";
import add from "../../assets/add.png";

function NavBar() {
  return (
    <>
      <div className="hidden md:flex md:flex-col md:w-72 h-screen border-r border-[#545450] bg-[#262624] shrink-0">
        <div className="w-full mt-4.5 text-white flex justify-center text-2xl font-semibold">
          Spend
          <span className=" text-[#4f47a6] text-2xl font-semibold">Wise</span>
        </div>

        <div className="flex flex-col px-4 mt-6 gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex gap-2.5 py-2 pr-4 pl-3 duration-200 rounded-lg p-1 m-0.5 w-62 ${
                isActive
                  ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]"
                  : "text-[#98968e]"
              } font-semibold hover:bg-[#30302e]`
            }
          >
            <img className="w-5 h-5 mt-1" src={dashboard} alt="" /> Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex gap-2.5 py-2 pr-4 pl-3 duration-200 rounded-lg p-1 m-0.5 w-62 ${
                isActive
                  ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]"
                  : "text-[#98968e]"
              } font-semibold hover:bg-[#30302e]`
            }
          >
            <img className="w-5 h-5 mt-1" src={Transactions} alt="" />{" "}
            Transactions
          </NavLink>

          <NavLink
            to="/budgets"
            className={({ isActive }) =>
              `flex gap-2.5 py-2 pr-4 pl-3 duration-200 rounded-lg p-1 m-0.5 w-62 ${
                isActive
                  ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]"
                  : "text-[#98968e]"
              } font-semibold hover:bg-[#30302e]`
            }
          >
            <img className="w-4 h-4 mt-1" src={budgets} alt="" /> Budgets
          </NavLink>

          <NavLink
            to="/Profile"
            className={({ isActive }) =>
              `flex gap-2.5 py-2 pr-4 pl-3 duration-200 rounded-lg p-1 m-0.5 w-62 ${
                isActive
                  ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]"
                  : "text-[#98968e]"
              } font-semibold hover:bg-[#30302e]`
            }
          >
            <img className="w-4.5 h-4.5 mt-1" src={profile} alt="" /> Profile
          </NavLink>

          <NavLink
            to="/add-expense"
            className={({ isActive }) =>
              `flex gap-2.5 py-2 pr-4 pl-3 duration-200 rounded-lg p-1 m-0.5 w-62 ${
                isActive
                  ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]"
                  : "text-[#98968e]"
              } font-semibold hover:bg-[#30302e]`
            }
          >
            <img className="w-4 h-4 mt-1" src={add} alt="" /> Add Expense
          </NavLink>
        </div>
      </div>
      {/* Navbar for mobile devices */}
      <div className="md:hidden 
                      fixed 
                      bottom-0 left-20 right-20   
                      mb-4 bg-[#262624] 
                      border-t-2 
                      border-[#545450] 
                      flex justify-around 
                      items-center
                      py-2 z-50
                      rounded-2xl h-8">
        <NavLink to="/" className={({isActive}) =>
          `group relative flex flex-col items center gap-0.5 px-3 py-1 rounded-full ${isActive ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]" : "text-[#98968e]"}`
        }>
          <img className="w-5 h-5" src={dashboard} alt="Dashboard" />
          <span className="
      absolute bottom-6
      opacity-0 translate-y-2 scale-95
      group-hover:opacity-100
      group-hover:translate-y-0
      group-hover:scale-100
      transition-all duration-300 ease-out
      text-[10px] font-semibold
      bg-[#30302e]
      px-2 py-1 rounded-md
      whitespace-nowrap
      pointer-events-none
      right-0
    ">Home</span>
        </NavLink>
        <NavLink to="/transactions" className={({isActive}) =>
          `group relative flex flex-col items center gap-0.5 px-3 py-1 rounded-full ${isActive ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]" : "text-[#98968e]"}`
        }>
          <img className="w-5 h-5" src={Transactions} alt="Transactions" />
          <span className="
      absolute bottom-6
      opacity-0 translate-y-2 scale-95
      group-hover:opacity-100
      group-hover:translate-y-0
      group-hover:scale-100
      transition-all duration-300 ease-out
      text-[10px] font-semibold
      bg-[#30302e]
      px-2 py-1 rounded-md
      whitespace-nowrap
      pointer-events-none
      -right-4
    ">Transactions</span>
        </NavLink>
        <NavLink to="/add-expense" className={({isActive}) =>
          `group relative flex flex-col items center gap-0.5 px-3 py-1 rounded-full ${isActive ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]" : "text-[#98968e]"}`
        }>
          <img className="w-5 h-5" src={add} alt="Add Expense" />
          <span className="
      absolute bottom-6
      opacity-0 translate-y-2 scale-95
      group-hover:opacity-100
      group-hover:translate-y-0
      group-hover:scale-100
      transition-all duration-300 ease-out
      text-[10px] font-semibold
      bg-[#30302e]
      px-2 py-1 rounded-md
      whitespace-nowrap
      pointer-events-none
      -right-3.5
    ">Add Expense</span>
        </NavLink>
        <NavLink to="/budgets" className={({isActive}) =>
          `group relative flex flex-col items center gap-0.5 px-3 py-1 rounded-full ${isActive ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]" : "text-[#98968e]"}`
        }>
          <img className="w-5 h-5" src={budgets} alt="Budgets" />
          <span className="
      absolute bottom-6
      opacity-0 translate-y-2 scale-95
      group-hover:opacity-100
      group-hover:translate-y-0
      group-hover:scale-100
      transition-all duration-300 ease-out
      text-[10px] font-semibold
      bg-[#30302e]
      px-2 py-1 rounded-md
      whitespace-nowrap
      pointer-events-none
      -right-1
    ">Budgets</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive}) =>
          `group relative flex flex-col items center gap-0.5 px-3 py-1 rounded-full ${isActive ? "text-[#4f47a6] border-[1.5px] border-[#545450] bg-[#30302e]" : "text-[#98968e]"}`
        }>
          <img className="w-5 h-5" src={profile} alt="Profile" />
          <span className="
      absolute bottom-6
      opacity-0 translate-y-2 scale-95
      group-hover:opacity-100
      group-hover:translate-y-0
      group-hover:scale-100
      transition-all duration-300 ease-out
      text-[10px] font-semibold
      bg-[#30302e]
      px-2 py-1 rounded-md
      whitespace-nowrap
      pointer-events-none
      right-0
    ">Profile</span>
        </NavLink>
      </div>
    </>
  );
}

export default NavBar;
