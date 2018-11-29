import React from 'react';
import ReactDom from 'react-dom'

import './index.scss'
import 'font-awesome/css/font-awesome.min.css'

let style = {
  'color': 'red',
  'fontSize': '16px'
}

let jsx = <div className='jsx' style={style} ><i className='fa fa-camera-retro'></i>jsx....</div>;
ReactDom.render(
  jsx,
  document.getElementById('root')
)