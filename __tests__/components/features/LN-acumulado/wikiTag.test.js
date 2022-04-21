import React from 'react';
import Context from 'fusion:context';
import Content from 'fusion:content';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WikiFeature from '../../../../components/features/LN-acumulado/wiki/default';

jest.mock('fusion:content', () => ({
    useContent: isWiki =>
        isWiki
            ? {
                  wiki: 'data'
              }
            : {}
}));

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

const fusionUseContent = jest.spyOn(Content, 'useContent');

describe('LN-Acumulado-WikiTag test', () => {
    it('Should render the feture when isWiki si true', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                isWiki: true
            }
        }));
        const { globalContent } = Context.useAppContext();
        const { isWiki } = globalContent;
        const { container } = render(<WikiFeature />);

        expect(container).toBeInTheDocument();
        expect(fusionUseContent).toBeCalledTimes(1);
        expect(Content.useContent(isWiki)).toStrictEqual({ wiki: 'data' });
    });
    it('Should not render when isWiki is false', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                isWiki: false
            }
        }));
        const { globalContent } = Context.useAppContext();
        const { isWiki } = globalContent;
        const wikiSourceData = Content.useContent(isWiki);
        const { container } = render(<WikiFeature />);

        expect(container).toMatchInlineSnapshot('<div />');
        expect(wikiSourceData).toStrictEqual({});
    });
});
