import React, { PureComponent } from 'react'
import CarrousellComponent from '../components/carrousell'
import CarrousellNextButton from './carrousellNextButton'
import CarrousellPrevButton from './carrousellPrevButton'
import Slider from '../hocs/slider'

const DEFAULT_PAGESIZE = 4;

class Carrousell extends PureComponent {
    
    render() {
        return (
            <CarrousellComponent>
                {this.props.slider.hasPrevPage() && <CarrousellPrevButton onClick={this.props.slider.prevButtonHandler}/> }
                {this.props.children}
                {this.props.slider.hasNextPage() && <CarrousellNextButton onClick={this.props.slider.nextButtonHandler}/> }
            </CarrousellComponent>
        )
    }
}

export default Slider(Carrousell, DEFAULT_PAGESIZE)