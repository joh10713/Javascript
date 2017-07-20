import React from 'react';
import './index.css';

function Square(props) {
  var className;
  if(props.value === 'X')
  {
	className="square-x";
  }
  else
  {
	className="square-o";
  }
  return (
	<button className={className} onClick={props.onClick} >
      {props.value}
    </button>
  );
}

export default Square