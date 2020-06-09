import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import ComDate from '../../../../../components/private/common/com-date';
import ModDate from '../../../../../components/private/common/mod-date';
import Author from './authorArticle';
import Date from '../../common/dateHeader';

const authorAndDate = props => {
    const { globalContent, author, date, authorDate } = props;
    const { display_date, credits, label } = globalContent || {};
    const { edicion: labelEdicionImpresa } = label || {};
    const [visible, setVisible] = useState(false);

    if (!visible && 'by' in credits) {
        const by = credits.by.filter(author => author.type === 'author');
        if (by.length > 0) setVisible(true);
    }

    if (!visible && !display_date) return <></>;
    return (
        <>
            {date && <ModDate display_date={display_date} />}
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
                    <ModDate display_date={display_date} />
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
            by: PropTypes.shape({
                authors: PropTypes.arrayOf(
                    PropTypes.shape({
                        _id: PropTypes.string,
                        name: PropTypes.string,
                        type: PropTypes.string,
                        slug: PropTypes.string,
                        url: PropTypes.string
                    })
                )
            })
        })
    }).isRequired,
    date: PropTypes.boolean,
    author: PropTypes.boolean
};

export default authorAndDate;
