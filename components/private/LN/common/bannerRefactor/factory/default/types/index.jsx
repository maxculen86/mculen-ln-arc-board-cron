import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Ads from '../../../ads';

const Index = props => {
    const ref = useRef();
    const {
        slotId: id,
        slotName,
        dimensions,
        dfpId,
        targeting,
        sticky,
        background,
        fixed,
        show,
        bidding,
        sizemap,
        closeButton,
        withComments,
        subscription,
        noShow,
        slotGroup,
        withoutHide
    } = props;

    return Object.values(show).some(element => element === false) ? (
        <></>
    ) : (
        <div
            className={`mod-banner ${background ? '--bg-banner' : ''} ${
                sticky ? '--sticky' : ''
            } ${closeButton ? '--close' : ''} ${
                fixed ? '--fixed' : ''
            } --${id} ${withoutHide ? '' : 'hlp-none'} `}
            style={{
                display:
                    (!!noShow && subscription) ||
                    (id === 'caja5_dsk' && !withComments)
                        ? 'none'
                        : ''
            }}
            ref={ref}
        >
            {closeButton && (
                <button
                    type="button"
                    aria-label="Close"
                    className="icon-close"
                    onClick={() => ref.current.remove()}
                />
            )}
            <Ads
                slotId={id}
                slotName={slotName}
                dimensions={dimensions}
                dfpId={dfpId}
                targeting={targeting}
                show={show}
                bidding={bidding}
                sizemap={sizemap}
                slotGroup={slotGroup}
                subscription={subscription}
                withoutHide={withoutHide}
            />
        </div>
    );
};

Index.propTypes = {
    slotId: PropTypes.string.isRequired,
    dfpId: PropTypes.string.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        .isRequired,
    slotName: PropTypes.string.isRequired,
    targeting: PropTypes.shape({
        seccion: PropTypes.string,
        sitio: PropTypes.string
    }).isRequired,
    sizemap: PropTypes.shape({
        breakpoints: PropTypes.array,
        refresh: PropTypes.bool
    }),
    bidding: PropTypes.objectOf(PropTypes.string),
    background: PropTypes.bool,
    fixed: PropTypes.bool,
    closeButton: PropTypes.bool,
    sticky: PropTypes.bool,
    show: PropTypes.shape({
        termicas: PropTypes.bool,
        collection: PropTypes.bool
    }),
    withComments: PropTypes.bool,
    subscription: PropTypes.bool,
    noShow: PropTypes.bool,
    slotGroup: PropTypes.string.isRequired,
    withoutHide: PropTypes.bool
};

Index.defaultProps = {
    sizemap: [],
    bidding: {},
    background: false,
    fixed: false,
    sticky: false,
    closeButton: false,
    show: {
        termicas: false,
        collections: false
    },
    withComments: false,
    subscription: false,
    noShow: false,
    withoutHide: false
};

export default Index;

/* useEffect(() => {
        if (!instanced && !bannersLoaded.includes(`/${dfpId}/${slotName}`)) {
            bannersLoaded.push(`/${dfpId}/${slotName}`);

            window.googletag = window.googletag || { cmd: [] };

            googletag.cmd.push(() => {
                console.log(
                        '🚀 ~ Banner ',
                        `/${dfpId}/${slotName}`,
                        prebidEnabled
                    );
                const _adUnit = googletag.defineSlot(
                    `/${dfpId}/${slotName}`,
                    flatArray(dimensions),
                    id
                );

                Object.keys(targeting || {}).forEach(key => {
                    _adUnit.setTargeting(key, targeting[key]);
                });

                const tagsNuevos = Array.isArray(
                    googletag.pubads().getTargeting('tags_nuevos')
                )
                    ? googletag.pubads().getTargeting('tags_nuevos')
                    : [];

                tagsNuevos.forEach(key => {
                    _adUnit.setTargeting(key, tagsNuevos[key]);
                });

                _adUnit.setTargeting('adstest', hasAdsTestParam());

                _adUnit.addService(googletag.pubads());

                setAdUnit(() => _adUnit);
                arrayAdUnit[id] = _adUnit;

                if (prebidEnabled) {
                     console.log(
                        '🚀 ~ file: Index.jsx ~ line 77 ~ With Prebid ',
                        `/${dfpId}/${slotName}`,
                        prebidEnabled
                    );

                    const callAdserver = gptSlots => {
                        if (pbjs.adserverCalled) return;
                        pbjs.adserverCalled = true;
                        console.log(
                            '🚀 ~ Prebid Called ::: ',
                            gptSlots[0].getSlotId().getName(),
                            gptSlots.length
                        );

                        googletag.pubads().refresh(gptSlots, changeCorrelator);
                    };

                    // request pbjs bids when it loads
                    pbjs.que.push(() => {
                        pbjs.rp.requestBids({
                            callback: callAdserver,
                            gptSlotObjects: [_adUnit]
                        });
                    });

                    // failsafe in case PBJS doesn't load
                    setTimeout(() => {
                        callAdserver([_adUnit]);
                    }, 2500);
                }
            });

            setInstanced(() => true);
        }
    }, [
        changeCorrelator,
        dfpId,
        dimensions,
        id,
        instanced,
        prebidEnabled,
        slotName,
        targeting
    ]); */
