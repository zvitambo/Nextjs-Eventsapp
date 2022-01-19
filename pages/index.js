import React from 'react'
import {getFeaturedEvents} from '../dummy-data';
import EventList from '../components/events/event-list';


export const HomePage = () => {

    const featuredEvents = getFeaturedEvents();
    return (
        <div>
            <EventList events={featuredEvents} />
        </div>
    )
}

export default HomePage;
