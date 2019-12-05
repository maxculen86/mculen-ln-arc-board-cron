import React from 'react';
import PropTypes from 'fusion:prop-types';
import TitleAcu from '../titles/titleAcu';

import '../../../../../resources/dist/css/ln/modules/caja-nota.css';

// TODO: test pendiente
const ArticleBase = ({
    extraClasses,
    articleData: { headlines, website_url: websiteUrl, label },
    hourComponent,
    mediaComponent,
    children,
    border,
    dataSection
}) => {
    const volanta = label && label.volanta && label.volanta.text;
    const borderClass = border ? '--border ' : '';
    const extraOpts = {};
    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    return (
        <article
            className={`mod-caja-nota ${borderClass} ${extraClasses || ''}`}
            {...extraOpts}
        >
            {hourComponent}
            {mediaComponent}
            <div className="mod-caja-nota__descrip">
                <TitleAcu
                    headlines={headlines}
                    volanta={volanta}
                    href={websiteUrl}
                />
                {children}
            </div>
        </article>
    );
};

ArticleBase.propTypes = {
    extraClasses: PropTypes.string,
    articleData: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        website_url: PropTypes.string,
        label: PropTypes.shape({
            volanta: PropTypes.shape({
                text: PropTypes.string
            })
        })
    }),
    hourComponent: PropTypes.node,
    mediaComponent: PropTypes.node,
    children: PropTypes.node,
    border: PropTypes.bool,
    dataSection: PropTypes.string
};

// ArticleBase.defaultProps = {
//     extraClasses: '',
//     articleData: {
//         headlines: {
//             basic: ''
//         },
//         website_url: undefined,
//         label: {
//             volanta: {
//                 text: undefined
//             }
//         }
//     },
//     mediaComponent: <></>,
//     children: <></>,
//     border: false,
//     dataSection: ''
// };

export default ArticleBase;
