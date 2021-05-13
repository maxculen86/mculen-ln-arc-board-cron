import React from 'react';
import getProperties from 'fusion:properties';
import validateSectionHome from '../../../../components/private/common/utils/validateSectionHome.js';
import PageBuilderMessage from '../../../../components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage.jsx';
import renderables1 from '../../../../__mocks__/data/renderables/data1';
import renderables2 from '../../../../__mocks__/data/renderables/data2';
import renderablesOk from '../../../../__mocks__/data/renderables/data3';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import Consumer from 'fusion:consumer';
describe('Test de funcionalidad LN-home-validation del layout - <LNHomeLayout />', () => {
   
    it('Validar Seccion Anticipo en Home', () => {        
        expect(validateSectionHome(null, 'Anticipo', 0, renderables1, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Anticipo solo permite 1 componente`}
            />
        );

        expect(validateSectionHome(null, 'Anticipo', 0, renderables2, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Anticipo solo permite componentes del tipo LN-common/cajaAnticipo`}
            />
        );

        expect(validateSectionHome(true, 'Anticipo', 0, renderablesOk, 'default', true)).toEqual(
            true
        );
    });

    it('Validar Seccion Anexo1 en Home', () => {        
        expect(validateSectionHome(null, 'Anexo_1', 1, renderables1, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Anexo_1 solo permite 1 componente`}
            />
        );

        expect(validateSectionHome(null, 'Anexo_1', 1, renderables2, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Anexo_1 solo permite componentes del tipo LN-acumulado/anexoIframe`}
            />
        );

        expect(validateSectionHome(true, 'Anexo_1', 1, renderablesOk, 'default', true)).toEqual(
            true
        );
    });

    it('Validar Seccion Bomba en Home', () => {        
        expect(validateSectionHome(null, 'Bomba', 2, renderables1, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Bomba solo permite 1 componente`}
            />
        );

        expect(validateSectionHome(null, 'Bomba', 2, renderables2, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Bomba solo permite componentes del tipo LN-common/bomba`}
            />
        );

        expect(validateSectionHome(true, 'Bomba', 2, renderablesOk, 'default', true)).toEqual(
            true
        );
    });

    it('Validar Seccion Apertura en Home', () => {        
        expect(validateSectionHome(null, 'Apertura', 3, renderables1, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Apertura solo permite 2 componente`}
            />
        );

        expect(validateSectionHome(null, 'Apertura', 3, renderables2, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Apertura solo permite componentes del tipo LN-acumulado/anexoIframe,Ln_Caja_Collection,Ln_Caja_Manual`}
            />
        );

        expect(validateSectionHome(true, 'Apertura', 3, renderablesOk, 'default', true)).toEqual(
            true
        );
    });

    it('Validar Seccion Anexo_2 en Home', () => {        
        expect(validateSectionHome(null, 'Anexo_2', 4, renderables1, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Anexo_2 solo permite 1 componente`}
            />
        );

        expect(validateSectionHome(null, 'Anexo_2', 4, renderables2, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Anexo_2 solo permite componentes del tipo LN-acumulado/anexoIframe`}
            />
        );

        expect(validateSectionHome(true, 'Anexo_2', 4, renderablesOk, 'default', true)).toEqual(
            true
        );
    });

    it('Validar Seccion Breaking_1 en Home', () => {        
        expect(validateSectionHome(null, 'Breaking_1', 5, renderables1, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Breaking_1 solo permite 1 componente`}
            />
        );

        expect(validateSectionHome(null, 'Breaking_1', 5, renderables2, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Breaking_1 solo permite componentes del tipo LN-acumulado/anexoIframe,Ln_Caja_Collection,Ln_Caja_Manual`}
            />
        );

        expect(validateSectionHome(true, 'Breaking_1', 5, renderablesOk, 'default', true)).toEqual(
            true
        );
    });

    it('Validar Seccion Opinion en Home', () => {        
        expect(validateSectionHome(null, 'Opinion', 9, renderables1, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Opinion solo permite 2 componente`}
            />
        );

        expect(validateSectionHome(null, 'Opinion', 9, renderables2, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Opinion solo permite componentes del tipo LN-common/opinion,LN-common/editorial`}
            />
        );

        expect(validateSectionHome(true, 'Opinion', 9, renderablesOk, 'default', true)).toEqual(
            true
        );
    });

    it('Validar Seccion Comercial_1 en Home', () => {        
        expect(validateSectionHome(null, 'Comercial_1', 13, renderables1, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Comercial_1 solo permite 1 componente`}
            />
        );

        expect(validateSectionHome(null, 'Comercial_1', 13, renderables2, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Comercial_1 solo permite componentes del tipo LN-acumulado/anexoIframe,Ln_Caja_Collection,Ln_Caja_Manual`}
            />
        );

        expect(validateSectionHome(true, 'Comercial_1', 13, renderablesOk, 'default', true)).toEqual(
            true
        );
    });

    it('Validar Seccion Bloque_2 en Home', () => {        
        expect(validateSectionHome(null, 'Bloque_2', 14, renderables1, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Bloque_2 solo permite 2 componente`}
            />
        );

        expect(validateSectionHome(null, 'Bloque_2', 14, renderables2, 'default', true)).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Bloque_2 solo permite componentes del tipo LN-acumulado/anexoIframe,Ln_Caja_Collection,Ln_Caja_Manual`}
            />
        );

        expect(validateSectionHome(true, 'Bloque_2', 14, renderablesOk, 'default', true)).toEqual(
            true
        );
    });
});
