import React, { Component } from 'react';
import ProgramComponent from './component';
import withImage from '../../../common/hocs/withImage';
import withCorrectHref from '../../../common/hocs/withCorrectHref';

class Program extends Component {
    render() {
        return (
            <ProgramComponent
                description={this.props.description}
                image={this.props.image}
                href={this.props.href}
            />
        );
    }
}

export default withImage(withCorrectHref(Program), null, true);
