import React from 'react';
import { Link } from 'react-router-dom'
import Muitl from 'uitl/mm.jsx'
import Product from 'service/product-service.jsx'

import TableList from 'uitl/table-list/index.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _mm = new Muitl();
const _product = new Product();


class CategoryList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categroyid || 0
    }
  }
  componentDidMount(){
    this.loadCategoryList();
  }
  componentDidUpdate(prevProsp,prevState) {
    console.log(this.props.match)
    let oldPath = prevProsp.location.pathname,
        newPath = this.props.location.pathname,
        newId = this.props.match.params.categroyid || 0;
        console.log(oldPath, newPath, newId)
    if (oldPath !== newPath) {
      this.setState({
        parentCategoryId: newId
      }, () => {
        this.loadCategoryList()
      })
    }
  }
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(res => {
      this.setState({
        list: res
      });
    }, errMsg => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg);
    })
  }
  onUpdataName(categoryId, categoryName) {
    let nweName = window.prompt('请输入品类名称', categoryName);
    if (nweName) {
      _product.updataCategoryName({
        categoryId: categoryId,
        categoryName: nweName
      }).then(res => {
        _mm.successTips(res)
        this.loadCategoryList()
      }, errMsg => {
        _mm.errorTips(errMsg)
      })
    }
  }
  render() {
    let listBody = this.state.list.map((category, index) => {
      return (
          <tr key={index}>
            <th>{category.id}</th>
            <th>{category.name}</th>
            <th>
              <a href="javascript:;" className="opear"
                onClick={e => this.onUpdataName(category.id, category.name)}>修改名称</a>
                {
                  category.parentId === 0 ? <Link to={`/product-categroy/index/${category.id}`}>查看子品类</Link> : null
                }
            </th>
          </tr>
      );
    });
    return (
      <div id="page-wrapper">
        <PageTitle title='品类列表'> 
          
        <div className="page-header-right">
            <Link to='/product-categroy/add' className='btn btn-primary'>
              <i className='fa fa-plus'></i>
              <span>添加品类</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            父品类ID: {this.state.parentCategoryId}
          </div>  
        </div>
        <TableList tableHeads={['品类ID','品类名称','操作']}>
        {listBody}
        </TableList>
      </div>
    );
  }
}
export default CategoryList