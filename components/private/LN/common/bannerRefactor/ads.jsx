/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import get from '../../../common/utils/get';
import flatArray from '../../../common/utils/flatArray';
import { GlobalContext } from '../../../common/context/globalContext';

const bannersLoaded = [];

const Ads = props => {
    const {
        slotId: id,
        slotName,
        dimensions,
        dfpId,
        targeting,
        bidding,
        sizemap,
        slotGroup,
        subscription,
        withoutHide
    } = props;
    const [toInstance, setToInstance] = useState(() => false);
    const { dispatch } = useContext(GlobalContext);
    const prebidEnabled = get(bidding, 'prebid.enabled', false);

    useEffect(() => {
        if (!toInstance && !bannersLoaded.includes(`/${dfpId}/${slotName}`)) {
            bannersLoaded.push(`/${dfpId}/${slotName}`);
            setToInstance(() => true);

            console.log(`::: Banner position: ${id}`);

            dispatch({
                type: 'ADD_ADUNIT_DEFINITION',
                payload: {
                    adUnitPath: `/${dfpId}/${slotName}`,
                    size: flatArray(dimensions),
                    opt_div: id,
                    sizemap,
                    prebidEnabled,
                    targeting,
                    slotGroup,
                    subscription,
                    withoutHide
                }
            });

            if (slotGroup === 'nota') {
                dispatch({
                    type: 'REMOVE_ITEM_FROM_SHALL_BE_EXLUDED_LIST',
                    payload: { id }
                });
            }

            if (slotGroup === 'acumulado') {
                if (
                    id.search('caja') === 0 &&
                    id.search(/(?:_tab)|(?:_mob)/) > -1
                )
                    dispatch({
                        type: 'ADD_BANNER_IN_GRILLAS',
                        payload: { id }
                    });
            }
        }
    }, [
        dfpId,
        dimensions,
        dispatch,
        id,
        prebidEnabled,
        sizemap,
        slotGroup,
        slotName,
        subscription,
        targeting,
        toInstance,
        withoutHide
    ]);

    return <div id={id} className="com-banner" />;
};

Ads.propTypes = {
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
    slotGroup: PropTypes.string,
    subscription: PropTypes.bool,
    withoutHide: PropTypes.bool
};

Ads.defaultProps = {
    sizemap: [],
    bidding: {},
    slotGroup: 'desktop',
    subscription: false,
    withoutHide: false
};

export default Ads;
