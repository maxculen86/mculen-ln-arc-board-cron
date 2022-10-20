import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuildFirtsButtonsGroup from '../../../../../components/features/LN-nota/share/_children/BuildFirstButtonsGroup';
import useFetch from '../../../../../components/private/common/hooks/useFetch';

jest.mock('../../../../../components/private/common/hooks/useFetch', () =>
    jest.fn()
);
describe('Components - Features - LN-nota - share', () => {
    const globalContent = (isListenable, comments) => ({
        _id: '7ZDIHMQHDRDNNMJDSUWQXWPWZU',
        isListenable,
        comments: { display_comments: comments }
    });
    useFetch.mockImplementation(() => ({
        data: {
            total_visible_content: 1
        }
    }));
    it('should call useFetch hook in component', () => {
        render(<BuildFirtsButtonsGroup globalContent={globalContent()} />);
        expect(useFetch).toBeCalledTimes(1);
    });
    it('should render isListenable button', () => {
        render(
            <BuildFirtsButtonsGroup
                globalContent={globalContent(true, false)}
            />
        );
        expect(screen.getByText('escuchar')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveAttribute(
            'title',
            'Escuchar nota'
        );
    });
    it('should render bookmark button', () => {
        const { container } = render(
            <BuildFirtsButtonsGroup
                termicaBookmark={true}
                globalContent={globalContent(false, false)}
            />
        );
        expect(screen.getByRole('button')).toHaveAttribute(
            'title',
            'Notas guardadas'
        );
        expect(container.querySelector('i')).toBeInTheDocument();
    });
    it('should render comments button', () => {
        render(
            <BuildFirtsButtonsGroup
                globalContent={globalContent(false, true)}
            />
        );
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveAttribute(
            'title',
            'Ir a los comentarios de la nota'
        );
    });
    it('should run a snapshot', () => {
        const comp = render(
            <BuildFirtsButtonsGroup
                termicaBookmark={true}
                globalContent={globalContent(true, true)}
            />
        );
        expect(comp).toMatchSnapshot();
    });
});
