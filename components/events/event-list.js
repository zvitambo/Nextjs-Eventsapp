import React from 'react';
import EventItem from './event-item';
import cssClasses from './event-list.module.css';

const EventList = (props) => {

    const {events} = props;
    return (
        <ul className={cssClasses.list}>
            {events.map(event => <EventItem 
            key={event.id}
            id={event.id}
            title={event.title}
            image={event.image}
            date={event.date}
            location={event.location}
            />)}
        </ul>
    )
}

export default EventList;
