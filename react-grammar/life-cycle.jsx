
class Component extends React.Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      data: 'old state'
    }
    console.log('初始化数据','constructor')
    console.log(this.props)
  }
  // 点击事件
  handleClick() {
    console.log('更新数据')
    this.setState({
      data: 'new state'
    })
  }
  // 组件将要挂载
  componentWillMount() {
    console.log('componentWillMount')
  }
  // 组件挂载完成
  componentDidMount() {
    console.log('componentDidMount')
  }
  // 接受父组件的props
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
  // 自组件是不是应该更新
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true;
  }
  // 组件将要更新 
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  // 组件更新完成
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  // 组件销毁时
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  // 渲染
  render() {
    console.log('render')
    return (
      <div>
        <div>props: {this.props.data}</div>
        <button onClick={(e) => this.handleClick()}>更新</button>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: 'old Props',
      hasChild: true
    }
  }
  onPropsChange() {
    console.log('更新props')
    this.setState({
      data: 'new Props'
    })
  }
  ondestoryChild() {
    console.log('干掉子组件')
    this.setState({
      hasChild: false
    })
  }
  render() {
    return (
      <div>
        {
          this.state.hasChild ?  <Component data={this.state.data}/> : null
        }
        <button onClick={() => this.onPropsChange()}>改变Props</button>
        <button onClick={() => this.ondestoryChild()}>干掉子组件</button>
      </div>
    );
  }
}
