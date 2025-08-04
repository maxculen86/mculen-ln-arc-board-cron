import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/cva';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import config from '../../../../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

function Interstitial({ data, ...r }) {
    const { layout } = useAppContext() || {};
    const { url, content } = data || {};

    if (!url || !content) return null;

    const isFotoAl100 = layout === layoutsName.FotoAl100;

    return (
        <div
            className={cx(
                'interstitial-container container-center-100',
                isFotoAl100 && 'pb-32'
            )}
            {...r}
        >
            <div className="flex jc-center ai-center w-100">
                <Button
                    variant="secondary"
                    target="_blank"
                    href={url}
                    title={content}
                    className="theme-button interstitial-button uppercase py-12 px-16"
                    size={16}
                    data-mrf-recirculation="n_interstitial"
                >
                    {content}
                    <Icon size={20} className="theme-icon">
                        <IconSprite name="arrowRight" />
                    </Icon>
                </Button>
            </div>
        </div>
    );
}

Interstitial.arcType = 'interstitial_link';
Interstitial.isStatic = true;

Interstitial.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number
    }).isRequired
};

export default Interstitial;
