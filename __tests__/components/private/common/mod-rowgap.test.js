import React from 'react';
import { shallow } from 'enzyme';
import ModRowGap from '../../../../components/private/common/mod-rowgap';

describe('Private - Common - ModRowGap', () => {
    it('Mostrar layout para 3 columnas', () => {
        const component = shallow(
            <ModRowGap column="3" classCondition="" typeArticle="Grilla" />
        );
        expect(component.find('.row-gap-tablet-3').length).toBe(1);
    });

    it('Mostrar layout para 2 columnas y apertura', () => {
        const component = shallow(
            <ModRowGap column="2" classCondition="--opening" />
        );
        expect(
            component.find('div').hasClass('row-gap-tablet-2 --opening')
        ).toBe(true);
    });

    it('Mostrar layout para listado', () => {
        const component = shallow(
            <ModRowGap column="3" classCondition="" typeArticle="Listado" />
        );
        expect(component.find('.row-gap-tablet-3').length).toBe(0);
    });
});
