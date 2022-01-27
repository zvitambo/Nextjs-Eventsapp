import Head from "next/head";
import React, {Fragment, useEffect, useState} from "react";
import { useRouter } from "next/router";
import useSWR from 'swr';
import axios from "axios";
import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';


export const FilteredEventsPage = (props) => {

  const [loadedEvents, setLoadedEvents] = useState([]);

  const router = useRouter();
  const filteredData = router.query.slug;

  const address = 'https://events-app-nextjs-a8083-default-rtdb.firebaseio.com/events.json';
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

//const {data, error} = useSWR('https://events-app-nextjs-a8083-default-rtdb.firebaseio.com/events.json');

//const data = fetch('https://events-app-nextjs-a8083-default-rtdb.firebaseio.com/events.json').then( res => res.json()).then( response =>  response)

console.log('data', data);

console.log('error', error);

useEffect(() => {
  if(data){
    const events = []; 

    for (let key in data){
        events.push(
            {
                id: key,
                ...data[key]
            }
        )
    } 
    console.log('events', events)
    setLoadedEvents(events);
  }
}, [data]);


  if (!loadedEvents) {
    return <p className='center'>Loading ...</p>;
  }
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];
  const numberYear = +filteredYear;
  const numberMonth = +filteredMonth;

  if(isNaN(numberYear) 
  || isNaN(numberMonth)
  || numberMonth < 1 
  || numberMonth > 12
  || error){
    return (
      <Fragment>
        <Head>
          <title>Events Guide</title>
          <meta
            name='description'
            content={`All events for month and year ${numberMonth}\ ${numberYear}`}
          ></meta>
        </Head>
        <ErrorAlert>
          <p className='center'> Invalid Filter, please adjust your values </p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show all Events </Button>
        </div>
      </Fragment>
    );   
      
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numberYear && eventDate.getMonth() === numberMonth - 1;
  });


//const {filteredEvents} = props;

if (!filteredEvents || filteredEvents.length === 0){
  return (
    <Fragment>
   <ErrorAlert> <p className='center'> No Matching Events Found </p></ErrorAlert>
    <div className='center'>
        <Button link='/events'>Show all Events </Button>
    </div>
    </Fragment>
  ) 

}



const date = new Date(numberYear, numberMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date}/>
     <EventList events={filteredEvents} />
    </Fragment>
  );
};

// export async function getServerSideProps(context){
// const {params} = context;

// const filteredData = params.slug;

// const filteredYear = filteredData[0];
//   const filteredMonth = filteredData[1];
//   const numberYear = +filteredYear;
//   const numberMonth = +filteredMonth;

// if(isNaN(numberYear) 
//   || isNaN(numberMonth)
//   || numberMonth < 1 
//   || numberMonth > 12){
//     return (
//       {
//         hasError: true,
//         // notFound: true,
//         // redirect: '/error'
//       }
//     ) 
  
      
//   }
// const filteredEvents = await getFilteredEvents({
//   year: numberYear,
//   month: numberMonth
// });


// return {
//   props:{
//     filteredEvents: filteredEvents,
//     date: {
//       year : numberYear,
//       month : numberMonth
//     }
//   }
// }

// }

export default FilteredEventsPage;
