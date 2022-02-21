import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { buildScriptResizeSSRInfography } from '../../../../../../components/private/LN/common/utils/mediaHelper';
import { INFOGRAFIA } from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('Private - LN - Common - Utils -> mediaHelper', () => {
    const url =
        'https://especialess3.lanacion.com.ar/18/mundial/mundial2018-historicos/';
    const promoItems = {
        basic: {
            _id: '6POSMWEMKZCZBHINVUG3F4O3BY',
            content: `<iframe class="pym" id="LNcreativa" frameborder="0" width="100%" height="800" scrolling="no" src="${url}"></iframe>`,
            type: 'raw_html'
        }
    };
    const outputType = 'default';

    it('Deberia retornar script al ser llamado con los parametros correctos', () => {
        const component = buildScriptResizeSSRInfography(
            promoItems,
            INFOGRAFIA,
            outputType
        );
        expect(component).toBeTruthy();
        expect(component.type).toStrictEqual('script');
        expect(component.props.type).toStrictEqual('text/javascript');
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(url);
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(
            promoItems.basic._id
        );
        expect(component).toMatchSnapshot();
    });
    it('Deberia retornar nulo al ser llamado con los parametros incorrectos', () => {
        promoItems.basic.content = '<opta-widget></opta-widget>';
        expect(buildScriptResizeSSRInfography()).toBeNull();
        expect(buildScriptResizeSSRInfography({})).toBeNull();
        expect(buildScriptResizeSSRInfography(undefined)).toBeNull();
        expect(buildScriptResizeSSRInfography(promoItems, 5)).toBeNull();
        expect(
            buildScriptResizeSSRInfography(promoItems, INFOGRAFIA, 'amp')
        ).toBeNull();
        expect(
            buildScriptResizeSSRInfography(promoItems, INFOGRAFIA, outputType)
        ).toBeNull();
    });
});
