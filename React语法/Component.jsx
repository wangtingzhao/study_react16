
// 基础组件写法
function Component() {
  return <div>I am Wang</div>
}
class ES6Componet extends React.Component {
  render(){
    return <div>I am ES6</div>
  }
}
ReactDom.render(
  <div>
    <Component></Component>
    <ES6Componet></ES6Componet>
  </div>, 
  document.getElementById('root')
)
// ES6 写法1
class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Wang'
    }
  }
  render(){
    setTimeout(()=> {
      this.setState({
        name: 'Wang TZ'
      })
    }, 2000)
    return <div>I am {this.state.name}</div>
  }
}

ReactDom.render(
  <div>
    <Component name='Wang 258'></Component>
  </div>, 
  document.getElementById('root')
)

// ES6 写法2 props组件传参
class Component extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return <div>I am {this.props.name}</div>
  }
}

ReactDom.render(
  <div>
    <Component name='Wang 258'></Component>
  </div>, 
  document.getElementById('root')
)

// 事件处理1
class Component extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: 'WangTZ',
      age: 18
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({
      age: this.state.age + 1 
    })
  }
  render() {
    return (
      <div>
        <p>{this.state.name}</p>
        <p>{this.state.age}</p>
        <button onClick={this.handleClick}>加一岁</button>
      </div>
    )
  }
}
ReactDom.render(
  <div>
    <Component name='Wang 258'></Component>
  </div>, 
  document.getElementById('root')
)

// 事件处理2 this指向用箭头函数处理
class Component extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: 'WangTZ',
      age: 18
    }
  }
  handleClick() {
    this.setState({
      age: this.state.age + 1 
    })
  }
  onChangVal(e) {
    this.setState({
      age: e.target.value
    })
  }
  render() {
    return (
      <div>
        <p>{this.state.name}</p>
        <p>I Am {this.state.age} years old</p>
        <button onClick={(e) => {this.handleClick(e)} }>加一岁</button>
        <input type="text" onChange={(e) => { this.onChangVal(e)} }/>
      </div>
    )
  }
}
ReactDom.render(
  <div>
    <Component name='Wang 258'></Component>
  </div>, 
  document.getElementById('root')
)

//  组件组合方式
class Component extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: 'WangTZ',
      age: 18
    }
  }
  handleClick() {
    this.setState({
      age: this.state.age + 1 
    })
  }
  onChangVal(e) {
    this.setState({
      age: e.target.value
    })
  }
  render() {
    return (
      <div>
        <p>{this.state.name}</p>
        <p>I Am {this.state.age} years old</p>
        <button onClick={(e) => {this.handleClick(e)} }>加一岁</button>
        <input type="text" onChange={(e) => { this.onChangVal(e)} }/>
      </div>
    )
  }
}
class Title extends React.Component{
  constructor(props) {
    super(props)
  }
  render(props) {
    return <h1>{this.props.children}</h1>
  }
}
class App extends React.Component{
  render() {
    return (
      <div className=''>
        {/* 容器式组件 */}
        <Title>
          <span> APP span</span>
          <a href="">link</a>
        </Title>
        <hr/>
        {/* 单纯组件 */}
        <Component />
      </div>
    )
  }
}
ReactDom.render(
  <div>
    <App/>
  </div>, 
  document.getElementById('root')
)  

// 子组件向父组件传值
class Child extends React.Component{
  constructor(props){
    super(props);
  }
  handleClick() {
    this.props.bgColor('red')
  }
  render() {
    return (
      <div>
        <p> 父组件的背景色 {this.props.bgColor}</p>
        <button onClick={(e) => {this.handleClick(e)} }>改变父组件bgColor颜色</button>
      </div>
    )
  }
}
class Father extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      bgColor: '#999'
    }
  }
  onChangebgColor(color) {
    this.setState({
      bgColor: color
    })
  }
  render(props) {
    return (
      <div style={{background: this.state.bgColor}}>
        <Child bgColor={this.state.bgColor} bgColor={(color) => {this.onChangebgColor(color)}}/>
      </div>
    )
  }
}

ReactDom.render(
  <div>
    <Father/>
  </div>, 
  document.getElementById('root')
)

// 组件数据传递和状态提升

class Child1 extends React.Component{
  constructor(props){
    super(props);
  }
  handleClick() {
    this.props.child2bgColor('red')
  }
  render() {
    return (
      <div>
        <p> Child1:</p>
        <button onClick={(e) => {this.handleClick(e)} }>改变child2bgColor颜色</button>
      </div>
    )
  }
}

class Child2 extends React.Component{
  constructor(props){
    super(props);
  }
  handleClick() {
    this.props.child2bgColor('red')
  }
  render() {
    return (
      <div style={{background: this.props.bgColor}}>
        <p> child2的背景色 {this.props.bgColor}</p>
      </div>
    )
  }
}

class Father extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      child2BgColor: '#999'
    }
  }
  onChangeChild2bgColor(color) {
    this.setState({
      child2BgColor: color
    })
  }
  render(props) {
    return (
      <div>
        <Child1 child2bgColor={(color) => {this.onChangeChild2bgColor(color)}}/>
        <Child2 bgColor={this.state.child2BgColor} />
      </div>
    )
  }
}