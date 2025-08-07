import React from 'react';
import PropTypes from 'prop-types';
import PreLiveblog from './BodyPre';
import BreadcrumbArticle from '../../../../features/LN-nota/breadcrumbArticle';
import StaticContentV2 from '../../../../chains/LN10-global/staticContentV2';

function BodyTop({ children, dateTime }) {
    const { date, time } = dateTime;
    return (
        <div className="pb-40">
            <div className="row">
                <div className="flex flex-column">
                    <BreadcrumbArticle className="mb-0 pb-16" />
                    <StaticContentV2 htmlOnly>
                        <ul className="com-date flex jc-start ai-center --bullet-list_12 w-100 pb-12">
                            {[date, time].map(item => (
                                <li
                                    key={item}
                                    className="flex ai-center text-neutral-light-700"
                                >
                                    <time>{item}</time>
                                </li>
                            ))}
                        </ul>
                    </StaticContentV2>
                    {children}
                </div>
            </div>
        </div>
    );
}

BodyTop.PreLiveblog = PreLiveblog;
BodyTop.propTypes = {
    children: PropTypes.node.isRequired,
    dateTime: PropTypes.shape({
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired
    }).isRequired
};

export default BodyTop;
