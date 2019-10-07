import React from 'react';
import PropTypes from 'fusion:prop-types';

import IconBase from '../../common/logoBase';
import TitleArticle from './titleArticle';

import '../../../../../resources/dist/css/ln/components/title.css';

const titleAndIconArticle = ({
    customFields: { prefix },
    globalContent: {
        taxonomy: { sections },
        headlines
    }
}) => {
    return (
        <>
            <IconBase sections={sections} />
            <TitleArticle prefix={prefix} headlines={headlines} />
        </>
    );
};

titleAndIconArticle.propTypes = {
    customFields: PropTypes.shape({
        prefix: PropTypes.string.tag({
            label: 'Prefijo',
            defaultValue: ''
        })
    }).isRequired,
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
