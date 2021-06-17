import React from 'react';
import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';
import ArticleBase from './articleBase';
import Media from '../media';
import addRelatedImage from '../../common/utils/addRelatedImage';
//import addRelatedImage from '../../common/utils/addRelatedImageClass';

const articleMain = ({
    outputType,
    articleData,
    extraClasses,
    children,
    border,
    dataSection,
    hourToDisplay,
    position,
    handleClick
}) => {
    let media = null;
    const _articleData = addRelatedImage(articleData);

    // TODO: validar tipo autor correcto
    if (_articleData.subtype === 99) {
        // TODO: la imagen de autor viene por fuera de anglerfishhhhhhh.......
        media = (
            <Media
                mediaData={_articleData.by.credits}
                href={_articleData.website_url}
                outputType={outputType}
            />
        );
    } else {
        const imagenDestacada = get(_articleData, 'promo_items.basic', null);
        const type = get(imagenDestacada, 'type', null);

        media = (
            <Media
                mediaData={type === 'image' ? imagenDestacada : null}
                href={_articleData.website_url}
                outputType={outputType}
            />
        );
    }

    const hourComponent = hourToDisplay ? (
        <div className="com-hour --fourxs">{hourToDisplay}</div>
    ) : null;

    return (
        <ArticleBase
            articleData={_articleData}
            extraClasses={extraClasses}
            mediaComponent={media}
            border={border}
            dataSection={dataSection}
            hourComponent={hourComponent}
            position={position}
            handleClick={handleClick}
        >
            {children}
        </ArticleBase>
    );
};

articleMain.propTypes = {
    outputType: PropTypes.string,
    extraClasses: PropTypes.string,
    children: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    articleData: PropTypes.shape({
        subtype: PropTypes.string,
        website_url: PropTypes.string
    }).isRequired,
    dataSection: PropTypes.string,
    border: PropTypes.boolean,
    hourToDisplay: PropTypes.string,
    position: PropTypes.number
};

// articleMain.defaultProps = {
//     extraClasses: '',
//     children: [],
//     dataSection: '',
//     border: false
// };

export default articleMain;
