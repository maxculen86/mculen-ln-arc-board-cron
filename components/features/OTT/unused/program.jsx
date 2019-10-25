import React from 'react';
import PropTypes from 'fusion:prop-types';
import ProgramContainer from '../../private/OTT/common/program/container';

const Program = () => {
    return (
        <ProgramContainer
            description={this.props.customFields.description}
            href={this.props.customFields.href}
            imageId={this.props.customFields.imgId}
        />
    );
};

Program.propTypes = {
    customFields: PropTypes.shape({
        description: PropTypes.string,
        href: PropTypes.string,
        imgId: PropTypes.string.tag({ label: 'Id de Imagen' })
    })
};
export default Program;
