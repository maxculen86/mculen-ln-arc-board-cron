import React from 'react';
import getProperties from 'fusion:properties';
import sectionHelper from '../../../../components/private/LN/common/utils/sectionHelper';

import sectionsValidation from '../../../../components/layouts/config/LN-Home.config';
import PageBuilderMessage from '../../../../components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage.jsx';
import renderables1 from '../../../../__mocks__/data/renderables/data1';
import renderables2 from '../../../../__mocks__/data/renderables/data2';
import renderablesOk from '../../../../__mocks__/data/renderables/data3';
import Consumer from 'fusion:consumer';
import {
    sectionWith2ItemToShow,
    sectionWithAnexoHide,
    sectionWithNoCollectionAndAnexoShow,
    sectionWithNoCollectionAndNoAnexo
} from '../../../../__mocks__/data/renderables/sectionsComercialData';
import Context from 'fusion:context';
import { getArticlesIdsFromApertura } from '../../../../components/private/LN/common/utils/cajaTemasHelper';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Test de funcionalidad LN-home-validation del layout - <LNHomeLayout />', () => {
    it('Validar Seccion Anticipo en Home', () => {
        expect(
            sectionHelper(
                null,
                'Anticipo',
                sectionsValidation.Anticipo.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
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
            sectionHelper(
                null,
                'Anexo_1',
                sectionsValidation.Anexo_1.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
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
            sectionHelper(
                null,
                'Bomba',
                sectionsValidation.Bomba.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
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
            sectionHelper(
                null,
                'Apertura_1',
                sectionsValidation.Apertura_1.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
                true,
                'Apertura_1',
                sectionsValidation.Apertura_1.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Multimedia en Home', () => {
        expect(
            sectionHelper(
                null,
                'Multimedia',
                sectionsValidation.Multimedia.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
                true,
                'Multimedia',
                sectionsValidation.Multimedia.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Anexo_2 en Home', () => {
        expect(
            sectionHelper(
                null,
                'Anexo_2',
                sectionsValidation.Anexo_2.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
                true,
                'Anexo_2',
                sectionsValidation.Anexo_2.position,
                renderablesOk,
                'default',
                true
            )
        ).toEqual(true);
    });

    it('Validar Seccion Breaking_1 en Home', () => {
        expect(
            sectionHelper(
                null,
                'Breaking_1',
                sectionsValidation.Breaking_1.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
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
            sectionHelper(
                null,
                'Opinion',
                sectionsValidation.Opinion.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
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
            sectionHelper(
                null,
                'Comercial_1',
                sectionsValidation.Comercial_1.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
                sectionWithAnexoHide,
                'Comercial_1',
                sectionsValidation.Comercial_1.position,
                sectionWithAnexoHide,
                'default',
                true
            )
        ).toEqual(sectionWithAnexoHide);

        expect(
            sectionHelper(
                sectionWith2ItemToShow,
                'Comercial_1',
                sectionsValidation.Comercial_1.position,
                sectionWith2ItemToShow,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
                sectionWithNoCollectionAndAnexoShow,
                'Comercial_1',
                sectionsValidation.Comercial_1.position,
                sectionWithNoCollectionAndAnexoShow,
                'default',
                true
            )
        ).toEqual(sectionWithNoCollectionAndAnexoShow);

        expect(
            sectionHelper(
                sectionWithNoCollectionAndNoAnexo,
                'Comercial_1',
                sectionsValidation.Comercial_1.position,
                sectionWithNoCollectionAndNoAnexo,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
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
            sectionHelper(
                null,
                'Bloque_2',
                sectionsValidation.Bloque_2.position,
                renderables1,
                'default',
                true
            )
        ).toEqual(null);

        expect(
            sectionHelper(
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
            sectionHelper(
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

describe('Test return function sectionHelper', () => {
    it('Test return with ouputType json', () => {
        expect(
            sectionHelper(
                true,
                'Bloque_2',
                sectionsValidation.Bloque_2.position,
                renderablesOk,
                'json',
                true
            )
        ).toString('TODO');
    });

    it('Test return default condition', () => {
        expect(
            sectionHelper(null, undefined, false, [], 'default', false)
        ).toStrictEqual(null);
    });
});

describe('Test de funcion getArticlesIdsFromApertura que se usa en tagList', () => {
    it('Deberia traer los ids de los articulos de Apertura1 y Apertura2 de la home', () => {
        expect(getArticlesIdsFromApertura([])).toEqual('');
        expect(getArticlesIdsFromApertura(undefined)).toEqual('');
        expect(getArticlesIdsFromApertura(renderables1)).toEqual(
            'ILXGTYXUWNF3HKJ3ROQQCQPRVE,Z62GTRQMINHNRDLWGGMKGE3ZCE'
        );
    });
});
