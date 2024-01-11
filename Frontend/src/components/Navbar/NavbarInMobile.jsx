import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavbarInMobile.module.css';

const NavbarInMobile = () => {
    const [isNavbarOpen, setNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    return (
        <>
            <div className="navbar-mobile flex justify-between items-center">
                <div className="navbar-mobile__logo">
                    <div className={styles.logo}>
                        <Link style={{ color: 'white' }} to="/">SAFE<span style={{ color: '#e50087' }}>LENS</span></Link>
                    </div>
                </div>

                <div className="navbar-mobile__menu items text-white pr-10" onClick={toggleNavbar}>
                    {isNavbarOpen ? (
                        <button
                            type="button"
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-black-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            aria-label="Close"
                        >
                            <span class="sr-only">Close main menu</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            data-collapse-toggle="navbar-solid-bg"
                            type="button"
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-black-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            aria-controls="navbar-solid-bg"
                            aria-expanded="false"
                        >
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    )}
                </div>


            </div>
            <div>
                <div className={styles.mobileMenu}>
                    <div>
                        <li><Link to={'/'} className="menu__item">Home</Link></li>

                        <li><Link to={'/about-us'} className="menu__item">About Us</Link></li>

                        <li><Link to={'/contact-us'} className="menu__item">Contact Us</Link></li>

                        <li><Link to={'/auth/signin'} className="menu__item">Login / Sign Up</Link></li>

                        <li><Link to={'/admin/dashboard'} className="menu__item">Admin</Link></li>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarInMobile;
