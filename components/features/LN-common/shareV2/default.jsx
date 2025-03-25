import React from 'react';
import PropTypes from 'prop-types';
import { SITE_LANACION } from 'fusion:environment';
import { Icon } from '@ln/common-ui-icon';
import { Tooltip } from '@ln/common-ui-tooltip';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import ShareBar from './components/ShareBar';
import { shareVideoConfig } from './helper';
import useShare from '../../LN-nota/share/hooks/useShare';
import useTooltipVisibility from './hooks/useTooltipVisibility';

function ShareV2({ videoId, className, videoTitle: basic }) {
    const url = `/carrousel/jwid${videoId}/`;
    const { isTooltipVisible, handleTooltipVisibility } =
        useTooltipVisibility();

    const { setCopy, shareButton } = useShare({
        basic,
        host: SITE_LANACION,
        requestUri: url
    });

    return (
        <ShareBar className={className}>
            {shareVideoConfig.map(item => {
                const {
                    id,
                    iconProps,
                    showTooltip,
                    tooltipProps,
                    onClick,
                    ...buttonRestProps
                } = item;

                const Wrapper = showTooltip ? Tooltip : React.Fragment;

                const tooltipOptions = {
                    ...tooltipProps,
                    visible: Boolean(isTooltipVisible[id])
                };

                return (
                    <Wrapper key={id} {...(showTooltip ? tooltipOptions : {})}>
                        <ShareBar.Button
                            id={id}
                            key={id}
                            {...buttonRestProps}
                            onClick={() =>
                                onClick({
                                    videoId,
                                    shareButton,
                                    url,
                                    host: SITE_LANACION,
                                    setCopy,
                                    basic,
                                    onShowTooltip:
                                        id === 'copyLinkNote'
                                            ? handleTooltipVisibility(id)
                                            : null
                                })
                            }
                        >
                            <Icon size={24} color="inherit">
                                <IconSprite {...iconProps} />
                            </Icon>
                        </ShareBar.Button>
                    </Wrapper>
                );
            })}
        </ShareBar>
    );
}

ShareV2.propTypes = {
    videoId: PropTypes.string.isRequired,
    className: PropTypes.string,
    videoTitle: PropTypes.string.isRequired
};

ShareV2.defaultProps = {
    className: ''
};

export default ShareV2;
