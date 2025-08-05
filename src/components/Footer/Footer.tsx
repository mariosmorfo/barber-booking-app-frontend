import React from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react'

 const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/">
              <img
                src="https://uploadthingy.s3.us-west-1.amazonaws.com/cRs3FS57yXxbEHYYbbPVtW/fcLogo.svg"
                alt="Fresh Cuts Logo"
                className="h-12 mb-6"
              />
            </Link>
            <p className="mb-6">
              Premium barbering services in a modern, comfortable environment.
              We're dedicated to helping you look and feel your best.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
             
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-blue-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="hover:text-blue-500 transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-blue-500 transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="hover:text-blue-500 transition-colors"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-0.5 text-blue-500" />
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p>9:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-0.5 text-blue-500" />
                <div>
                  <p className="font-medium">Saturday</p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-0.5 text-blue-500" />
                <div>
                  <p className="font-medium">Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-blue-500" />
                <span>Pipinou 1, Athens, 11792</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-blue-500" />
                <span>210 9036290</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-blue-500" />
                <span>info@freshcuts.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Fresh Cuts Barber Studio. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;