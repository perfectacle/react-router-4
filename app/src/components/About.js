import React, {Component} from 'react/lib/React';

export default class About extends Component {
  render() {
    return(
      <div>
        <h2>Aboutbzsqaaa</h2>
        <div>{this.props.children}</div>
      </div>
    );
  }
}