import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgramSnippet from '../../../../../../components/private/OTT/programa/snippet/programSnippet';
import mockGlobalContent from '../../../../../../__mocks__/data/videos/globalContentVideoOTT.json';

describe('programSnippet test', () => {
    const props = {
        globalContent: mockGlobalContent
    };

    it('Check render for program snippet', () => {
        const { container } = render(<ProgramSnippet {...props} />);
        const snippet = JSON.parse(
            container.getElementsByTagName('script')[0].innerHTML
        );
        const descriptionRegex = /^([\+A-Za-z0-9\s]+)(\s?\-\s?)(\d{1,2}\s(de\s)?[a-zA-Z]+\s(del\s)?\d{4})$/g;
        const descriptionElements =
            descriptionRegex.exec('Mesa chica - 21 de Junio 2022') || [];
        const description =
            descriptionElements[1] && descriptionElements[3]
                ? `Mira el programa ${descriptionElements[1]}en su edición del ${descriptionElements[3]}`
                : basic;

        expect(container).toMatchSnapshot();
        expect(snippet.description).toBe(description);
    });
});
