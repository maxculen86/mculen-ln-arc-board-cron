import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';

import Author from './authorArticle';
import Date from '../../common/dateHeader';

const authorAndDate = props => {
    const {
        globalContent: { display_date, credits },
        author
    } = props;

    const [visible, setVisible] = useState(false);

    if (!visible && 'by' in credits) {
        const by = credits.by.filter(author => author.type === 'author');
        if (by.length > 0) setVisible(true);
    }

    if (!visible && !display_date) return <></>;
    if (display_date)
        return (
            <div className="col-12">
                <div className="row mod-authordate">
                    <div className="col-12">
                        <Date display_date={display_date} />
                    </div>
                </div>
            </div>
        );
    if (author)
        return (
            <div className="col-12">
                <div className="col-12">
                    <div className="com-author">
                        <Author {...props} />
                    </div>
                </div>
            </div>
        );
    return (
        <div className="col-12">
            <div className="row mod-authordate">
                <div className="col-12">
                    <Date display_date={display_date} />
                </div>
            </div>
            <div className="col-12">
                <div className="com-author">
                    <Author {...props} />
                </div>
            </div>
        </div>
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
