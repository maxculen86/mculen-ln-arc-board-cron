import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import ProgramContainer from '../../private/OTT/common/containers/program';

class Program extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ProgramContainer
                description={this.props.customFields.description}
                href={this.props.customFields.href}
                imgSrc={this.props.customFields.imgSrc}
            />
        );
    }
}

Program.propTypes = {
    customFields: PropTypes.shape({
        description: PropTypes.string,
        href: PropTypes.string,
        imgSrc: PropTypes.string
    })
};
export default Program;
