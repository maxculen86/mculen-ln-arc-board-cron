import { setupIntersectionObserver } from '../../../../../components/features/LN-10-global/common/utils/intersectionObserver';

window.IntersectionObserver = jest.fn();

let ref;
let htmlContent;
let observerInstance;
let entries;

beforeAll(() => {
    global.IntersectionObserver = jest.fn((callback, options) => ({
        observe: jest.fn(),
        unobserve: jest.fn()
    }));
});

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

describe('LN-10-Global - Common - Utils - IntersectionObserver', () => {
    describe('setupIntersectionObserver', () => {
        beforeEach(() => {
            ref = {
                current: document.createElement('div')
            };
            htmlContent = `
                <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/FW3tBCPnOxA?autoplay=1&mute=1" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                </iframe>
            `;

            setupIntersectionObserver(ref, htmlContent);
            observerInstance =
                global.IntersectionObserver.mock.results[0].value;

            entries = [{ isIntersecting: true, target: ref.current }];
        });

        it('should observe the ref element when it is available', () => {
            expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
            expect(observerInstance.observe).toHaveBeenCalledWith(ref.current);
        });

        it('should unobserve the element and set innerHTML when it intersects', () => {
            const [callback] = global.IntersectionObserver.mock.calls[0];

            callback(entries, observerInstance);

            const parser = new DOMParser();
            const expectedDoc = parser.parseFromString(
                htmlContent,
                'text/html'
            );
            const receivedDoc = parser.parseFromString(
                ref.current.innerHTML,
                'text/html'
            );

            expect(receivedDoc.body.innerHTML).toBe(expectedDoc.body.innerHTML);
            expect(observerInstance.unobserve).toHaveBeenCalledWith(
                ref.current
            );
        });

        it('should not observe if ref.current is not available', () => {
            ref.current = null;
            setupIntersectionObserver(ref, htmlContent);
            observerInstance =
                global.IntersectionObserver.mock.results[1].value;

            expect(global.IntersectionObserver).toHaveBeenCalledTimes(2);
            expect(observerInstance.observe).not.toHaveBeenCalled();
        });

        it('should handle non-intersecting entries', () => {
            entries[0].isIntersecting = false;
            const [callback] = global.IntersectionObserver.mock.calls[0];

            callback(entries, observerInstance);

            expect(ref.current.innerHTML).not.toBe(htmlContent);
            expect(observerInstance.unobserve).not.toHaveBeenCalled();
        });
    });
});
