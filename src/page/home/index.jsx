import React from 'react';

import './index.css'

class Home extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='page-warpper'>
        <button className='btn btn-default'>test</button>
      </div>
    )
  }
}
export default Home