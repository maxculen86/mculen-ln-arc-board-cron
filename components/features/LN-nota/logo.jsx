import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

import { getSectionLogo } from '../../private/common/utils/sectionUtils';

import ComLink from '../../private/common/com-link';
import ComLogo from '../../private/common/com-logo';
import ComParagraph from '../../private/common/com-paragraph';

const Logo = props => {
    const {
        globalContent: {
            taxonomy: { sections },
            distributor
        },
        layout
    } = props;

    const { name } = distributor || {};
    const logo = getSectionLogo(sections, layout, name);

    const { path, logoName } = logo || {
        path: null,
        logoName: null
    };

    return (
        <ComParagraph
            content={renderToString(
                React.createElement(
                    ComLink,
                    { link: path ? `${path}/` : null }, //agrego barra al final
                    React.createElement(ComLogo, {
                        color: true,
                        size: '--xs',
                        logoName
                    })
                )
            )}
        />
    );
};

Logo.label = 'LN-Nota-Logo';

Logo.propTypes = {
    globalContent: PropTypes.shape({
        distributor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired
        }).isRequired,
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.object)
        }).isRequired
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(Logo);
