import React from 'react';
import PropTypes from 'prop-types';

import Paragraph from './parrafo';

const pullQuote = props => {
    const {
        data: {
            citation: { content: author },
            content_elements: {
                0: { content }
            },
            subtype
        }
    } = props;
    return (
        subtype === 'pullquote' && (
            <section className="com-cita autor">
                <section className="cont-cita">
                    <div className="title-cita">
                        <Paragraph
                            size="--m"
                            classCondition="--sueca --font-bold"
                            data={{ content: `"${content}"` }}
                        />
                    </div>
                    <div className="cont-firma-autor">
                        {' '}
                        <h3 className="nombre-firma --twoxs">{`${author}`}</h3>
                    </div>
                </section>
            </section>
        )
    );
};

pullQuote.arcType = 'pullquote';
pullQuote.isStatic = true;

pullQuote.propTypes = {
    data: PropTypes.shape({
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string
            })
        )
    }).isRequired
};

export default pullQuote;
