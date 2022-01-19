import React from 'react'
import Link from 'next/link';
import Button from '../ui/button';
import cssClasses from './event-item.module.css';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

const EventItem = (props) => {

    const {title, image, date, location, id} = props;
    const humanReadabledate = new Date(date).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'});
    const formattedAddress = location.replace(', ', '\n');
    const exploreLink = `/events/${id}`;

    return (
        <li className={cssClasses.item}>
        <img src={'/' + image} alt={title} />
        <div className={cssClasses.content}>
            <div className={cssClasses.summary}>
                 <h2>{title}</h2>
                <div className={cssClasses.date}>
                    <DateIcon />
                    <time>{humanReadabledate}</time>
                </div>
                <div className={cssClasses.address}>
                     <AddressIcon />
                     <address>{formattedAddress}</address>
                </div>
            </div>
            <div className={cssClasses.actions}>
                <Button link={exploreLink}>
                    <span>Explore Event</span>
                    <span className={cssClasses.icon}>
                        <ArrowRightIcon />
                    </span>
                    
                    </Button>
            
            </div>
        </div>    
        </li>
    )
}

export default EventItem;
