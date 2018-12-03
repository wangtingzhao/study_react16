import React from 'react';
import RCpagination from 'rc-pagination';

import 'rc-pagination/dist/rc-pagination.min.css'

class pagination extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RCpagination {...this.props} 
        hideOnSinglePage
        showQuickJumper/>
    );
  }
}

export default pagination;