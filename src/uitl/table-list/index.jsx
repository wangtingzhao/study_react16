import React from 'react';

class TableList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isFristLoading: true
    }
  }
  componentWillReceiveProps() {
    this.setState({
      isFristLoading: false
    })
  }
  render() {
    let listBody = this.props.children
    let listinfo = (
      <tr>
        <th colSpan={this.props.tableHeads.length} className='text-center'>
          {this.state.isFristLoading ? '正在加载数据中...' : '找不到相应的数据~~'}
        </th>
      </tr>
    );
    let tableBody = listBody.length > 0 ? listBody : listinfo;
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {
                  this.props.tableHeads.map((item, index) => {
                    if (typeof item === 'object') {
                      return (
                        <th key={index} width={item.width}>{item.name}</th>
                      )
                    } else {
                      return (
                        <th key={index}>{item}</th>
                      )
                    }
                    
                  })
                }
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableList;