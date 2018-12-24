import Muitl from 'uitl/mm.jsx'

const _mm = new Muitl();

class Product {
  getProductList(listParam) {
    let url = '', data = {};
    if (listParam.listType === 'list') { // 商品列表接口
      url = '/manage/product/list.do';
      data.pageNum = listParam.pageNum;
    } else if (listParam.listType === 'search') {// 商品搜索列表接口
      url = '/manage/product/search.do';
      data.pageNum = listParam.pageNum;
      data[listParam.searchType] = listParam.Keyword
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    })
  }
  setProductStatus(productInfo) { // 修改商品状态
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: productInfo
    })
  }
  checkProduct(product) { // 校验字段填写
    let Result = {
      status: true,
      msg: '成功'
    }
    if (typeof product.name !== 'string' || product.name.length === 0) {
      return {
        status: false,
        msg: '商品名不能为空'
      }
    }
    if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
      return {
        status: false,
        msg: '商品描述不能为空'
      }
    }
    console.log(product.categoryId > 0)
    if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
      return {
        status: false,
        msg: '选择商品品类'
      }
    }
    if (typeof product.price !== 'number' || !(product.price >= 0)) {
      return {
        status: false,
        msg: '金额不能为空'
      }
    }
    if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
      return {
        status: false,
        msg: '库存不能为空'
      }
    }
    return Result
  }
  saveProduct(product) { // 新增及更新商品
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: product
    })
  }
  // 品类相关
  getCategoryList(parentCategoryId) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentCategoryId || 0
      }
    })
  }
  getProduct(productId) { // 商品详情
    return _mm.request({
      type: 'post',
      url: '/manage/product/detail.do',
      data: {
        productId: productId || 0
      }
    })
  }
  updataCategoryName(product) { // 修改品类名称
    return _mm.request({
      type: 'post',
      url: '/manage/category/set_category_name.do',
      data: product
    })
  }
  saveCategroy(product) { //添加品类
    return _mm.request({
      type: 'post',
      url: '/manage/category/add_category.do',
      data: product
    })
  }
} 

export default Product;