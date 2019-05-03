import React, { Component } from 'react';
import Title from '../private/common/title';
import PropTypes from 'fusion:prop-types';

export default class Grilla extends Component {
    render() {
        return (
            <section className={'slider'}>
                {this.props.customFields.title && (
                    <Title
                        className={'section-title'}
                        title={this.props.customFields.title}
                    />
                )}
                {this.props.children}
            </section>
        );
    }
}

Grilla.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({ label: 'Titulo' })
    })
};
