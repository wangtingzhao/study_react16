import Muitl from 'uitl/mm.jsx'

const _mm = new Muitl();

class Order {
  getOrderList(listParam) {
    let url = '', data = {};
    if (listParam.listType === 'list') { // 商品列表接口
      url = '/manage/order/list.do';
      data.pageNum = listParam.pageNum;
    } else if (listParam.listType === 'search') {// 商品搜索列表接口
      url = '/manage/order/search.do';
      data.pageNum = listParam.pageNum;
      data.orderNo = listParam.orderNo
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    })
  }
  getOrderDetail(orderNumber) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/detail.do',
      data: {
        orderNo: orderNumber
      }
    })
  }
  sendGoods(orderNumber) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/send_goods.do',
      data: {
        orderNo: orderNumber
      }
    })
  }
} 

export default Order;