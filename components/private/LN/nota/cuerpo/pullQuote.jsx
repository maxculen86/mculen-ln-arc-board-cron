import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/modules/mod-linklist.css';
import '../../../../../resources/dist/css/ln/components/com-link.css';
import '../../../../../resources/dist/css/ln/components/com-text.css';
import '../../../../../resources/dist/css/ln/components/com-title.css';
import '../../../../../resources/dist/css/ln/components/com-lead.css';
import '../../../../../resources/dist/css/ln/components/appointment.css';

import Paragraph from './parrafo';

const pullQuote = (props, ...p) => {
    const {
        data: {
            citation: { content: author = '' } = {},
            content_elements: {
                0: { content }
            },
            subtype
        }
    } = props;

    return (
        subtype === 'pullquote' && (
            <section {...p} className="com-cita autor">
                <section className="cont-cita">
                    <div className="title-cita">
                        <Paragraph
                            size="--l"
                            classCondition="--font-primary --font-extra"
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
