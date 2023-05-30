import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScriptVideoPowaHTML from '../../../../../components/private/common/scriptManager/scriptVideoPowaHTML';
import {
    HTMLLIBRE,
    NOTICIA
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('components - private - common - ScriptVideoPowaHTML', () => {
    it('should render by having the correct subtype in home section', () => {
        const { container } = render(
            <ScriptVideoPowaHTML subtype={HTMLLIBRE} />
        );
        const scriptElement = container.querySelector('script');
        expect(scriptElement).toBeInTheDocument();
    });
    it('should not render when subtype is not HTMLLIBRE', () => {
        const { container } = render(<ScriptVideoPowaHTML subtype={NOTICIA} />);
        const scriptElement = container.querySelector('script');
        expect(scriptElement).not.toBeInTheDocument();
    });
    it('should not render when subtype not exist', () => {
        const { container } = render(
            <ScriptVideoPowaHTML subtype={undefined} />
        );
        const scriptElement = container.querySelector('script');
        expect(scriptElement).not.toBeInTheDocument();
    });
});
