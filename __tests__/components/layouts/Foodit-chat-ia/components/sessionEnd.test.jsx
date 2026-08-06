import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SessionEnd } from '../../../../../components/layouts/Foodit-chat-ia/_children/SessionEnd';

let mockAppContext = {
    layout: 'FooditChatIA',
    siteProperties: { layoutsName: { FooditChatIA: 'FooditChatIA' } }
};

jest.mock('fusion:context', () => ({
    useAppContext: () => mockAppContext
}));

const closingText = () => screen.queryByText(/Espero haberte ayudado/);
const navigationLink = () => screen.queryByRole('link');

describe('SessionEnd', () => {
    describe('when the session completed', () => {
        it('should show the closing text', () => {
            render(<SessionEnd isSessionCompleted requestLimit />);

            expect(closingText()).toBeInTheDocument();
        });

        it('should show the navigation link together with the closing text', () => {
            render(<SessionEnd isSessionCompleted requestLimit />);

            expect(navigationLink()).toBeInTheDocument();
        });
    });

    describe('when the session ended without completing', () => {
        it('should hide the closing text', () => {
            render(<SessionEnd isSessionCompleted={false} requestLimit />);

            expect(closingText()).not.toBeInTheDocument();
        });

        it('should still show the navigation link', () => {
            render(<SessionEnd isSessionCompleted={false} requestLimit />);

            expect(navigationLink()).toBeInTheDocument();
        });
    });

    describe('when the chat is still open in the chat IA layout', () => {
        it('should not show the navigation link', () => {
            render(
                <SessionEnd isSessionCompleted={false} requestLimit={false} />
            );

            expect(navigationLink()).not.toBeInTheDocument();
        });
    });

    describe('in any other layout', () => {
        beforeEach(() => {
            mockAppContext = {
                layout: 'FooditHome',
                siteProperties: {
                    layoutsName: { FooditChatIA: 'FooditChatIA' }
                }
            };
        });

        it('should show the navigation link even with the chat open', () => {
            render(
                <SessionEnd isSessionCompleted={false} requestLimit={false} />
            );

            expect(navigationLink()).toBeInTheDocument();
        });
    });
});
