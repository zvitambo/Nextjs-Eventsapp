import React, { Fragment } from "react";
import Head from "next/head";
import {useRouter} from 'next/router'; 
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

export const AllEventsPage = (props) => {

  const router = useRouter();
  const {events} = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>Events Guide</title>
        <meta name='description' content='Find the lastest events here'></meta>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
};

export async function getStaticProps(){
  const events = await getAllEvents();

  return {
    props: {
      events : events
    },
    revalidate: 60
  }
}
export default AllEventsPage;
