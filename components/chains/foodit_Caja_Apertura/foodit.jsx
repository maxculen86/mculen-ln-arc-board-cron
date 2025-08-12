/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';

import setRender from '../utils/setRender';
import setChainFooditCustomFields from '../foodit-global/common/utils/setChainCustomFieldsFoodit';
import { setSlicedChildren } from '../utils/common/_helpers-WebApi';
import { validateOpeningFoodit } from './common/_helper';
import RenderManualBox from '../foodit-global/common/RenderManualBox/foodit';

function OpeningRecipeBox(props) {
    const {
        id: chainId,
        isAdmin = false,
        customFields,
        childProps,
        children
    } = props;

    const { layout = '', hideCaja = false } = customFields;

    const error = validateOpeningFoodit({ layout, childProps });

    const cards = setSlicedChildren({
        config: { layout },
        children
    });

    if (hideCaja) return React.Fragment;

    return (
        <Static id={chainId}>
            {setRender({
                chainId,
                isAdmin,
                error,
                hideBox: false,
                extraOptions: {
                    default: (
                        <RenderManualBox
                            layout={layout}
                            cards={cards}
                            boxType="opening"
                        />
                    )
                }
            })}
        </Static>
    );
}

OpeningRecipeBox.label = 'Foodit Caja Apertura';

OpeningRecipeBox.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        ...setChainFooditCustomFields('cajaApertura')
    }).isRequired
};

export default Consumer(OpeningRecipeBox);
