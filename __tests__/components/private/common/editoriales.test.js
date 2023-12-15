import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Editoriales from '../../../../components/private/common/editoriales';

// Mock de fusion:context y fusion:properties si es necesario
jest.mock('fusion:context', () => Component => props => (
    <Component {...props} />
));
jest.mock('fusion:properties', () => () => ({}));

describe('Editoriales test', () => {
    const editorialesProps = {
        articles: [],
        layout: 'editoriales2',
        title: 'Editoriales',
        link: '',
        arcSite: 'la-nacion-ar'
    };

    it('Matches snapshot', () => {
        const { container } = render(<Editoriales {...editorialesProps} />);
        expect(container).toMatchSnapshot();
    });

    it('Renders title', () => {
        const { getByText } = render(<Editoriales {...editorialesProps} />);
        expect(getByText('Editoriales')).toBeInTheDocument();
    });

    it('Renders empty articles', () => {
        const { queryAllByRole } = render(
            <Editoriales {...editorialesProps} />
        );
        expect(queryAllByRole('article')).toHaveLength(0);
    });

    it('renders with Articles', () => {
        const _editorialesProps = {
            articles: ['1', '2', '3'],
            layout: 'editoriales2',
            title: 'Editoriales',
            link: '',
            arcSite: 'la-nacion-ar'
        };
        const { getAllByRole } = render(<Editoriales {..._editorialesProps} />);
        expect(getAllByRole('article')).toHaveLength(3);
    });
});
