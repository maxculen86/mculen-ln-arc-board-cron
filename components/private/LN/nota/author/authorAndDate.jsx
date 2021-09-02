import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ComDate from '../../../../../components/private/common/com-date';
import ModDate from '../../../../../components/private/common/mod-date';
import Author from './authorArticle';
import Date from '../../common/dateHeader';

const authorAndDate = props => {
    const { globalContent, author, date, authorDate } = props;
    const { display_date, credits, label } = globalContent || {};
    console.log('🚀 ~ file: authorAndDate.jsx ~ line 11 ~ credits', credits);
    const { edicion: labelEdicionImpresa } = label || {};
    const [visible, setVisible] = useState(false);

    if (!visible && 'by' in credits) {
        const by = credits.by.filter(author => author.type === 'author');
        if (by.length > 0) setVisible(true);
    }

    if (!visible && !display_date) return <></>;
    return (
        <>
            {date && (
                <ModDate
                    display_date={display_date}
                    labelEdicionImpresa={labelEdicionImpresa}
                />
            )}
            {author && (
                <div className="col-12">
                    <div className="col-12">
                        <div className="com-author">
                            <Author {...props} />
                        </div>
                    </div>
                </div>
            )}
            {authorDate && (
                <>
                    {/* <Date
                        labelEdicionImpresa={labelEdicionImpresa}
                        display_date={display_date}
                    /> */}
                    <ModDate
                        display_date={display_date}
                        labelEdicionImpresa={labelEdicionImpresa}
                    />
                    <div className="com-author">
                        <Author {...props} />
                    </div>
                </>
            )}
        </>
    );
};

authorAndDate.propTypes = {
    globalContent: PropTypes.shape({
        display_date: PropTypes.string,
        credits: PropTypes.shape({
            by: PropTypes.arrayOf(PropTypes.shape({}))
        })
    }).isRequired,
    date: PropTypes.bool.isRequired,
    author: PropTypes.bool
};
authorAndDate.defaultProps = {
    author: undefined
};

export default authorAndDate;
