import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OptionDelete from '../../../../../../components/features/foodit-global/common/MenuSemanal/components/MenuOptions/OptionDelete';

jest.mock('@ln/common-ui-dialog', () => {
    const Dialog = ({ isOpen, children, classnames }) => {
        if (!isOpen) return null;
        return (
            <div
                className={classnames?.base}
                data-testid="dialog"
                role="dialog"
            >
                <div
                    className={
                        classnames?.wrapper ||
                        'flex flex-column gap-16 gap-24_md gap-32_lg'
                    }
                >
                    {children}
                </div>
            </div>
        );
    };
    Dialog.Header = ({ children, className }) => (
        <div className={className} data-testid="dialog-header">
            {children}
        </div>
    );
    Dialog.Body = ({ children }) => (
        <div data-testid="dialog-body">{children}</div>
    );
    Dialog.Footer = ({ children, className }) => (
        <div
            className={
                className || 'flex flex-column gap-16 gap-24_md gap-32_lg'
            }
            data-testid="dialog-footer"
        >
            {children}
        </div>
    );
    return { Dialog };
});

jest.mock('@ln/foodit-ui-button', () => ({
    Button: ({ children, onClick, title, variant, ...rest }) => (
        <button
            data-variant={variant}
            onClick={onClick}
            title={title}
            {...rest}
        >
            {children}
        </button>
    )
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ children }) => <i data-testid="icon">{children}</i>
}));

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => {
        return function IconSprite({ name }) {
            return <span data-testid="icon-sprite">{name}</span>;
        };
    }
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Modals/RemoveIngredients/components/Message',
    () => ({
        Message: ({ type, bookmarkId, userBookmarks }) => (
            <div
                data-testid="message"
                data-type={type}
                data-bookmarkid={bookmarkId}
                data-count={userBookmarks?.length || 0}
            />
        )
    })
);

const makeItems = () => [
    { bookmarkId: 'a', name: 'A' },
    { bookmarkId: 'b', name: 'B' },
    { bookmarkId: 'c', name: 'C' }
];

function setup(overrides = {}) {
    const defaultProps = {
        bookmarkId: 'b',
        items: makeItems(),
        setItems: jest.fn(),
        deleteFunction: jest.fn().mockResolvedValue({ bookmarkId: 'b' }),
        filterKey: 'bookmarkId',
        isOpen: true,
        onClose: jest.fn(),
        messageType: 'menu'
    };

    const props = { ...defaultProps, ...overrides };
    render(<OptionDelete {...props} />);
    return props;
}

