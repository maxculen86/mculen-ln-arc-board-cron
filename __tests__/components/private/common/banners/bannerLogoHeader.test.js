import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import BannerLogoHeader from '../../../../../components/private/common/banners/BannerLogoHeader';
import { queueGoogletagCommand } from '../../../../../components/private/LN/common/utils/bannerHelper';

jest.mock('fusion:static', () => 'mock-static');

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

jest.mock(
    '../../../../../components/private/LN/common/utils/bannerHelper',
    () => ({
        ...jest.requireActual(
            '../../../../../components/private/LN/common/utils/bannerHelper'
        ),
        queueGoogletagCommand: jest.fn()
    })
);

describe('Components - Private -  Common - Banners - BannerLogoHeader', () => {
    it('should call queueGoogleTagCommand function', () => {
        Context.useAppContext = jest.fn(() => ({
            siteProperties: {
                bannerConfig: {
                    common: config
                }
            }
        }));
        render(<BannerLogoHeader />);
        expect(queueGoogletagCommand).toHaveBeenCalledTimes(1);
    });
    it('should call bannerLogoHeader with staticContent in home', () => {
        Context.useAppContext = jest.fn(() => ({
            layout: 'LN-Home_Main',
            siteProperties: {
                bannerConfig: {
                    common: config
                }
            }
        }));
        const { container } = render(<BannerLogoHeader />);
        expect(container.getElementsByClassName('hidden').length).toBe(1);
    });
    it('should call bannerLogoHeader with staticContent in distributor', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: { node_type: 'distributor' },
            siteProperties: {
                bannerConfig: {
                    common: config
                }
            }
        }));
        const { container } = render(<BannerLogoHeader />);
        expect(container.getElementsByClassName('hidden').length).toBe(1);
    });
    it('should match snapshot', () => {
        Context.useAppContext = jest.fn(() => ({
            siteProperties: {
                bannerConfig: {
                    common: config
                }
            }
        }));
        const { container } = render(<BannerLogoHeader />);
        expect(container).toMatchSnapshot();
    });
});

const config = {
    desktop: {
        logo_header_dsk: {
            slotName: 'la_nacion_desktop/logo_header_dsk',
            dimensions: [[300, 30]]
        }
    },
    mobile: {
        logo_header_mob: {
            slotName: 'la_nacion_mobile/logo_header_mob',
            dimensions: [[170, 17]]
        }
    },
    tablet: {
        logo_header_tab: {
            slotName: 'la_nacion_tablet/logo_header_tab',
            dimensions: [[200, 20]]
        }
    }
};
