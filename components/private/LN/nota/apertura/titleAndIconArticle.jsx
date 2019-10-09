import React from 'react';
import PropTypes from 'fusion:prop-types';

import IconBase from '../../common/logoBase';
import TitleArticle from './titleArticle';
import { getSectionStyle } from '../../../common/utils/sectionUtils';
import '../../../../../resources/dist/css/ln/components/title.css';

const titleAndIconArticle = ({
    customFields: { prefix },
    globalContent: {
        taxonomy: { sections },
        headlines
    }
}) => {
    if (sections) {
        const sectionStyle = getSectionStyle(sections);

        return (
            <>
                {sectionStyle.class && sectionStyle.section ? (
                    <IconBase sections={sections} />
                ) : null}
                <TitleArticle prefix={prefix} headlines={headlines} />
            </>
        );
    }
    return <TitleArticle prefix={prefix} headlines={headlines} />;
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
