import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ComFigure from '../../../../common/com-figure';
import ModPicture from '../../../../common/mod-picture';
import ModFigcaption from '../../../../common/mod-figcaption';
import TitleAndIconArticle from '../titleAndIconArticle';
import WithStorytellingData from '../../../common/hocs/WithStorytellingData';

import {
    FOTOAL100,
    STORYTELLING
} from '../../../../common/utils/subtypes/subtypeHelper';
import { replaceAllUrlsResizerObject } from '../../../common/utils/mediaHelper';
import '../../../../../../resources/dist/css/ln/modules/mod-opening.css';
import get from '../../../../common/utils/get';

function Component(props) {
    const {
        storytellingData,
        globalContent: { headlines, subtype },
        withoutVideoBackground
    } = props;
    const isMobile = get(storytellingData, 'apertura.isMobile', false);
    const [data, setData] = useState(
        isMobile || subtype === FOTOAL100 || withoutVideoBackground
            ? storytellingData
            : {}
    );
    const titleNote = get(headlines, 'basic', undefined);

    useEffect(() => {
        setData(storytellingData);
    }, [storytellingData]);

    const { apertura = {} } = data;
    const { src, altText, video, caption, credit, resizedUrls, imgDefault } =
        subtype === STORYTELLING || subtype === FOTOAL100
            ? replaceAllUrlsResizerObject(apertura)
            : apertura;

    return (
        <section className="mod-opening">
            <ComFigure>
                <ModPicture
                    classCondition=""
                    src={src || ''}
                    alt={caption || altText || titleNote || ''}
                    video={video || ''}
                    imageListForPicture={resizedUrls}
                    imgDefault={imgDefault}
                />
                <div className="mod-title">
                    <div className="lay">
                        <TitleAndIconArticle
                            {...props}
                            customFields={{ prefix: '' }}
                        />
                    </div>
                </div>
            </ComFigure>
            {!video && (
                <div className="lay">
                    <ModFigcaption
                        title={caption || ''}
                        credit={credit || ''}
                    />
                </div>
            )}
        </section>
    );
}

Component.propTypes = {
    outputType: PropTypes.string.isRequired,
    screenUtils: PropTypes.shape({
        device: PropTypes.string
    }).isRequired,
    storytellingData: PropTypes.shape({
        apertura: PropTypes.shape({
            src: PropTypes.string,
            srcset: PropTypes.string,
            altText: PropTypes.string,
            video: PropTypes.string,
            caption: PropTypes.string,
            credit: PropTypes.string
        })
    }),
    globalContent: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        subtype: PropTypes.string
    }).isRequired,
    withoutVideoBackground: PropTypes.bool
};

Component.defaultProps = {
    storytellingData: {
        apertura: {
            src: '',
            srcset: '',
            altText: '',
            video: '',
            caption: '',
            credit: ''
        }
    },
    withoutVideoBackground: false
};

export default WithStorytellingData(Component);
