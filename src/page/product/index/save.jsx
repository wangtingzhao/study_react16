import React from 'react';

import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import Muitl from 'uitl/mm.jsx';
import Product from 'service/product-service.jsx';
import FileUploader from 'uitl/file-upload/index.jsx';
import RichEditor from 'uitl/rich-editor/index.jsx';

import './save.scss'

const _mm = new Muitl();
const _product = new Product();

class ProductSave extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      price: '',
      stock: '',
      detail: '',
      status: 1
    }
  }
  componentDidMount() {
    this.loadProduct()
  }
  loadProduct() {
    if (this.state.id) {
      _product.getProduct(this.state.id).then(res => {
        
        let subImages = res.subImages.split(',');
        res.subImages = subImages.map(imgurl => {
          return {
            uri: imgurl,
            url: res.imageHost + imgurl
          }
        })
        res.defaultDetail = res.detail
        this.setState(res)
      }, errMsg => {
        _mm.errorTips(errMsg)
      })
    }
  }
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId
    })
  }
  onUploadSuccess(res) { // 上传成功事
    let subImages = this.state.subImages;
    subImages.push(res)
    this.setState({
      subImages: subImages
    })
  }
  onUploadError(errMsg) {
    _mm.errorTips(errMsg || '上传图片失败~~~')
  }
  onImageDetele(e) {
    let index = e.target.getAttribute('index'),
        subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
          subImages: subImages
        })
  }
  onDetailValueChange(val) {
    this.setState({
      detail: val
    })
  }
  onValueChange(e){
    let name = e.target.name,
        value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  getSubImageString() {
    return this.state.subImages.map(image => image.uri).join(',')
  }
  onSubmit() {
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: Number(this.state.categoryId),
      subImages: this.getSubImageString(),
      price: Number(this.state.price),
      stock: Number(this.state.stock),
      detail: this.state.detail
    }
    if (this.state.id) {
      product.id = this.state.id
    }
    let productCheckResult = _product.checkProduct(product)
    if (productCheckResult.status) {
      _product.saveProduct(product).then(res => {
        _mm.successTips(res)
        this.props.history.push('/product/index')
      }, errMsg => {
        _mm.errorTips(errMsg)
      })
    } else {
      _mm.errorTips(productCheckResult.msg)
    }
  }
  render () {
    return ( 
    <div id="page-wrapper">
      <PageTitle title='添加商品' />
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-md-2 control-label">商品名称</label>
          <div className="col-md-5">
            <input type="text" className="form-control" 
              placeholder="请输入商品名称"
              name="name"
              value={this.state.name}
              onChange={e => this.onValueChange(e)}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">商品描述</label>
          <div className="col-md-5">
            <input type="text" className="form-control" 
              placeholder="请输入商品描述"
              name="subtitle"
              value={this.state.subtitle}
              onChange={e => this.onValueChange(e)}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">所属分类</label>
          <CategorySelector 
            categoryId={this.state.categoryId}
            parentCategoryId={this.state.parentCategoryId}
          onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}/>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">商品价格</label>
          <div className="col-md-3">
            <div className="input-group">
              <input type="number" className="form-control" 
                placeholder="价格"
                name="price"
                value={this.state.price}
                onChange={e => this.onValueChange(e)}/>
              <span className="input-group-addon">元</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">商品库存</label>
          <div className="col-md-3">
            <div className="input-group">
              <input type="number" className="form-control" 
                placeholder="库存"
                name="stock"
                value={this.state.stock}
                onChange={e => this.onValueChange(e)}/>
              <span className="input-group-addon">件</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">商品图片</label>
          <div className="col-md-10 ">
            {
              this.state.subImages.length > 0 ? this.state.subImages.map(
                (item, index) => (
                  <div className="img-ion" key={index}>
                    <img className="img" index={index}  src={item.url} />
                    <i className='fa fa-close' index={index} onClick={(e) => {this.onImageDetele(e)}}></i>
                  </div>
                )
              ) : (<div>请上传图片</div>)
            }
          </div>
          <div className="col-md-offset-2 col-md-10 file_uploade_con">
              <FileUploader 
              onSuccess={(res) => {this.onUploadSuccess(res)}}
              onError={(errMsg) => {this.onUploadError(errMsg)}}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">商品详情</label>
          <div className="col-md-10">
          <RichEditor 
            detail={this.state.detail}
            defaultDetail={this.state.defaultDetail}
            onValueChange={value => {this.onDetailValueChange(value)}}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-primary" onClick={(e) => {this.onSubmit(e)}}>提交</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default ProductSave;