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
                {this.props.slider.showPrevPage() && <CarrousellPrevButton onClick={this.props.slider.prevPageHandler}/> }
                {this.props.children}
                {this.props.slider.showNextPage() && <CarrousellNextButton onClick={this.props.slider.nextPageHandler}/> }
            </CarrousellComponent>
        )
    }
}

export default Slider(Carrousell, DEFAULT_PAGESIZE)