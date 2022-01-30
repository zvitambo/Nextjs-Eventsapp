import React from 'react';
import Head from 'next/head';
import NewsLetterRegistration from "../components/input/newsletter-registration";
import {getFeaturedEvents} from '../helpers/api-util';
import EventList from '../components/events/event-list';


export const HomePage = (props) => {

    const {events} = props;

  
    return (
        <div>
            <Head>
                <title>Events Guide</title>
                <meta name='description' content='Find the lastest events here'>
                    
                </meta>

            </Head>
            <NewsLetterRegistration />
            <EventList events={events} />
        </div>
    )
}

export async function getStaticProps(){
  const featuredEvents = await getFeaturedEvents();
  
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}

export default HomePage;
