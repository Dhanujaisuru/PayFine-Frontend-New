import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-100 p-4 sm:p-6 text-gray-700">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 select-none">PayFine.LK</h1>
                    <p className="text-sm mt-1">Pay fines easily.</p>
                    <p className="text-sm">Anywhere, anytime...</p>
                    <div className="border-t border-gray-300 my-4"></div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3">Our links</h3>
                        <ul className="space-y-1 sm:space-y-2">
                            <li><a href="#" className="hover:text-blue-500">Home</a></li>
                            <li><a href="#" className="hover:text-blue-500">About us</a></li>
                            <li><a href="#" className="hover:text-blue-500">View map</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3">Services</h3>
                        <ul className="space-y-1 sm:space-y-2">
                            <li><a href="#" className="hover:text-blue-500">Fine pay</a></li>
                            <li><a href="#" className="hover:text-blue-500">Fine appeal</a></li>
                            <li><a href="#" className="hover:text-blue-500">License status</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3">Support</h3>
                        <ul className="space-y-1 sm:space-y-2">
                            <li><a href="#" className="hover:text-blue-500">Contact us</a></li>
                            <li><a href="#" className="hover:text-blue-500">FAQ</a></li>
                            <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-500">Terms of Services</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3">Login</h3>
                        <ul className="space-y-1 sm:space-y-2">
                            <li><a href="#" className="hover:text-blue-500">Driver</a></li>
                            <li><a href="#" className="hover:text-blue-500">Police Officer</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-300 mt-4 sm:mt-6 pt-4 text-sm text-center select-none">
                    &copy; {new Date().getFullYear()} PayFine.LK - All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;