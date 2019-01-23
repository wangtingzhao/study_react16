import React from 'react';

class ListSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: ''
    }
  }
  onValChange(e) {
    let name = e.target.name,
        value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  onSearch() {
    this.props.onSearch(this.state.orderNumber)
  }
  onSearchKeyWordKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSearch();
    }
  }
  render () {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control" name='searchType' onChange={(e) => this.onValChange(e)}>
                <option value="">根据订单号查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" name='orderNumber' onChange={(e) => this.onValChange(e)} onKeyUp={(e) => this.onSearchKeyWordKeyUp(e)} className="form-control" placeholder="请输入订单号" />
            </div>
            <button className="btn btn-primary" onClick={(e) => {this.onSearch()}}>搜索</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListSearch;