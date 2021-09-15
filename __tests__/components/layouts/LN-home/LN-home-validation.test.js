import React from 'react';
import getProperties from 'fusion:properties';
import { validateSectionHome } from '../../../../components/private/LN/common/utils/homeHelper';
import sectionsValidation from '../../../../components/layouts/config/LN-Home.config';
import PageBuilderMessage from '../../../../components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage.jsx';
import renderables1 from '../../../../__mocks__/data/renderables/data1';
import renderables2 from '../../../../__mocks__/data/renderables/data2';
import renderablesOk from '../../../../__mocks__/data/renderables/data3';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import Consumer from 'fusion:consumer';
describe('Test de funcionalidad LN-home-validation del layout - <LNHomeLayout />', () => {
    it('Validar Seccion Anticipo en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Anticipo',
                sectionsValidation.Anticipo.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Anticipo',
                sectionsValidation.Anticipo.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Anticipo solo permite componentes del tipo LN-common/cajaAnticipo`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Anticipo',
                sectionsValidation.Anticipo.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Anexo1 en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Anexo_1',
                sectionsValidation.Anexo_1.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Anexo_1',
                sectionsValidation.Anexo_1.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Anexo_1 solo permite componentes del tipo LN-common/anexo`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Anexo_1',
                sectionsValidation.Anexo_1.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Bomba en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Bomba',
                sectionsValidation.Bomba.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Bomba',
                sectionsValidation.Bomba.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Bomba solo permite componentes del tipo LN-common/bomba`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Bomba',
                sectionsValidation.Bomba.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Apertura 1 en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Apertura_1',
                sectionsValidation.Apertura_1.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Apertura_1',
                sectionsValidation.Apertura_1.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Apertura_1 solo permite componentes del tipo LN-common/anexo,Ln_Caja_Collection,Ln_Caja_Manual`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Apertura_1',
                sectionsValidation.Apertura_1.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Anexo_2 en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Anexo_2',
                sectionsValidation.Anexo_2.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Anexo_2',
                sectionsValidation.Anexo_2.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Anexo_2 solo permite componentes del tipo LN-common/anexo`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Anexo_2',
                sectionsValidation.Anexo_2.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Multimedia en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Multimedia',
                sectionsValidation.Multimedia.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Multimedia',
                sectionsValidation.Multimedia.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Multimedia solo permite componentes del tipo Ln_Caja_Manual`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Multimedia',
                sectionsValidation.Multimedia.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Breaking_1 en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Breaking_1',
                sectionsValidation.Breaking_1.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Breaking_1',
                sectionsValidation.Breaking_1.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Breaking_1 solo permite componentes del tipo LN-common/anexo,Ln_Caja_Collection,Ln_Caja_Manual`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Breaking_1',
                sectionsValidation.Breaking_1.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Opinion en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Opinion',
                sectionsValidation.Opinion.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Opinion',
                sectionsValidation.Opinion.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Opinion solo permite componentes del tipo LN-common/opinion,LN-common/editoriales`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Opinion',
                sectionsValidation.Opinion.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Comercial_1 en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Comercial_1',
                sectionsValidation.Comercial_1.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Comercial_1',
                sectionsValidation.Comercial_1.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Comercial_1 solo permite componentes del tipo LN-common/anexo,Ln_Caja_Collection,Ln_Caja_Manual`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Comercial_1',
                sectionsValidation.Comercial_1.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Bloque_2 en Home', () => {
        expect(
            validateSectionHome(
                null,
                'Bloque_2',
                sectionsValidation.Bloque_2.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            validateSectionHome(
                null,
                'Bloque_2',
                sectionsValidation.Bloque_2.position,
                renderables2,
                'default',
                true
            )
        ).toEqual(
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección Bloque_2 solo permite componentes del tipo LN-common/anexo,Ln_Caja_Collection,Ln_Caja_Manual`}
            />
        );

        expect(
            validateSectionHome(
                true,
                'Bloque_2',
                sectionsValidation.Bloque_2.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });
});
