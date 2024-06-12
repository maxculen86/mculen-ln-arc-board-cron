import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModDate from '../../../common/mod-date';
import Author from './authorArticle';
import ReadingTime from '../../../../features/LN-10-global/common/readingTime/default';

const authorAndDate = props => {
    const { globalContent, author, date, authorDate } = props;
    const {
        display_date: displayDate,
        credits,
        label,
        first_publish_date,
        last_updated_date
    } = globalContent || {};
    const { edicion: labelEdicionImpresa } = label || {};
    const [visible, setVisible] = useState(false);

    if (!visible && 'by' in credits) {
        const by = credits.by.filter(auth => auth.type === 'author');
        if (by.length > 0) setVisible(true);
    }

    if (!visible && !displayDate) return <></>;
    return (
        <>
            {date && (
                <ModDate
                    display_date={displayDate}
                    labelEdicionImpresa={labelEdicionImpresa}
                    first_publish_date={first_publish_date}
                    last_updated_date={last_updated_date}
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
            <ReadingTime />
            {authorDate && (
                <>
                    {/* <Date
                        labelEdicionImpresa={labelEdicionImpresa}
                        display_date={display_date}
                    /> */}
                    <ModDate
                        display_date={displayDate}
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
    date: PropTypes.bool,
    author: PropTypes.bool,
    authorDate: PropTypes.bool
};
authorAndDate.defaultProps = {
    author: undefined,
    authorDate: undefined,
    date: undefined
};

export default authorAndDate;
