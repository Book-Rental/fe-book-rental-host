import {

  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
import { IoLogoFacebook } from "react-icons/io";
import { Rb_Button, Rb_Icon, Rb_Image } from "rentbook";

function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-[95%] px-6 py-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Rb_Image
                src="/logo.png"
                alt="BookStore"
                className="h-12 w-auto"
              />

              <div>
                <h2 className="text-2xl font-bold text-white">
                  BookStore
                </h2>
                <p className="text-sm text-gray-400">
                  Buy • Rent • Read
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-gray-400">
              Discover thousands of books from your favorite authors.
              Buy, Rent or Sell books easily with our secure and
              user-friendly platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li className="cursor-pointer transition hover:text-white">
                Home
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Books
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Rent Books
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Categories
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Categories
            </h3>

            <ul className="space-y-3">
              <li className="cursor-pointer transition hover:text-white">
                Fiction
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Programming
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Academics
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Competitive Exams
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Novels
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#146adb]" />
                <span>Hyderabad, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#146adb]" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#146adb]" />
                <span>support@bookstore.com</span>
              </div>

              {/* Social Icons */}
              <div className="mt-6 flex gap-1 h-12">
                <Rb_Button className="!rounded-full !bg-gray-900   transition hover:!bg-gray-800">
                  <Rb_Icon icon={IoLogoFacebook} size={18} />
                </Rb_Button>

                <Rb_Button className="!rounded-full !bg-gray-900  transition hover:!bg-gray-800">
                  <Rb_Icon icon={BiLogoInstagramAlt} size={18} />
                </Rb_Button>

                <Rb_Button className="!rounded-full !bg-gray-900  transition hover:!bg-gray-800">
                   <Rb_Icon icon={FaXTwitter} size={18} />
                </Rb_Button>

                <Rb_Button className="!rounded-full !bg-gray-900  transition hover:!bg-gray-800">
                 <Rb_Icon icon={ImLinkedin} size={18} />
                </Rb_Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p>
              © {new Date().getFullYear()} BookStore. All Rights Reserved.
            </p>

            <div className="flex gap-6">
              <button className="transition hover:text-white">
                Privacy Policy
              </button>

              <button className="transition hover:text-white">
                Terms & Conditions
              </button>

              <button className="transition hover:text-white">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;