/* eslint-disable react/require-default-props           */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { forwardRef, memo } from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../ads';

const index = memo(
    forwardRef((props, ref) => {
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
            closeButton
        } = props;

        const onClose = () => ref.current.remove();

        const ad = (
            <Ads
                id={id}
                slotName={slotName}
                dimensions={dimensions}
                targeting={targeting}
                sizemap={sizemap}
                bidding={bidding}
                dfpId={dfpId}
                background={background ? '--bg-banner' : ''}
            />
        );

        if (Object.values(show).some(element => element === false))
            return <></>;

        return (
            <>
                <div
                    className={`mod-banner ${background ? '--bg-banner' : ''}
                    ${sticky ? '--sticky' : ''}
                    ${closeButton ? '--close' : ''}
                    ${fixed ? '--fixed' : ''} 
                   hlp-none
                    --${id}
                `}
                    ref={ref}
                >
                    {closeButton && (
                        <button
                            type="button"
                            className="icon-close"
                            onClick={onClose}
                        />
                    )}
                    {ad}
                </div>
            </>
        );
    }),
    ({ slotId: pId }, { slotId: nId }) => {
        return pId !== nId;
    }
);

index.propTypes = {
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
    bidding: PropTypes.object.isRequired,
    background: PropTypes.bool,
    fixed: PropTypes.bool,
    closeButton: PropTypes.bool,
    sticky: PropTypes.bool,
    show: PropTypes.shape({
        termicas: PropTypes.bool,
        collection: PropTypes.bool
    })
};

export default index;
