import React from 'react';

class ListSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'productId',
      searchKeyWord: ''
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
    this.props.onSearch(this.state.searchType, this.state.searchKeyWord)
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
                <option value="productId">根据商品ID查询</option>
                <option value="productName">根据商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" name='searchKeyWord' onChange={(e) => this.onValChange(e)} onKeyUp={(e) => this.onSearchKeyWordKeyUp(e)} className="form-control" placeholder="关键词" />
            </div>
            <button className="btn btn-primary" onClick={(e) => {this.onSearch()}}>搜索</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListSearch;