import React from 'react';
import PropTypes from 'fusion:prop-types';
import Title from '../private/common/title';

const Grilla = () => {
    return (
        <section className="slider">
            {this.props.customFields.title && (
                <Title
                    className="section-title"
                    title={this.props.customFields.title}
                />
            )}
            {this.props.children}
        </section>
    );
}

Grilla.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({ label: 'Titulo' })
    })
};

export default Grilla;
