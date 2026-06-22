import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import globalContentMock from '../../../../../__mocks__/data/nota/body/globalContent.json';

jest.mock('fusion:context', () => ({
    __esModule: true,
    default: jest.fn(comp => comp),
    useAppContext: jest.fn()
}));

jest.mock('fusion:consumer', () => ({
    __esModule: true,
    default: jest.fn(comp => comp)
}));

jest.mock('fusion:properties', () => ({
    __esModule: true,
    default: jest.fn(() => ({}))
}));

jest.mock('fusion:prop-types', () => {
    const tag = jest.fn(() => validator);
    const validator = Object.assign(jest.fn(), { isRequired: jest.fn(), tag });
    return {
        shape: jest.fn(() => validator),
        oneOf: jest.fn(() => validator)
    };
});

jest.mock(
    '../../../../../components/features/LN/DS-Body/helpers/registerScrollTracking',
    () => ({ __esModule: true, default: jest.fn() })
);

jest.mock(
    '../../../../../components/private/common/hooks/useViewportSize',
    () => ({ __esModule: true, default: jest.fn(() => 'desktop') })
);

jest.mock(
    '../../../../../components/features/LN-nota/body/_children/BaseBodyWrapper',
    () =>
        ({ children }) => <div data-testid="body-root">{children}</div>
);

const { useAppContext } = require('fusion:context');
const DsBody =
    require('../../../../../components/features/LN/DS-Body/default').default;

const STORYTELLING_V2_LAYOUT = 'LN-nota-storytelling-v2';

const baseGlobalContent = {
    ...globalContentMock,
    _id: 'note-1'
};

function renderWithBannersVisibility(labelText) {
    const { label: baseLabel = {}, ...restGlobalContent } = baseGlobalContent;
    const label =
        labelText === null
            ? baseLabel
            : {
                  ...baseLabel,
                  mostrar_banners: {
                      display: true,
                      text: labelText,
                      url: ''
                  }
              };

    useAppContext.mockReturnValue({
        outputType: 'default',
        layout: STORYTELLING_V2_LAYOUT,
        globalContent: { ...restGlobalContent, label }
    });

    return render(<DsBody />);
}

function countRenderedBannerSlots(container) {
    const bannerSlotIdPattern = /^(body_)?(cinturon|caja)\d+_(dsk|mob)$/;
    return Array.from(container.querySelectorAll('[id]')).filter(element =>
        bannerSlotIdPattern.test(element.id)
    ).length;
}

describe('components - features - LN - DS-Body - default - banners visibility guard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('suppresses every dynamic banner slot when the visibility label is "No"', () => {
        const { container } = renderWithBannersVisibility('No');
        expect(countRenderedBannerSlots(container)).toBe(0);
    });

    it('suppresses every dynamic banner slot for the lowercase value "no"', () => {
        const { container } = renderWithBannersVisibility('no');
        expect(countRenderedBannerSlots(container)).toBe(0);
    });

    it('renders dynamic banner slots when the visibility label is "Si"', () => {
        const { container } = renderWithBannersVisibility('Si');
        expect(countRenderedBannerSlots(container)).toBeGreaterThan(0);
    });

    it('renders dynamic banner slots when the visibility label is absent', () => {
        const { container } = renderWithBannersVisibility(null);
        expect(countRenderedBannerSlots(container)).toBeGreaterThan(0);
    });
});
