import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import SnippetWiki from '../../../../../../components/private/LN/nota/snippet/wiki';
import MockMessi from '../../../../../../__mocks__/data/wikiTag/messiDataMock.json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const wikiSourceData = MockMessi;

describe('private - LN - nota - SnippetWiki ', () => {
    it('Should render with all values', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: { wikiSourceData }
        }));
        const { container } = render(<SnippetWiki />);

        const script = container.querySelector('script');
        const parseData = JSON.parse(script.textContent);

        expect(script).toBeInTheDocument();
        expect(parseData['@type']).toBe('Person');
        expect(parseData['givenName']).toBe(
            wikiSourceData.schemas_info.given_name
        );
        expect(parseData['additionalName']).toBe(
            wikiSourceData.schemas_info.additional_name
        );
        expect(parseData['alternateName']).toBe(
            wikiSourceData.schemas_info.alternate_name
        );
        expect(parseData['jobTitle']).toBe(
            wikiSourceData.schemas_info.job_title
        );
        expect(parseData['familyName']).toBe(
            wikiSourceData.schemas_info.family_name
        );
        expect(parseData['birthDate']).toBeTruthy();
        expect(parseData['birthPlace']).toBeTruthy();
        expect(parseData['image']).toBeTruthy();
    });

    it('Should render without some values', () => {
        wikiSourceData.type = 2;
        wikiSourceData.schemas_info.given_name = 'Roman';
        wikiSourceData.schemas_info.additional_name = 'Juan';
        wikiSourceData.schemas_info.job_title = 'Futbolista';
        delete wikiSourceData.schemas_info.alternate_name;
        delete wikiSourceData.schemas_info.family_name;
        delete wikiSourceData.schemas_info.birth_place;
        delete wikiSourceData.schemas_info.birth_date;

        Context.useAppContext = jest.fn(() => ({
            globalContent: { wikiSourceData }
        }));
        const { container } = render(<SnippetWiki />);

        const script = container.querySelector('script');
        const parseData = JSON.parse(script.textContent);

        expect(script).toBeInTheDocument();
        expect(parseData['@type']).not.toBe('Person');
        expect(parseData['jobTitle']).toBe('Futbolista');
        expect(parseData['alternateName']).toBeFalsy();
        expect(parseData['familyName']).toBeFalsy();
        expect(parseData['birhDate']).toBeFalsy();
        expect(parseData['birthPlace']).toBeFalsy();
    });

    it('Should render required values', () => {
        delete wikiSourceData.schemas_info;
        delete wikiSourceData.image;
        Context.useAppContext = jest.fn(() => ({
            globalContent: { wikiSourceData }
        }));
        const { container } = render(<SnippetWiki />);

        const script = container.querySelector('script');
        const parseData = JSON.parse(script.textContent);

        expect(parseData['@type']).toBeTruthy();
        expect(parseData['@context']).toBeTruthy();
    });
});
