"use client"

import Link from "next/link"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <Link href="#" className="flex items-center text-sm hover:text-gray-300 transition-colors">
        <FaFacebook className="w-5 h-5 mr-2" />
        Facebook
      </Link>
      <Link href="#" className="flex items-center text-sm hover:text-gray-300 transition-colors">
        <FaTwitter className="w-5 h-5 mr-2" />
        Twitter
      </Link>
      <Link href="#" className="flex items-center text-sm hover:text-gray-300 transition-colors">
        <FaInstagram className="w-5 h-5 mr-2" />
        Instagram
      </Link>
    </div>
  )
}