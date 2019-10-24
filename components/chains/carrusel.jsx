import React from 'react';
import PropTypes from 'fusion:prop-types';
import Carousell from '../private/common/carousell';
import Title from '../private/common/title';

const Carrusel = () => {
    return (
        <section>
            {this.props.customFields.title && (
                <Title
                    className={'section-title'}
                    title={this.props.customFields.title}
                />
            )}
            <Carousell>{this.props.children}</Carousell>
        </section>
    );
};

Carrusel.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({ label: 'Titulo' })
    })
};

export default Carrusel