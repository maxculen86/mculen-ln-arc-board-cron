import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-headerSection.css';
import ComLine from '../LN/common/footer/com-line';
import ComTitle from './com-title';

const ModheaderSection = props => {
    const { title, line } = props;
    if (!title) {
        null;
    }
    return (
        <section className="mod-headersection">
            {title ? <ComTitle /> : ''}
            {line ? <ComLine /> : ''}
        </section>
    );
};

export default ModheaderSection;
