import { createBannersIntersectionObserver } from '../../../../../components/private/common/banners/intersectionObservers';
import { mockSP } from '../../../../../__mocks__/data/banners/mockBannersData';
import { queueGoogletagCommand } from '../../../../../components/private/LN/common/utils/bannerHelper';

jest.mock('fusion:properties', () => () =>
    ({
        getProperties: () => {
            return mockSP;
        }
    }.getProperties())
);

jest.mock(
    '../../../../../components/private/LN/common/utils/bannerHelper',
    () => ({
        ...jest.requireActual(
            '../../../../../components/private/LN/common/utils/bannerHelper'
        ),
        queueGoogletagCommand: jest.fn()
    })
);

window.IntersectionObserver = jest.fn();

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

describe('createBannersIntersectionObserver', () => {
    beforeEach(() => {
        document.querySelectorAll = jest.fn(() => [
            {
                id: 'banner1',
                classList: { add: jest.fn() },
                opt_div: 'banner1'
            },
            {
                id: 'banner2',
                classList: { add: jest.fn() },
                opt_div: 'banner2'
            },
            { id: 'banner3', classList: { add: jest.fn() }, opt_div: 'banner3' }
        ]);

        global.IntersectionObserver = jest.fn((callback, options) => ({
            observe: jest.fn(),
            unobserve: jest.fn()
        }));
    });

    test('should create an intersection observer and observe elements', () => {
        createBannersIntersectionObserver();

        expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
        expect(global.IntersectionObserver).toHaveBeenCalledWith(
            expect.any(Function),
            {
                rootMargin: expect.any(String)
            }
        );

        expect(document.querySelectorAll).toHaveBeenCalledTimes(1);
        expect(document.querySelectorAll).toHaveBeenCalledWith('.lazy');

        const observerInstance =
            global.IntersectionObserver.mock.results[0].value;
        expect(observerInstance.observe).toHaveBeenCalledTimes(3);
        expect(observerInstance.observe).toHaveBeenCalledWith({
            id: 'banner1',
            classList: { add: expect.any(Function) },
            opt_div: 'banner1'
        });
        expect(observerInstance.observe).toHaveBeenCalledWith({
            id: 'banner2',
            classList: { add: expect.any(Function) },
            opt_div: 'banner2'
        });
        expect(observerInstance.observe).toHaveBeenCalledWith({
            id: 'banner3',
            classList: { add: expect.any(Function) },
            opt_div: 'banner3'
        });
    });

    test('should call queueGoogletagCommand function when intersection occurs', () => {
        const mockedEntries = [
            {
                isIntersecting: true,
                target: { id: 'caja5_mob', opt_div: 'caja5_mob' }
            },
            {
                isIntersecting: true,
                target: { id: 'caja5_mob', opt_div: 'caja5_mob' }
            }
        ];

        const observe = jest.fn();
        const unobserve = jest.fn();

        window.IntersectionObserver.mockImplementationOnce(() => ({
            observe,
            unobserve
        }));

        const observer = createBannersIntersectionObserver();

        const [callback] = window.IntersectionObserver.mock.calls[0];

        callback(mockedEntries, observer);

        expect(queueGoogletagCommand).toHaveBeenCalledTimes(2);
        expect(observe).toBeCalledTimes(3);
        expect(unobserve).toBeCalledTimes(2);
    });
});
