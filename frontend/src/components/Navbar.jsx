import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaRegUser, FaPlus} from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import {
  Menu,
  X,
  BookOpen,
  Briefcase,
  Home,
  User,
  PenSquare,
  Info,
} from "lucide-react";
import React from "react";
import { RouteIndex, RouteMyPage, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from '../assets/avatar.png'
import { removeUser } from "@/redux/user/userSlice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/interviews", label: "Interview Blogs", icon: BookOpen },
  { to: "/opportunities", label: "Opportunities", icon: Briefcase },
  { to: "/submit", label: "Submit", icon: PenSquare },
  { to: RouteMyPage, label: "My Page", icon: User },
  { to: "/about", label: "About", icon: Info },
];

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = async() => {
     try {
              const response = await fetch(
                `${getEnv('VITE_API_BASE_URL')}/auth/logout`,
                {
                  method: "get",
                  credentials: 'include',
                }
              );
              const data = await response.json();
              if (!response.ok) {
                return showToast("error", data.message);
              }
              dispatch(removeUser())
              navigate(RouteIndex);
              showToast("success", data.message);
            } catch (error) {
              showToast("error", error.message);
            }
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-foreground"
          >
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              CareerConnect
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems
  .filter(
    (item) =>
      user.isLoggedIn || (!user.isLoggedIn && item.label !== "Submit" && item.label !== "My Page") 
  )
  .map((item) => (
    <NavLink
      key={item.label}
      to={item.to}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors hover:text-primary/90 ${
          isActive ? "text-primary" : "text-foreground/70"
        }`
      }
    >
      {item.label}
    </NavLink>
  ))}
            {!user.isLoggedIn ? (
              <Button variant="default" size="sm">
                <NavLink to={RouteSignIn}>Login</NavLink>
              </Button>
            ) : (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src= {usericon} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className='cursor-pointer'>
                      <p>{user.user.name}</p>
                      <p className="text-sm">{user.user.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className='cursor-pointer'>
                      <NavLink to = {RouteProfile}>
                      <FaRegUser/>
                        My Profile
                      </NavLink>
                      </DropdownMenuItem>
                    <DropdownMenuItem asChild className='cursor-pointer'>
                      <NavLink to = "/submit">
                      <FaPen/>
                       Write Blog
                      </NavLink>
                      </DropdownMenuItem>
                    <DropdownMenuItem asChild className='cursor-pointer'>
                      <NavLink to = "/submit">
                      <FaPlus/>
                       Add Internship
                      </NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
                      <IoIosLogOut color="red"/>
                       Logout
                      </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/90 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fadeIn">
          <div className="container mx-auto px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 text-sm font-medium rounded-md transition-colors hover:bg-accent ${
                    isActive
                      ? "text-primary bg-accent/50"
                      : "text-foreground/70"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </NavLink>
            ))}
            <div className="pt-2 pb-4">
              <Button variant="default" className="w-full">
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
