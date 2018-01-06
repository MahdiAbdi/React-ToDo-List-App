import React, { Component } from 'react'

class Home extends Component {
  render() {
    const { match } = this.props;
    console.log({match})
    return(
      <div>
        <h2>Home</h2>
      </div>
    )
  }
}

export default Home;
