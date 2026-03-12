import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Bomba } from '@ln/contenidos-ui-bomba';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import { getChildrenFromSectionHome } from '../../private/LN/common/utils/cajaTemasHelperLN10-WebApi';
import { validateChainBomba } from './common/_helper-WebApi';
import { getClassCondition, getChildrenOfBomba } from './_helper';
import setRender from '../utils/setRender';
import { setSlicedChildren } from '../utils/common/_helpers-WebApi';
import useValidateChain from '../../private/LN10/common/hooks/useValidateChain';
import sectionValidation from '../../layouts/config/LN10-Home.config.json';
import { setStaticDynamically } from '../utils/_helpers';

function CajaBomba(props) {
    const {
        id: chainId,
        isAdmin,
        customFields: { layout = 'vertical', hideCaja } = {},
        children,
        renderables = []
    } = props;

    const preOpeningChildren = getChildrenFromSectionHome(
        renderables,
        'Pre_Apertura',
        1
    );

    const childrenOfBomba = getChildrenOfBomba(preOpeningChildren, chainId);

    const slicedChildren = setSlicedChildren({
        children,
        config: { layout }
    });

    const [clasCondition, setClasCondition] = useState(
        getClassCondition(layout, childrenOfBomba, chainId)
    );

    const { classCondition, diagramation } = clasCondition;

    const error = useValidateChain({
        isAdmin,
        chainId,
        renderables,
        sectionValidation,
        hideChain: hideCaja,
        nameSection: 'Pre_Apertura',
        dataSection: 'pre-apertura',
        callbackValidation: isPreOpening =>
            validateChainBomba(layout, slicedChildren, isPreOpening)
    });

    const { position, positionInsideSection } = getCommonProps(props);

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection
    );

    const sectionProps = {
        ...viewabilityData,
        className: classCondition
    };

    useEffect(() => {
        if (isAdmin) {
            setClasCondition(
                getClassCondition(layout, childrenOfBomba, chainId)
            );
        }
    }, [layout, chainId, isAdmin]);

    const Component = setRender({
        chainId,
        viewabilityData,
        isAdmin,
        error,
        hideBox: hideCaja,
        withSection: false,
        extraOptions: {
            default: (
                <Bomba
                    data-chain-id={chainId}
                    articles={slicedChildren}
                    layout={diagramation}
                    id={chainId}
                    {...sectionProps}
                />
            )
        }
    });

    return setStaticDynamically(Component, isAdmin, extraOptsDiv, chainId);
}

CajaBomba.label = 'LN10 Caja Bomba';

CajaBomba.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        layout: PropTypes.oneOf([
            'vertical',
            'horizontal',
            'bombita',
            'bombitaMas4'
        ]).tag({
            description: 'Cambiar el diseño de la caja',
            labels: {
                vertical: 'vertical',
                horizontal: 'horizontal',
                bombita: 'Bombita',
                bombitaMas4: 'Bombita + 4'
            },
            group: 'Ajuste Bomba',
            label: 'Diagramación',
            defaultValue: 'vertical'
        }).isRequired,
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            defaultValue: false,
            description: 'Marque para ocultar la caja',
            group: 'Ajuste Bomba'
        })
    })
};

export default Consumer(CajaBomba);
