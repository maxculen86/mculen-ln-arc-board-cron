import React from 'react';
import PropTypes from 'fusion:prop-types';

import Author from './authorArticle';
import Date from '../../common/dateHeader';

const authorAndDate = props => {
    const {
        globalContent: { display_date }
    } = props;

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
        display_date: PropTypes.string
    }).isRequired
};

export default authorAndDate;
