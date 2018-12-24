import React from 'react';
import Muitl from 'uitl/mm.jsx'
import Product from 'service/product-service.jsx'

import PageTitle from 'component/page-title/index.jsx';

const _mm = new Muitl();
const _product = new Product();


class CategoryAdd extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      categroyList: [],
      parentId: 0,
      categroyName: ''
    }
  }
  componentDidMount(){
    this.loadCategoryList();
  }
  loadCategoryList() {
    _product.getCategoryList().then(res => {
      this.setState({
        categroyList: res
      });
    }, errMsg => {
      _mm.errorTips(errMsg);
    })
  }
  onValueChange(e) {
    let name = e.target.name,
        val = e.target.value;
    this.setState({
      [name]: val
    })
  }
  onSubmit() {
    let categroyName = this.state.categroyName.trim();
    if (categroyName) {
      _product.saveCategroy({
        parentId: this.state.parentId,
        categoryName: categroyName
      }).then(res => {
        _mm.successTips(res)
        this.props.history.push('/product-categroy/index')
      }, errMsg => {
        _mm.errorTips(errMsg)
      })
    } else {
      _mm.errorTips('请输入品类名称')
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title='品类列表'/>
        <div className="row">
          <div className="col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-md-2 control-label">所属品类</label>
                <div className="col-md-5">
                <select name="parentId" 
                  onChange={e => this.onValueChange(e)}>
                  <option value="0">根品类</option>
                  {
                    this.state.categroyList.map((categroy, index) => {
                      return <option value={categroy.id} key={index}>所有/{categroy.name}</option>
                    })
                  }
                </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">品类名称</label>
                <div className="col-md-5">
                  <input type="text" className="form-control" 
                    placeholder="请输入品类名称"
                    name="categroyName"
                    onChange={e => this.onValueChange(e)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button type="submit" className="btn btn-primary" onClick={(e) => {this.onSubmit(e)}}>提交</button>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}
export default CategoryAdd