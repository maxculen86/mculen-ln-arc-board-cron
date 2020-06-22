import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';

import ComFigure from '../../../../common/com-figure';
import ModPicture from '../../../../common/mod-picture';
import ModFigcaption from '../../../../common/mod-figcaption';
import TitleAndIconArticle from '../titleAndIconArticle';

import WithScreenUtils from '../../../../common/hocs/withScreenUtils';
import WithStorytellingData from '../../../common/hocs/WithStorytellingData';

const Component = props => {
    const {
        storytellingData,
        outputType,
        screenUtils: { device }
    } = props;
    const isMobile = outputType === 'amp' || device !== 'desktop';
    const [data, setData] = useState(isMobile ? storytellingData : {});

    useEffect(() => {
        setData(storytellingData);
    }, [storytellingData]);

    const { apertura = {} } = data;
    const { src, srcset, altText, video, caption, credit } = apertura;

    return (
        <section className="mod-opening --storytelling">
            <ComFigure>
                <ModPicture
                    classCondition=""
                    srcset={srcset || ''}
                    src={src || ''}
                    alt={altText || ''}
                    video={video || ''}
                    amp={outputType === 'amp'}
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
            <section className="wrap root">
                <div className="lay">
                    <ModFigcaption
                        title={caption || ''}
                        credit={credit || ''}
                    />
                </div>
            </section>
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
