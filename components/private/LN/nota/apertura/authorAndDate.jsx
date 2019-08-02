import React from 'react';
import PropTypes from 'fusion:prop-types';

import Author from './authorArticle';
import Date from './dateHeader';

const authorAndDate = props => {
    const {
        globalContent: { display_date }
    } = props;

    return (
        <div>
            <Author {...props} />
            <Date display_date={display_date} />
        </div>
    );
};

authorAndDate.propTypes = {
    globalContent: PropTypes.shape({
        display_date: PropTypes.string
    }).isRequired
};

export default authorAndDate;
