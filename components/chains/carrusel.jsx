import React, { PureComponent } from 'react';
import Carousell from '../private/common/carousell';
import Title from '../private/common/title';
import PropTypes from 'fusion:prop-types';
export default class Carrusel extends PureComponent {
    render() {
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
    }
}

Carrusel.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({ label: 'Titulo' })
    })
};
