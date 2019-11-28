import React from 'react';
import PropTypes from 'fusion:prop-types';
import ProgramContainer from '../../private/OTT/common/program/container';

const Program = props => {
    return (
        <ProgramContainer
            description={props.customFields.description}
            href={props.customFields.href}
            imageId={props.customFields.imgId}
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
