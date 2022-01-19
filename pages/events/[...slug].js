import React, {Fragment} from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';


export const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;
  if (!filteredData) {
    return <p className='center'>Loading ...</p>;
  }
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];
  const numberYear = +filteredYear;
  const numberMonth = +filteredMonth;

  if(isNaN(numberYear) 
  || isNaN(numberMonth)
  || numberMonth < 1 
  || numberMonth > 12){
    return (
      <Fragment>
        <ErrorAlert>
        <p className='center'> Invalid Filter, please adjust your values </p>
        </ErrorAlert>
      
      <div className='center'>
          <Button link='/events'>Show all Events </Button>
      </div>
      </Fragment>
    ) 
  
      
  }
const filteredEvents = getFilteredEvents({
  year: numberYear,
  month: numberMonth
});

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

export default FilteredEventsPage;
