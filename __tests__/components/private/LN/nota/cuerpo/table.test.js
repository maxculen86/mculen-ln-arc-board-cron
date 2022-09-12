import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../../../../../../components/private/LN/nota/cuerpo/table';
import { recipeTableConvert } from '../../../../../../content/sources/utils/powerUp';
import Context from 'fusion:context';
import tableNote from '../../../../../../__mocks__/data/nota/cuerpo/table/tableNote.json';
import tableRecipeRaw from '../../../../../../__mocks__/data/nota/cuerpo/table/tableRecipeRaw.json';
import tableRecipeConverted from '../../../../../../__mocks__/data/nota/cuerpo/table/tableRecipeConverted.json';

jest.mock('fusion:static', () => 'mock-static');
jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
Context.useAppContext = jest.fn(() => ({
    outputType: 'default'
}));

describe('components - private - LN - common - Utils - recipeTableConvert', () => {
    it('Should convert recipe nutritional info table format (powerUp) to expected note table format (arc)', () => {
        expect(recipeTableConvert(tableRecipeRaw)).toStrictEqual(
            tableRecipeConverted
        );
    });
    it('Should return null when no data present', () => {
        expect(recipeTableConvert()).toBeNull();
    });
});
describe('features - LaNacion - Nota - Table', () => {
    describe('Note - should render table correctly according to props', () => {
        it('Should show table with correct ammount of rows', () => {
            const { container } = render(<Table data={tableNote} />);
            expect(container).not.toBeEmptyDOMElement();
            expect(screen.queryByRole('table')).toBeTruthy();
            expect(screen.queryAllByRole('row')).toHaveLength(4);
            expect(screen.queryAllByRole('rowgroup')).toHaveLength(2);
        });
        it('Should show two column headers', () => {
            render(<Table data={tableNote} />);
            expect(screen.queryAllByRole('columnheader')).toHaveLength(2);
            expect(screen.queryByText('MockColumn1')).toBeTruthy();
            expect(screen.queryByText('MockColumn2')).toBeTruthy();
        });
        it('Should show correct ammount of cells', () => {
            render(<Table data={tableNote} />);
            expect(screen.queryAllByRole('cell')).toHaveLength(6);
        });
        it('Should NOT show column headers when no headers provided', () => {
            tableNote.header = undefined;
            render(<Table data={tableNote} />);
            expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
            expect(screen.queryByText('MockColumn1')).toBeFalsy();
            expect(screen.queryByText('MockColumn2')).toBeFalsy();
        });
    });
    describe('Should NOT render table', () => {
        it('Should not render without props', () => {
            const { container } = render(<Table />);
            expect(container).toBeEmptyDOMElement();
        });
        it('Should not render without rows', () => {
            tableNote.rows = [];
            const { container } = render(<Table data={tableNote} />);
            expect(container).toBeEmptyDOMElement();
        });
    });
    describe('Recipe - should render table correctly according to props', () => {
        it('Should show table with correct ammount of rows', () => {
            const { container } = render(<Table data={tableRecipeConverted} />);
            expect(container).not.toBeEmptyDOMElement();
            expect(screen.queryByRole('table')).toBeTruthy();
            expect(screen.queryAllByRole('row')).toHaveLength(13);
            expect(screen.queryAllByRole('rowgroup')).toHaveLength(2);
        });
        it('Should show two column headers', () => {
            render(<Table data={tableRecipeConverted} />);
            expect(screen.queryAllByRole('columnheader')).toHaveLength(2);
            expect(screen.queryByText('Propiedad')).toBeTruthy();
            expect(screen.queryByText('Cantidad por porción')).toBeTruthy();
        });
    });
});
