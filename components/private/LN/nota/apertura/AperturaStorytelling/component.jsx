import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ComFigure from '../../../../common/com-figure';
import ModPicture from '../../../../common/mod-picture';
import ModFigcaption from '../../../../common/mod-figcaption';
import TitleAndIconArticle from '../titleAndIconArticle';

import WithScreenUtils from '../../../../common/hocs/withScreenUtils';
import WithStorytellingData from '../../../common/hocs/WithStorytellingData';

import { FOTOAL100 } from '../../../../common/utils/subtypes/subtypeHelper';

import '../../../../../../resources/dist/css/ln/modules/mod-opening.css';
import get from '../../../../common/utils/get';
import { getAspectRatio } from '../../../../../../content/sources/utils/getRatio';
import useProportions from '../../../../common/hooks/useProportions';

export const filteredSources = (resizedUrls, device, isAmp) => {
    if (resizedUrls && device) {
        return resizedUrls.filter(image => {
            const imageRatio = getAspectRatio(
                image.option.width,
                image.option.height
            );

            if (device === 'mobile' || device === 'tablet' || isAmp) {
                return imageRatio === '2:3';
            }
            return imageRatio === '3:2';
        });
    }
    return '';
};

const Component = props => {
    const {
        storytellingData,
        outputType,
        screenUtils: { device },
        globalContent: { headlines, subtype }
    } = props;

    const isAmp = outputType === 'amp';
    const isMobile = isAmp || device !== 'desktop';
    const [data, setData] = useState(
        isMobile || subtype === FOTOAL100 ? storytellingData : {}
    );
    const titleNote = get(headlines, 'basic', undefined);

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

    const sourcesForDevice = useProportions({
        resizedUrls,
        device,
        isAmp,
        subtype
    });

    const sizes = isAmp ? { width: 80, height: 537 } : {};

    return (
        <section className="mod-opening">
            <ComFigure>
                <ModPicture
                    classCondition=""
                    srcset={srcset || ''}
                    src={src || ''}
                    alt={caption || altText || titleNote || ''}
                    video={video || ''}
                    amp={isAmp}
                    sizes={sizes}
                    sources={sourcesForDevice}
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
    }),
    globalContent: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        subtype: PropTypes.string
    }).isRequired
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
