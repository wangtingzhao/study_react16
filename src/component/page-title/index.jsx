import React from 'react'

class PgaeTitle extends React.Component{
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    document.title = this.props.title + ' HAPPY MMALL'
    console.log(this.props)
  }

  render() {
    return (
      <div className='Page-Title'>
        <div className='row'>
            <div className='col-md-12'>
                <h1 className='page-header'>{this.props.title}</h1>
                {this.props.children}
            </div>
        </div>
      </div>
    )
  }
}

export default PgaeTitle;