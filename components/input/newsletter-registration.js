import {useRef} from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {

  const emailRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API


    const email = emailRef.current.value;
    

   //const regex = '^\S+@\S+$';
    //if (!regex.email) return;
    const emailBody = {email : email}

    fetch('/api/newsletter', {method: 'POST', body: JSON.stringify(emailBody), headers:{ 'content-type': 'application/json'},})
    .then( (response) => response.json()).then(data => console.log(data));

  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='text'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
