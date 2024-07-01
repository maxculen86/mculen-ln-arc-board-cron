import React from 'react';
import { render } from '@testing-library/react';
import ModRowGap from '../../../../components/private/common/mod-rowgap';

describe('Private - Common - ModRowGap', () => {
    it('Should layout for 3 columns', () => {
        const { container } = render(
            <ModRowGap column="3" classCondition="" typeArticle="Grilla" />
        );
        expect(
            container.querySelector('.row-gap-tablet-3')
        ).toBeInTheDocument();
    });

    it('Show layout for 2 columns and opening', () => {
        const { container } = render(
            <ModRowGap column="2" classCondition="--opening" />
        );
        expect(
            container.querySelector('.row-gap-tablet-2.--opening')
        ).toBeInTheDocument();
    });

    it('Show layout for listing', () => {
        const { container } = render(
            <ModRowGap column="3" classCondition="" typeArticle="Listado" />
        );
        expect(
            container.querySelector('.row-gap-tablet-3')
        ).not.toBeInTheDocument();
    });
});
