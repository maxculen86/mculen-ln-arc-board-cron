import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BodyPost from '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/body/BodyPost';
import PostExpandable from '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/body/PostExpandable';

jest.mock('fusion:context', () => ({
    default: Component => props => <Component {...props} />
}));

jest.mock('fusion:consumer', () => ({
    __esModule: true,
    default: fn => fn
}));

jest.mock(
    '../../../../../components/features/LN-common/shareV2/hooks/useTooltipVisibility',
    () => ({
        __esModule: true,
        default: () => ({
            isTooltipVisible: {
                'test-id': true
            },
            handleTooltipVisibility: jest.fn()
        })
    })
);

jest.mock(
    '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/body/PostAuthor',
    () => ({
        __esModule: true,
        default: ({ dataAuthor }) => {
            if (!dataAuthor) return null;
            // Busca el nombre en dataAuthor.author.name
            const name = dataAuthor.author?.name || dataAuthor.name || '';
            return (
                <div data-testid="post-author">
                    {name && <span>{name}</span>}
                    {dataAuthor.shouldShowRole && dataAuthor.role && (
                        <span>{dataAuthor.role}</span>
                    )}
                </div>
            );
        }
    })
);

export const commonBodyPostProps = {
    id: 'test-id',
    isPinned: false,
    outputType: 'section',
    globalContent: {},
    isExpandable: false,
    headerProps: {
        displayTime: '17:32',
        title: 'Test Title',
        date: '04 de Junio de 2025'
    },
    expandableProps: {
        hiddenTextItems: [{ type: 'text', content: 'Texto oculto' }]
    }
};

export const commonPostExpandableProps = {
    isOpen: false,
    onToggle: jest.fn(),
    label: 'Mostrar más',
    outputType: 'section',
    globalContent: {},
    hiddenTextItems: [{ type: 'text', content: 'Texto oculto' }]
};

describe('Components - layouts - LN-Nota-Liveblog_Editorial - components - body - BodyPost', () => {
    it('should render "Mostrar más" button when isExpandable is true', () => {
        render(
            <BodyPost {...commonBodyPostProps} isExpandable={true}>
                <div>Post Content</div>
            </BodyPost>
        );
        expect(screen.getByText('Mostrar más')).toBeInTheDocument();
    });

    it('should render PostPinned when isPinned is true', () => {
        render(
            <BodyPost {...commonBodyPostProps} isPinned={true} id="post-1">
                <div>Post Content</div>
            </BodyPost>
        );
        expect(document.querySelector('.w-40')).toBeInTheDocument();

        const wrapper = document.getElementById('post-1');
        expect(wrapper).toHaveClass('liveBlog_post');
        expect(wrapper).not.toHaveClass('liveBlog_post--unpinned');

        const border = wrapper.querySelector('.border');
        expect(border).toHaveClass(
            'border-2_m border-danger-600_m bg-neutral-light-50'
        );
    });

    it('should render only displayTime when date is not provided', () => {
        render(
            <BodyPost
                {...commonBodyPostProps}
                headerProps={{
                    displayTime: '17:32',
                    title: 'Test Title',
                    date: null
                }}
            >
                <div>Post Content</div>
            </BodyPost>
        );
        expect(screen.getByText('17:32')).toBeInTheDocument();
    });

    it('should render only date when displayTime is not provided', () => {
        render(
            <BodyPost
                {...commonBodyPostProps}
                headerProps={{
                    displayTime: null,
                    title: 'Test Title',
                    date: '04 de Junio de 2025'
                }}
            >
                <div>Post Content</div>
            </BodyPost>
        );
        expect(screen.getByText('04 de Junio de 2025')).toBeInTheDocument();
    });

    it('should render both displayTime and date with a separator when both are provided', () => {
        render(
            <BodyPost {...commonBodyPostProps}>
                <div>Post Content</div>
            </BodyPost>
        );
        expect(screen.getByText('17:32')).toBeInTheDocument();
        expect(screen.getByText('04 de Junio de 2025')).toBeInTheDocument();
        expect(document.querySelector('.separator')).toBeInTheDocument();
    });

    it('should render the tooltip when its id is set as visible', () => {
        render(<BodyPost {...commonBodyPostProps} />);
        expect(screen.getByText('Link copiado')).toBeInTheDocument();
    });

    it('should match snapshot when PostExpandable is expanded', () => {
        const { container } = render(
            <PostExpandable {...commonPostExpandableProps} isOpen={true} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot when PostExpandable is collapsed', () => {
        const { container } = render(
            <PostExpandable {...commonPostExpandableProps} isOpen={false} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should render author name and role if provided', () => {
        const author = {
            name: 'Fabián Beremblum',
            link: '/autor/fabian-beremblum-6409/'
        };
        const dataAuthor = {
            author,
            authors: [author],
            showSignatureWithAuthors: true,
            position: 'Top',
            size: 12,
            photo: '/profile.png',
            role: 'Jefe de comentarios',
            shouldShowRole: true
        };
        render(
            <BodyPost
                {...commonBodyPostProps}
                headerProps={{
                    ...commonBodyPostProps.headerProps,
                    dataAuthor
                }}
            >
                <div>Post Content</div>
            </BodyPost>
        );
        expect(screen.getByTestId('post-author')).toHaveTextContent(
            'Fabián Beremblum'
        );
        expect(screen.getByTestId('post-author')).toHaveTextContent(
            'Jefe de comentarios'
        );
    });
});
