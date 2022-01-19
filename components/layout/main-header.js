import React from 'react';
import Link from 'next/link';
import cssClasses from './main-header.module.css';

const Header = (props) => {
    return (
        <header className={cssClasses.header}>
            <div className={cssClasses.logo}>
     <Link href='/'>NextEvents</Link>
            </div>
            <nav className={cssClasses.navigation}>
                <ul>
                    <li>
                        <Link href='/events'> Browse All Events</Link>
                    </li>

                </ul>

            </nav>
            
        </header>
    )
}

export default Header;
