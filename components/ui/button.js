import React from 'react'
import Link from 'next/link';
import cssClasses from './button.module.css';



 const Button = (props) => {
  if(props.link){
    return (
      <Link href={props.link}>
        <a className={cssClasses.btn}> {props.children}</a> 
      </Link>
  );
  }

  return (
    <button 
    className={cssClasses.btn}
    onClick={props.onClick}
    >
       {props.children}
    </button>
  );
}

export default Button;