describe('OptionDelete', () => {
    it('render dialog and pass props to <Message/>', () => {
        const props = setup();
        expect(screen.getByTestId('dialog')).toBeInTheDocument();
        const msg = screen.getByTestId('message');
        expect(msg).toHaveAttribute('data-type', 'menu');
        expect(msg).toHaveAttribute('data-bookmarkid', 'b');
        expect(msg).toHaveAttribute('data-count', String(props.items.length));
        expect(screen.getByTitle(/Cerrar/i)).toBeInTheDocument();
    });

    it('button "Cerrar" calls onClose', () => {
        const props = setup();
        fireEvent.click(screen.getByTitle(/Cerrar/i));
        expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('button "Cancelar" calls onClose', () => {
        const props = setup();
        fireEvent.click(screen.getByTitle(/cancelar/i));
        expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('if deleteFunction is noop, filters items and closes', async () => {
        const props = setup({
            deleteFunction: () => {}
        });

        fireEvent.click(screen.getByTitle(/aceptar/i));

        await waitFor(() => {
            expect(props.setItems).toHaveBeenCalledWith([
                { bookmarkId: 'a', name: 'A' },
                { bookmarkId: 'c', name: 'C' }
            ]);
            expect(props.onClose).toHaveBeenCalled();
        });
    });

    it('if deleteFunction returns an object with bookmarkId, filters and closes', async () => {
        const props = setup({
            deleteFunction: jest.fn().mockResolvedValue({ bookmarkId: 'b' })
        });

        fireEvent.click(screen.getByTitle(/aceptar/i));

        await waitFor(() => {
            expect(props.deleteFunction).toHaveBeenCalledWith({
                bookmarkId: 'b'
            });
            expect(props.setItems).toHaveBeenCalledWith([
                { bookmarkId: 'a', name: 'A' },
                { bookmarkId: 'c', name: 'C' }
            ]);
            expect(props.onClose).toHaveBeenCalled();
        });
    });

    it('if deleteFunction returns a non-object value, uses original bookmarkId', async () => {
        const props = setup({
            deleteFunction: jest.fn().mockResolvedValue(true)
        });

        fireEvent.click(screen.getByTitle(/aceptar/i));

        await waitFor(() => {
            expect(props.setItems).toHaveBeenCalledWith([
                { bookmarkId: 'a', name: 'A' },
                { bookmarkId: 'c', name: 'C' }
            ]);
            expect(props.onClose).toHaveBeenCalled();
        });
    });

    it('if deleteFunction rejects, catch + onClose, without setItems', async () => {
        const props = setup({
            deleteFunction: jest.fn().mockRejectedValue(new Error('boom'))
        });

        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fireEvent.click(screen.getByTitle(/aceptar/i));

        await waitFor(() => {
            expect(props.setItems).not.toHaveBeenCalled();
            expect(props.onClose).toHaveBeenCalled();
        });

        spy.mockRestore();
    });

    it('uses custom filterKey to filter', async () => {
        const items = [
            { id: '1', bookmarkId: 'x', name: 'X' },
            { id: '2', bookmarkId: 'y', name: 'Y' },
            { id: '3', bookmarkId: 'z', name: 'Z' }
        ];

        const props = setup({
            items,
            bookmarkId: '2',
            filterKey: 'id',
            deleteFunction: jest.fn().mockResolvedValue({ bookmarkId: '2' })
        });

        fireEvent.click(screen.getByTitle(/aceptar/i));

        await waitFor(() => {
            expect(props.setItems).toHaveBeenCalledWith([
                { id: '1', bookmarkId: 'x', name: 'X' },
                { id: '3', bookmarkId: 'z', name: 'Z' }
            ]);
            expect(props.onClose).toHaveBeenCalled();
        });
    });
    it('if deleteFunction is undefined, filters items and closes', async () => {
        const props = setup({
            deleteFunction: undefined
        });

        fireEvent.click(screen.getByTitle(/aceptar/i));

        await waitFor(() => {
            expect(props.setItems).toHaveBeenCalledWith([
                { bookmarkId: 'a', name: 'A' },
                { bookmarkId: 'c', name: 'C' }
            ]);
            expect(props.onClose).toHaveBeenCalled();
        });
    });

    it('if deleteFunction.toString() === "() => {}", filters items and closes', async () => {
        const fn = () => {};
        fn.toString = () => '() => {}';

        const props = setup({
            deleteFunction: fn
        });

        fireEvent.click(screen.getByTitle(/aceptar/i));

        await waitFor(() => {
            expect(props.setItems).toHaveBeenCalledWith([
                { bookmarkId: 'a', name: 'A' },
                { bookmarkId: 'c', name: 'C' }
            ]);
            expect(props.onClose).toHaveBeenCalled();
        });
    });

    it('if deleteFunction returns an object without bookmarkId, without setItems', async () => {
        const props = setup({
            deleteFunction: jest.fn().mockResolvedValue({ ok: true })
        });

        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fireEvent.click(screen.getByTitle(/aceptar/i));

        await waitFor(() => {
            expect(props.setItems).not.toHaveBeenCalled();
            expect(props.onClose).toHaveBeenCalled();
        });

        spy.mockRestore();
    });
});
