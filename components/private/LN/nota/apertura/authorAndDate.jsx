import React from 'react';
import PropTypes from 'fusion:prop-types';

import Author from './authorArticle';
import Date from '../../common/dateHeader';

const authorAndDate = props => {
    const {
        globalContent: { display_date }
    } = props;

    return (
        <div>
            <Date display_date={display_date} />
            <Author {...props} />
        </div>
    );
};

authorAndDate.propTypes = {
    globalContent: PropTypes.shape({
        display_date: PropTypes.string
    }).isRequired
};

export default authorAndDate;
