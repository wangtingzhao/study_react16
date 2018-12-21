import React from 'react';

import './category-selector.scss'

import Muitl from 'uitl/mm.jsx'
import Product from 'service/product-service.jsx'

const _mm = new Muitl();
const _product = new Product();

class CategorySelector extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }
  componentDidMount() {
    this.loadFirstCategory()
  }
  componentWillReceiveProps(nextProps) {
    let categoryId = this.props.categoryId !== nextProps.categoryId,
        parentCategoryId = this.props.parentCategoryId !== nextProps.parentCategoryId;
    if (!categoryId && !parentCategoryId) return;
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: 0
      })
    } else {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, () => {
        parentCategoryId && this.loadSecondCategory()
      })
    }
  }
  // 获取一级分类数据
  loadFirstCategory() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      }, errMsg => {
        _mm.errorTips(errMsg);
      });
    })
  }
  // 获取二级分类数据
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      }, errMsg => {
        _mm.errorTips(errMsg);
      });
    })
  }
  // 获取一级分类id
  onFirstCategoryChange(e) {
    if (this.props.readOnly) return;
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      this.loadSecondCategory();
      this.onPropsCategoryChange();
    })
  }
  // 获取二级分类id
  onSecondCategoryChange(e) {
    if (this.props.readOnly) return;
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue
    }, () => {
      this.onPropsCategoryChange()
    })
  }
  onPropsCategoryChange() {
    // 判断是不是一个方法
    let oncategoryChange = typeof this.props.onCategoryChange === 'function';
    if (this.state.secondCategoryId) { //二级品类
      oncategoryChange && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
    } else { //一级品类
      oncategoryChange && this.props.onCategoryChange(this.state.firstCategoryId, 0);
    }
  }
  render () {
    return (
      <div className="col-md-10">
        <select className='form-control cate-select' 
          readOnly={this.props.readOnly}
          value={this.state.firstCategoryId}
          onChange={(e) => this.onFirstCategoryChange(e)}>
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.map((item, index) => {
              return <option key={index} value={item.id}>{item.name}</option>
            })
          }
        </select>
        {this.state.secondCategoryList.length > 0 ? 
          <select className='form-control cate-select' 
          readOnly={this.props.readOnly}
          value={this.state.secondCategoryId}
          onChange={(e) => this.onSecondCategoryChange(e)}>
          <option value="">请选择一级分类</option>
          {
            this.state.secondCategoryList.map((item, index) => {
              return <option key={index} value={item.id}>{item.name}</option>
            })
          }
        </select> : null
        }
        
      </div>
    );
  }
}

export default CategorySelector;