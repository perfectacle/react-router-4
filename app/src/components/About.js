import React, {Component} from 'react/lib/React';

export default class About extends Component {
  render() {
    return(
      <div>
        <h2>Aboutbzsq3ㅇㅇa</h2>
        <div>{this.props.children}</div>
      </div>
    );
  }
}