import React from 'react';
import PropTypes from 'fusion:prop-types';

import IconBase from '../../common/logoBase';
import TitleArticle from './titleArticle';

import '../../../../../resources/dist/css/ln/components/title.css';

const titleAndIconArticle = ({
    globalContent: {
        taxonomy: { sections },
        headlines
    }
}) => {
    return (
        <>
            <IconBase sections={sections} />
            <TitleArticle headlines={headlines} />
        </>
    );
};

titleAndIconArticle.propTypes = {
    globalContent: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string.isRequired
        }).isRequired,
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.object)
        })
    }).isRequired
};

export default titleAndIconArticle;
