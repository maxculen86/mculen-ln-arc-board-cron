import { PureComponent } from 'react';
import GetCajaCollection from '../../private/LN/api/v1/home/chains/getCajacollection';

class CajaCollection extends PureComponent {
    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        try {
            return { ...this.props };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default GetCajaCollection(CajaCollection);
