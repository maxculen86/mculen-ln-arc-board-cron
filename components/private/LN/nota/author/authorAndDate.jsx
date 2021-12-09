import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModDate from '../../../common/mod-date';
import Author from './authorArticle';

const authorAndDate = props => {
    const { globalContent, author, date, authorDate } = props;
    const { display_date: displayDate, credits, label } = globalContent || {};
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
    date: PropTypes.bool.isRequired,
    author: PropTypes.bool,
    authorDate: PropTypes.string
};
authorAndDate.defaultProps = {
    author: undefined,
    authorDate: undefined
};

export default authorAndDate;
