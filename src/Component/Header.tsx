import { useState, useEffect, useRef } from "react";
import {
  Search,
  User,
  Menu,
  X,
  ShoppingCart,
  BookOpen,
  Settings,
  LogOut,
  ChevronDown,
  HeartIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/services/Slices/authSlice";
import { Rb_Button, Rb_Image, Rb_Input } from "rentbook";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const { isAuthenticated, userInfo } = useSelector((state: any) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener("close-header-menu", close);
    return () => window.removeEventListener("close-header-menu", close);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-10 flex items-center justify-between gap-4 px-4 py-3 sm:px-6 ">
        {/* Logo */}
        <div
          className="flex shrink-0 cursor-pointer items-center gap-3"
          onClick={() => {
            window.history.pushState({}, "", "/");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
        >
          <Rb_Image
            src="/logo.png"
            alt="Logo"
            className="h-14 w-auto object-contain sm:h-14"
          />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:!block">
          <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
            <li
              onClick={() => navigate("/books")}
              className="cursor-pointer transition-colors hover:text-[#146adb]"
            >
              Books
            </li>

            <li className="cursor-pointer transition-colors hover:text-[#146adb]">
              Categories
            </li>

            <li className="cursor-pointer transition-colors hover:text-[#146adb]">
              Rent Books
            </li>

            <li className="cursor-pointer transition-colors hover:text-[#146adb]">
              Contact
            </li>
          </ul>
        </nav>

        {/* Desktop search */}
        <div className="hidden flex-1 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 transition-colors focus-within:border-[#146adb] focus-within:bg-white lg:!flex lg:max-w-xs xl:max-w-sm">
          <Search size={18} className="shrink-0 text-gray-400" />

          <Rb_Input
            className="w-full border-none bg-transparent text-sm h-0.5 text-gray-700 outline-none placeholder:text-gray-400"
            placeholder="Search books..."
          />
        </div>

        <div className="hidden lg:!flex items-center gap-4">
          {!isAuthenticated ? (
            <Rb_Button
              onClick={() => navigate("/auth")}
              className="hidden items-center gap-2 rounded-xl bg-[#146adb] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/10 transition-all duration-200 hover:bg-[#1057b8] hover:shadow-md active:scale-[0.98] sm:!flex"
            >
              <User size={16} className="stroke-[2.5]" />
              Sign In
            </Rb_Button>
          ) : (
            <div className="relative" ref={profileRef}>
              {/* Refined Profile Action Trigger */}
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-3 rounded-full border p-1 pr-4 transition-all duration-200 outline-none
          ${profileOpen
                    ? "border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/10"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/80 active:bg-gray-100"
                  }`}
              >
                {/* Modern Avatar Ring */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-sm shadow-blue-500/10 ring-2 ring-white">
                  {userInfo?.firstName?.charAt(0).toUpperCase() || "?"}
                </div>

                {/* Action Label Context Block */}
                <div className="hidden text-left md:block max-w-[140px]">
                  <p className="truncate text-xs font-semibold text-gray-900 leading-none mb-0.5">
                    {userInfo?.firstName}
                  </p>
                  <p className="truncate text-[10px] font-medium text-gray-400 tracking-wide leading-none">
                    {userInfo?.email}
                  </p>
                </div>

                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-300 ease-out shrink-0
            ${profileOpen ? "rotate-180 text-blue-600" : ""}`}
                />
              </div>

              {/* Modern High-End Dropdown Panel Box */}
              {profileOpen && (
                <div className="absolute right-0 mt-2.5 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white/95 backdrop-blur-md p-1.5 shadow-xl shadow-gray-200/50 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {/* Header Metadata Section Block */}
                  <div className="rounded-lg bg-gray-50/80 p-3 mb-1 border border-gray-100/50">
                    <p className="text-xs font-bold text-gray-800 leading-tight">
                      {userInfo?.firstName}
                    </p>
                    <p className="truncate text-[11px] font-medium text-gray-400 mt-0.5">
                      {userInfo?.email}
                    </p>
                  </div>

                  {/* Grouped App Navigation Links Layout */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 group"
                    >
                      <User
                        size={15}
                        className="text-gray-400 group-hover:text-blue-600 transition-colors"
                      />
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/cart");
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 group"
                    >
                      <ShoppingCart
                        size={15}
                        className="text-gray-400 group-hover:text-blue-600 transition-colors"
                      />
                      Cart
                    </button>
                    <button
                      onClick={() => {
                        navigate("/wishList");
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 group"
                    >
                      <HeartIcon
                        size={15}
                        className="text-gray-400 group-hover:text-blue-600 transition-colors"
                      />
                      WishList
                    </button>
                    <button
                      onClick={() => {
                        navigate("/my-books");
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 group"
                    >
                      <BookOpen
                        size={15}
                        className="text-gray-400 group-hover:text-blue-600 transition-colors"
                      />
                      My Books
                    </button>

                    <button
                      onClick={() => {
                        navigate("/settings");
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 group"
                    >
                      <Settings
                        size={15}
                        className="text-gray-400 group-hover:text-blue-600 transition-colors"
                      />
                      Settings
                    </button>
                  </div>

                  {/* Separation Boundary Layer & Red Logout Trigger */}
                  <div className="mt-1.5 pt-1.5 border-t border-gray-100">
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold text-red-600 transition-all hover:bg-red-50"
                    >
                      <LogOut size={15} className="stroke-[2.5]" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="rounded-lg p-1.5 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            if (next) {
              window.dispatchEvent(new Event("close-filter-drawer"));
            }
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 ease-in-out lg:hidden ${isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="space-y-2 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5">
            <Search size={18} className="shrink-0 text-gray-400" />

            <Rb_Input
              className="w-full border-none bg-transparent text-sm outline-none h-1 placeholder:text-gray-400"
              placeholder="Search books..."
            />
          </div>

          <button
            onClick={() => navigate("/books")}
            className="block w-full rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Books
          </button>

          <button className="block w-full rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            Categories
          </button>

          <button className="block w-full rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            Rent Books
          </button>

          <button className="block w-full rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            Contact
          </button>

          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/auth")}
              className="mt-2 w-full rounded-lg bg-[#146adb] py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1057b8]"
            >
              Sign In
            </button>
          ) : (
            <>
              <div className="hidden mt-2 md:flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#146adb] text-sm font-bold text-white">
                  {userInfo?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {userInfo?.name}
                  </p>
                  <p className="text-xs text-gray-500">{userInfo?.email}</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/wishlist")}
                className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Wishlist
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cart
              </button>

              <button
                onClick={() => navigate("/my-books")}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                My Books
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg border-t border-gray-100 p-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
