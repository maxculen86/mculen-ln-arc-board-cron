import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import '@testing-library/jest-dom';
import BuildFirtsButtonsGroup from '../../../../../components/features/LN-nota/share/_children/BuildFirstButtonsGroup';
import useFetch from '../../../../../components/private/common/hooks/useFetch';
import useTermica from '../../../../../components/private/common/hooks/useTermica';

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

jest.mock('../../../../../components/private/common/hooks/useFetch', () =>
    jest.fn()
);

const props = {
    renderables: [
        {
            collection: 'features',
            type: 'LN-10/IA',
            props: {
                customFields: {
                    hideSummary: false
                }
            }
        }
    ],
    globalContentConfig: {
        query: {
            uri: '/sociedad/hola/'
        }
    },
    contextPath: '',
    deployment: jest.fn(path => path)
};

Context.useAppContext = jest.fn(() => props);

describe('Components - Features - LN-nota - share', () => {
    beforeEach(() => {
        window.LN = {
            observable: {
                publish: jest.fn(),
                subscribe: jest.fn(),
                unsubscribe: jest.fn()
            }
        };
    });

    const globalContent = (isListenable, comments) => ({
        _id: '7ZDIHMQHDRDNNMJDSUWQXWPWZU',
        isListenable,
        promo_items: {
            summary: { embed: { config: { arrayBullets: ['bullet1'] } } }
        },
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

    it('should render bookmark button', () => {
        const { container } = render(
            <BuildFirtsButtonsGroup
                termicaBookmark={true}
                globalContent={globalContent(false, false)}
            />
        );
        expect(screen.getByTitle('Guardar nota')).toBeInTheDocument();
        expect(container.querySelector('i')).toBeInTheDocument();
    });

    it('should render comments button', () => {
        render(
            <BuildFirtsButtonsGroup
                globalContent={globalContent(false, true)}
            />
        );
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(
            screen.getByTitle('Ir a los comentarios de la nota')
        ).toBeInTheDocument();
    });

    it('should run a snapshot', () => {
        // TODO: Corregir Snapshots cuando se separen botones y cada uno tenga su termica asociada
        useTermica.mockImplementation(() => true);
        const comp = render(
            <BuildFirtsButtonsGroup
                termicaBookmark={true}
                globalContent={globalContent(true, true)}
            />
        );
        expect(comp).toMatchSnapshot();
    });

    it('should render IA button', () => {
        useTermica.mockImplementation(() => true);
        render(<BuildFirtsButtonsGroup globalContent={globalContent()} />);

        expect(
            screen.getByTitle(
                'Leer resumen generado por inteligencia artificial'
            )
        ).toBeInTheDocument();
    });
});
