import React, { PureComponent } from 'react'
import CarousellPrevButtonComponent from '../components/carousellPrevButton'
export default class CarousellPrevButton extends PureComponent {

  render() {
    return (
      <CarousellPrevButtonComponent onClick={this.props.onClick} />
    )
  }
}
