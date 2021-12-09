import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';

import ComFigure from '../../../../common/com-figure';
import ModPicture from '../../../../common/mod-picture';
import ModFigcaption from '../../../../common/mod-figcaption';
import TitleAndIconArticle from '../titleAndIconArticle';

import WithScreenUtils from '../../../../common/hocs/withScreenUtils';
import WithStorytellingData from '../../../common/hocs/WithStorytellingData';

import '../../../../../../resources/dist/css/ln/modules/mod-opening.css';

const Component = props => {
    const {
        storytellingData,
        outputType,
        screenUtils: { device },
        globalContent: { headlines }
    } = props;
    const isMobile = outputType === 'amp' || device !== 'desktop';
    const [data, setData] = useState(isMobile ? storytellingData : {});
    const titleNote = headlines.basic || '';

    useEffect(() => {
        setData(storytellingData);
    }, [storytellingData]);

    const { apertura = {} } = data;
    const {
        src,
        srcset,
        altText,
        video,
        caption,
        credit,
        resizedUrls
    } = apertura;
    const sizes = outputType === 'amp' ? { width: 80, height: 537 } : {};
    return (
        <section className="mod-opening">
            <ComFigure>
                <ModPicture
                    classCondition=""
                    srcset={srcset || ''}
                    src={src || ''}
                    alt={caption || altText || titleNote || ''}
                    video={video || ''}
                    amp={outputType === 'amp'}
                    sizes={sizes}
                    sources={resizedUrls}
                    isApertura
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
            <div className="lay">
                <ModFigcaption title={caption || ''} credit={credit || ''} />
            </div>
        </section>
    );
};

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
    })
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
    }
};

export default WithScreenUtils(WithStorytellingData(Component));
