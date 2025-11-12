import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@ln/contenidos-ui-badge';
import { Text } from '@ln/contenidos-ui-text';
import { cx } from '@ln/cva';
import SimpleDate from '../../../features/LN-nota/simpleDate/default';
import { descriptionVariants } from './styles';
import Share from '../../../features/LN-nota/share/default';
import SignatureFeature from '../../../features/LN-nota/signature/default';
import { place } from '../../../private/common/utils/firmaHelper';

import ModSponsor from '../../../private/common/mod-sponsor';
import ComLogo from '../../../private/common/com-logo';
import { GlobalContext } from '../../../private/common/context/globalContext';
import getTargetAndRelIfExternal from '../../../private/common/utils/getTargetAndRelIfExternal';

import {
    getVideoOpeningTitleData,
    getVideoOpeningSubtitleData,
    getVideoOpeningDateData
} from '../_helpers/helpers';

function NotaVideoOpeningDescription({
    globalContent,
    layout,
    variant,
    customFields = {}
}) {
    const { prefix = '' } = customFields;
    const { display_date: displayDate = '' } = globalContent || {};

    const siteService = useContext(GlobalContext)?.state?.siteService || {};

    const { sponsorData = {}, titleProps } = getVideoOpeningTitleData({
        globalContent,
        layout,
        siteService,
        prefix
    });

    const {
        text: subtitleText,
        badgeForSubscribers,
        badgeType
    } = getVideoOpeningSubtitleData({ globalContent });

    const { shouldRenderDate, modDateProps, lastUpdateLabel } =
        getVideoOpeningDateData({ globalContent, layout });

    const {
        path,
        logoName,
        sponsor,
        altLogo,
        isExternal,
        tooltip,
        advertiser,
        sponsored
    } = sponsorData;

    const { target, rel } = getTargetAndRelIfExternal(isExternal);

    const shouldRenderDateBlock = displayDate && shouldRenderDate;

    const classes = descriptionVariants({ variant });

    const dateProps = {
        dateTime: modDateProps.display_date,
        showTime: modDateProps.labelEdicionImpresa.text !== 'Impresa',
        variant: 'light'
    };

    return (
        <div className={classes}>
            <div className="nota-video-description-title">
                {sponsored ? (
                    <ModSponsor
                        type={`${advertiser ? '--contentlab' : ''}`}
                        logoName={logoName}
                        sponsor={sponsor}
                        textName={advertiser}
                        link={path}
                        target={target}
                        rel={rel}
                        tooltip={tooltip}
                    />
                ) : (
                    <ComLogo
                        href={path}
                        title={altLogo}
                        target={target}
                        rel={rel}
                        logoName={sponsor}
                        alt={altLogo}
                        size="--sm"
                        classnames={{ link: 'block', logo: 'mb-8' }}
                    />
                )}
                <Text
                    as="h1"
                    font="prumo"
                    className={cx([
                        'prumo prumo-extra prumo-slab',
                        'text-32_md',
                        variant === 'vertical'
                            ? 'text-28 text-40_xl'
                            : 'text-24 text-36_lg text-light-0'
                    ])}
                >
                    {`${titleProps.prefixText}${titleProps.content}`}
                </Text>
            </div>
            <Text
                as="h2"
                className={cx([
                    'text-18',
                    variant === 'horizontal' && 'text-20_md'
                ])}
            >
                {subtitleText}
            </Text>
            {badgeForSubscribers && (
                <Badge className="mb-24" type={badgeType}>
                    Suscriptores
                </Badge>
            )}
            <SignatureFeature
                customFields={{ position: place.Top }}
                globalContent={globalContent}
            />
            {shouldRenderDateBlock && <SimpleDate {...dateProps} />}
            {lastUpdateLabel && (
                <Text className="mod-last-update white-space-nowrap text-16">
                    {lastUpdateLabel}
                </Text>
            )}
            <Share />
        </div>
    );
}

NotaVideoOpeningDescription.propTypes = {
    globalContent: PropTypes.shape({}).isRequired,
    layout: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['horizontal', 'vertical']),
    customFields: PropTypes.shape({
        prefix: PropTypes.string
    })
};

NotaVideoOpeningDescription.defaultProps = {
    variant: 'vertical',
    customFields: {
        prefix: ''
    }
};

export default NotaVideoOpeningDescription;
