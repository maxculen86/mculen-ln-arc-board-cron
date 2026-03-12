/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import validateCajaManual from './common/_helper-WebApi';
import setRender from '../utils/setRender';
import { RoofFoodit } from '../../features/foodit-global/common/RoofFoodit/foodit';
import setChainFooditCustomFields from '../foodit-global/common/utils/setChainCustomFieldsFoodit';

import { setSlicedChildren } from '../utils/common/_helpers-WebApi';
import RenderManualBox from '../foodit-global/common/RenderManualBox/foodit';

function CajaManual(props) {
    const {
        id: chainId,
        isAdmin = false,
        customFields,
        childProps,
        children
    } = props;

    const {
        layout = '',
        hideCaja = false,
        title = '',
        hideTitle = false,
        link = ''
    } = customFields;

    const error = validateCajaManual(layout, childProps);

    const cards = setSlicedChildren({
        config: { layout },
        children
    });

    return (
        <Static id={chainId}>
            {setRender({
                chainId,
                isAdmin,
                error,
                hideBox: hideCaja,
                extraOptions: {
                    default: (
                        <div className="hidden">
                            <RoofFoodit
                                title={{ text: title, as: 'h3' }}
                                hide={hideTitle}
                                linkProps={{ href: link, text: title }}
                            />
                            <RenderManualBox
                                layout={layout}
                                cards={cards}
                                boxType="manual"
                            />
                        </div>
                    )
                }
            })}
        </Static>
    );
}

CajaManual.label = 'foodit Caja Manual';
CajaManual.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        ...setChainFooditCustomFields('cajaManual')
    }).isRequired
};

export default Consumer(CajaManual);
