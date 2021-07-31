import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Ads from '../../../ads';

const Index = forwardRef((props, ref) => {
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
});

Index.propTypes = {
    slotId: PropTypes.string.isRequired,
    dfpId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        .isRequired,
    slotName: PropTypes.string.isRequired,
    targeting: PropTypes.shape({
        seccion: PropTypes.string,
        sitio: PropTypes.string
    }).isRequired,
    sizemap: PropTypes.arrayOf(
        PropTypes.shape({
            breakpoints: PropTypes.array,
            refresh: PropTypes.bool
        })
    ),
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
