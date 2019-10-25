import React from 'react';
import PropTypes from 'fusion:prop-types';
import Title from '../private/common/title';

const Grilla = props => {
    return (
        <section className="slider">
            {props.customFields.title && (
                <Title
                    className="section-title"
                    title={props.customFields.title}
                />
            )}
            {props.children}
        </section>
    );
};

Grilla.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({ label: 'Titulo' })
    })
};

export default Grilla;
