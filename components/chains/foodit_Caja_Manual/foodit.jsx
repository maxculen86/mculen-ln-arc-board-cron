/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

import validateCajaManual from './common/_helper-WebApi';

import setRender from '../utils/setRender';

import RoofFoodit from '../../features/foodit-global/common/RoofFoodit/foodit';
import setChainFooditCustomFields from '../foodit-global/common/utils/setChainCustomFieldsFoodit';

import { setStaticDynamically } from '../utils/_helpers';
import { setSlicedChildren } from '../utils/common/_helpers-WebApi';

import fooditRules from '../../features/foodit-global/common/utils/fooditRules';
import StaticContent from '../../private/common/staticContent';

const CajaManual = props => {
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

    const { classNameParent } = fooditRules(layout);

    const cards = setSlicedChildren({
        config: { layout },
        children
    });

    const Component = setRender({
        chainId,
        isAdmin,
        error,
        hideBox: hideCaja,
        extraOptions: {
            default: (
                <StaticContent>
                    <RoofFoodit
                        title={{ text: title, as: 'h3' }}
                        hide={hideTitle}
                        linkProps={{ href: link, text: title }}
                    />
                    <div className={classNameParent}>{cards}</div>
                </StaticContent>
            )
        }
    });

    return setStaticDynamically(Component);
};

CajaManual.label = 'foodit Caja Manual';

CajaManual.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    customFields: PropTypes.shape({
        ...setChainFooditCustomFields('cajaManual')
    })
};

export default Consumer(CajaManual);
