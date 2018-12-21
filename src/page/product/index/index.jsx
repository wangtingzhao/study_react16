import React from 'react';
import { Link } from 'react-router-dom'
import Muitl from 'uitl/mm.jsx'
import Product from 'service/product-service.jsx'

import Pagination from 'uitl/pagination/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'uitl/table-list/index.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _mm = new Muitl();
const _product = new Product();
import './index.scss'

class ProductList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      fristLoading: true,
      listType: 'list'
    }
  }
  componentDidMount(){
    this.loadProductList();
  }
  loadProductList() {
    let listParam = {};
    console.log(this.state)
    listParam.listType = this.state.listType
    listParam.pageNum = this.state.pageNum
    // 搜索时，传入类型和关键词
    if (this.state.listType === 'search') {
      listParam.searchType = this.state.searchType
      listParam.Keyword = this.state.searchKeyword
    }
    _product.getProductList(listParam).then(res => {
      this.setState(res, () => {
        this.setState({
          fristLoading: false
        })
      });
    }, errMsg => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg);
    })
  }
  onSearch(searchType, searchKeyword) {
    let listType = searchKeyword === '' ? 'list' : 'search';
    this.setState({
      listType: listType,
      pageNum: 1,
      searchType: searchType,
      searchKeyword: searchKeyword
    }, () => {
      this.loadProductList();
    })
  }
  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadProductList();
    })
  }
  onSetProductStatus(e, productId, currStatus) {
    let newStatus = currStatus === 1 ? 2 : 1;
    let confrimtip =  currStatus === 1 ? '确定下架该商品吗？' : '确定上架该商品吗？';
    if (window.confirm(confrimtip)) {
      _product.setProductStatus({
        productId: productId,
        status: newStatus
      }).then(res => {
        _mm.successTips(res);
        this.loadProductList()
      }, errMsg => {
        _mm.errorTips(errMsg)
      })
    }
   }
  render() {
    let tableHeads = [
      {name: '商品ID' ,width: '10%'},
      {name: '商品信息' ,width: '50%'},
      {name: '价格' ,width: '10%'},
      {name: '状态' ,width: '15%'},
      {name: '操作' ,width: '15%'}
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title='商品列表'>
          <div className="page-header-right">
            <Link to='/product/save' className='btn btn-primary'>
              <i className='fa fa-plus'></i>
              <span>添加商品</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((product, index) => {
              return (
                  <tr key={index}>
                    <th>{product.id}</th>
                    <th>
                      <p>{product.name}</p>
                      <p>{product.subtitle}</p>
                    </th>
                    <th>{product.price}</th>
                    <th>
                      <p>{product.status === 1 ? '在售' : '已下架'}</p>
                      <button className='btn btn-xs btn-warning' onClick={(e) => this.onSetProductStatus(e, product.id, product.status)}>{product.status === 1 ? '下架' : '上架'}</button>
                    </th>
                    <th>
                      <Link className='opear' to={`/product/detail/${product.id}`}>详情</Link>
                      <Link className='opear' to={`/product/save/${product.id}`}>编辑</Link>
                    </th>
                  </tr>
              )
            })
          }
        </TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={pageNum => this.onPageNumChange(pageNum)}/>
      </div>
    );
  }
}
export default ProductList