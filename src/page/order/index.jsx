import React from 'react';
import { Link } from 'react-router-dom'
import Muitl from 'uitl/mm.jsx'
import Order from 'service/order-service.jsx'

import Pagination from 'uitl/pagination/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'uitl/table-list/index.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _mm = new Muitl();
const _order = new Order();

class OrderList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      fristLoading: true,
      listType: 'list',
      orderNumber: ''
    }
  }
  componentDidMount(){
    this.loadOrderList();
  }
  loadOrderList() {
    let listParam = {};
    console.log(this.state)
    listParam.listType = this.state.listType
    listParam.pageNum = this.state.pageNum
    // 搜索时，传入类型和关键词
    if (this.state.listType === 'search') {
      listParam.orderNo = this.state.orderNumber;
    }
    _order.getOrderList(listParam).then(res => {
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
  onSearch(orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search';
    this.setState({
      listType: listType,
      pageNum: 1,
      orderNumber: orderNumber
    }, () => {
      this.loadOrderList();
    })
  }
  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadOrderList();
    })
  }

  render() {
    let tableHeads = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作']
    return (
      <div id="page-wrapper">
        <PageTitle title='订单列表' />
        <ListSearch onSearch={(orderNumber) => {this.onSearch(orderNumber)}}/>
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((order, index) => {
              return (
                  <tr key={index}>
                    <th> <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link></th>
                    <th>{order.receiverName}</th>
                    <th>{order.statusDesc}</th>
                    <th>￥{order.payment}</th>
                    <th>{order.createTime}</th>
                    <th>
                      <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
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
export default OrderList