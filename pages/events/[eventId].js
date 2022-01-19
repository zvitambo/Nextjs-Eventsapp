import React, {Fragment} from 'react'
import {useRouter} from 'next/router';
import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

export const EventDetail = () => {

    const router = useRouter();
    const eventId = router.query.eventId;    
    const event = getEventById(eventId);

    if(!event){
        return <ErrorAlert><p> No event found!</p></ErrorAlert>;
    } 

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics 
            imageAlt={event.title}
            image={event.image}
            date={event.date}
            address={event.location}/>
            <EventContent>
    <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}
export default EventDetail;
