import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CajaEncuesta from '../../../../components/chains/LN10_Caja_Encuesta/default';
import { addEventToDataLayerV2 } from '../../../../components/private/LN/common/utils/addEventToDataLayer';
import useNotaSegment from '../../../../components/private/LN/common/hooks/useNotaSegment';
import {
    ANONYMOUS_VOTE_ATTEMPT_RESULTS,
    BOX_LOCATIONS,
    ENCUESTA_COMPONENT_NAME,
    ENCUESTA_HOME_EXPERIMENT_NAME,
    ENCUESTA_HOME_STATE_STORAGE_KEY,
    ENCUESTA_IMPRESSION_EVENT,
    ENCUESTA_POST_ID,
    ENCUESTA_SCRIPT_ID,
    ENCUESTA_SCRIPT_URL,
    ENCUESTA_VOTE_STORAGE_KEY,
    USER_STATE_CODES
} from '../../../../components/chains/LN10_Caja_Encuesta/constants';

jest.mock(
    'fusion:environment',
    () => ({
        COOKIE_EXPIRATION: '3600000',
        DOMINIO_COOKIE: 'localhost'
    }),
    { virtual: true }
);

jest.mock('fusion:consumer', () => Component => Component, { virtual: true });

jest.mock(
    'fusion:prop-types',
    () => {
        const taggable = fn => {
            fn.tag = () => fn;
            fn.isRequired = fn;
            return fn;
        };

        return {
            list: taggable(jest.fn()),
            oneOf: jest.fn(() => taggable(jest.fn())),
            shape: jest.fn(() => taggable(jest.fn()))
        };
    },
    { virtual: true }
);

jest.mock('../../../../components/private/LN/common/hooks/useNotaSegment', () =>
    jest.fn()
);

jest.mock(
    '../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

const baseProps = ({
    testDigits = ['1', '3'],
    controlDigits = ['0', '2'],
    boxLocation = BOX_LOCATIONS.CAJA_1
} = {}) => ({
    customFields: {
        testDigits,
        controlDigits,
        boxLocation
    }
});

const mockSegmentReady = (segment = 'test', ready = true) => {
    useNotaSegment.mockReturnValue({ segment, ready });
};

const setVoteStorage = voteState => {
    const normalizedVoteState =
        typeof voteState === 'object'
            ? { pollId: ENCUESTA_POST_ID, ...voteState }
            : { pollId: ENCUESTA_POST_ID, hasPosted: voteState };

    window.localStorage.setItem(
        ENCUESTA_VOTE_STORAGE_KEY,
        JSON.stringify(normalizedVoteState)
    );
};

const setHomeStateStorage = (
    box1ViewportEntryCount,
    box2ViewportEntryCount = 0,
    extraState = {}
) => {
    window.localStorage.setItem(
        ENCUESTA_HOME_STATE_STORAGE_KEY,
        JSON.stringify({
            box1ViewportEntryCount,
            box2ViewportEntryCount,
            ...extraState
        })
    );
};

const getHomeStateStorage = () =>
    JSON.parse(window.localStorage.getItem(ENCUESTA_HOME_STATE_STORAGE_KEY));

let observeMock;
let disconnectMock;

const mockIntersectionObserver = () => {
    observeMock = jest.fn();
    disconnectMock = jest.fn();

    window.IntersectionObserver = jest.fn(callback => ({
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: jest.fn(),
        takeRecords: jest.fn(() => []),
        root: null,
        rootMargin: '',
        thresholds: []
    }));
};

const triggerIntersection = isIntersecting => {
    const [callback] = window.IntersectionObserver.mock.calls[0];

    callback([{ isIntersecting }]);
};

describe('LN10_Caja_Encuesta', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.head.innerHTML = '';
        window.localStorage.clear();
        delete window.IntersectionObserver;
        mockSegmentReady('test');
    });

    it('invokes useNotaSegment with configured digit lists and fixed experiment name', () => {
        render(<CajaEncuesta {...baseProps()} />);

        expect(useNotaSegment).toHaveBeenCalledWith({
            experimentName: ENCUESTA_HOME_EXPERIMENT_NAME,
            testDigits: ['1', '3'],
            controlDigits: ['0', '2'],
            syncSegmentoNotaStorage: false
        });
    });

    it('renders the encuesta for test users in caja_1', () => {
        const { container } = render(<CajaEncuesta {...baseProps()} />);
        const encuesta = container.querySelector('nd-encuestas');

        expect(encuesta).toBeInTheDocument();
        expect(encuesta).toHaveAttribute('post-id', '3');
        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-skip-impression',
            'true'
        );
        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-box-location',
            BOX_LOCATIONS.CAJA_1
        );
    });

    it('loads the external module script when the encuesta renders', () => {
        render(<CajaEncuesta {...baseProps()} />);

        const script = document.getElementById(ENCUESTA_SCRIPT_ID);

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('type', 'module');
        expect(script).toHaveAttribute('src', ENCUESTA_SCRIPT_URL);
    });

    it('does not render for control users', () => {
        mockSegmentReady('control');

        const { container } = render(<CajaEncuesta {...baseProps()} />);

        expect(container).toBeEmptyDOMElement();
        expect(document.getElementById(ENCUESTA_SCRIPT_ID)).toBeNull();
    });

    it('does not render while segmentation is not ready', () => {
        mockSegmentReady(null, false);

        const { container } = render(<CajaEncuesta {...baseProps()} />);

        expect(container).toBeEmptyDOMElement();
        expect(document.getElementById(ENCUESTA_SCRIPT_ID)).toBeNull();
    });

    it('does not render for users without segment', () => {
        mockSegmentReady(null);

        const { container } = render(<CajaEncuesta {...baseProps()} />);

        expect(container).toBeEmptyDOMElement();
        expect(document.getElementById(ENCUESTA_SCRIPT_ID)).toBeNull();
    });

    it('does not render caja_2 when the target decision is caja_1', () => {
        const { container } = render(
            <CajaEncuesta
                {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_2 })}
            />
        );

        expect(container).toBeEmptyDOMElement();
        expect(document.getElementById(ENCUESTA_SCRIPT_ID)).toBeNull();
    });

    it('renders caja_2 when the user voted and caja_1 had 3 or more views', () => {
        setVoteStorage(true);
        setHomeStateStorage(3);

        const { container } = render(
            <CajaEncuesta
                {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_2 })}
            />
        );
        const encuesta = container.querySelector('nd-encuestas');

        expect(encuesta).toBeInTheDocument();
        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-box-location',
            BOX_LOCATIONS.CAJA_2
        );
    });

    it('ignores vote storage from another poll and keeps caja_1', () => {
        setVoteStorage({ pollId: '99', hasPosted: true });
        setHomeStateStorage(3);

        const { container } = render(
            <>
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_1 })}
                />
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_2 })}
                />
            </>
        );

        expect(container.querySelectorAll('nd-encuestas')).toHaveLength(1);
        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-box-location',
            BOX_LOCATIONS.CAJA_1
        );
    });

    it('keeps caja_1 when the user voted and caja_1 had fewer than 3 views', () => {
        setVoteStorage(true);
        setHomeStateStorage(2);

        const { container } = render(
            <>
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_1 })}
                />
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_2 })}
                />
            </>
        );

        expect(container.querySelectorAll('nd-encuestas')).toHaveLength(1);
        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-box-location',
            BOX_LOCATIONS.CAJA_1
        );
    });

    it('does not duplicate the encuesta when caja_1 and caja_2 instances coexist with caja_2 target', () => {
        setVoteStorage(true);
        setHomeStateStorage(3);

        const { container } = render(
            <>
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_1 })}
                />
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_2 })}
                />
            </>
        );

        expect(container.querySelectorAll('nd-encuestas')).toHaveLength(1);
        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-box-location',
            BOX_LOCATIONS.CAJA_2
        );
        expect(
            document.querySelectorAll(`#${ENCUESTA_SCRIPT_ID}`)
        ).toHaveLength(1);
    });

    it('does not duplicate the script when caja_1 and caja_2 instances coexist with caja_1 target', () => {
        const { container } = render(
            <>
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_1 })}
                />
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_2 })}
                />
            </>
        );

        expect(container.querySelectorAll('nd-encuestas')).toHaveLength(1);
        expect(
            document.querySelectorAll(`#${ENCUESTA_SCRIPT_ID}`)
        ).toHaveLength(1);
    });

    it('keeps the initial target stable during the same render lifecycle', () => {
        setVoteStorage(true);
        setHomeStateStorage(2);

        const { rerender } = render(
            <CajaEncuesta
                {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_1 })}
            />
        );

        setHomeStateStorage(3);

        rerender(
            <CajaEncuesta
                {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_1 })}
            />
        );

        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-box-location',
            BOX_LOCATIONS.CAJA_1
        );
    });

    it('keeps caja_1 when an anonymous vote attempt posted after login', () => {
        setVoteStorage({
            hasPosted: true,
            deferredVote: true,
            timestamp: new Date().toISOString()
        });
        setHomeStateStorage(3);

        const { container } = render(
            <>
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_1 })}
                />
                <CajaEncuesta
                    {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_2 })}
                />
            </>
        );

        expect(container.querySelectorAll('nd-encuestas')).toHaveLength(1);
        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-box-location',
            BOX_LOCATIONS.CAJA_1
        );
    });

    it('keeps caja_1 when an anonymous vote attempt did not post', () => {
        setVoteStorage({
            hasPosted: false,
            deferredVote: true,
            timestamp: new Date().toISOString()
        });
        setHomeStateStorage(2);

        render(<CajaEncuesta {...baseProps()} />);

        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-box-location',
            BOX_LOCATIONS.CAJA_1
        );
    });

    it('ignores consumed anonymous vote attempts and renders caja_2 when vote and views require it', () => {
        const timestamp = '2026-05-22T11:00:00.000Z';

        setVoteStorage({
            hasPosted: true,
            deferredVote: true,
            timestamp
        });
        setHomeStateStorage(3, 0, {
            consumedDeferredVoteKey: `${timestamp}|${ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED}`
        });

        render(
            <CajaEncuesta
                {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_2 })}
            />
        );

        expect(screen.getByTestId('encuesta-wrapper')).toHaveAttribute(
            'data-box-location',
            BOX_LOCATIONS.CAJA_2
        );
    });

    it('increments caja_1 views and sends the dataLayer impression when it enters viewport', () => {
        mockIntersectionObserver();

        render(<CajaEncuesta {...baseProps()} />);

        act(() => {
            triggerIntersection(true);
        });

        expect(getHomeStateStorage()).toEqual({
            box1ViewportEntryCount: 1,
            box2ViewportEntryCount: 0
        });
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: ENCUESTA_IMPRESSION_EVENT,
            rest: {
                poll_id: '3',
                component: ENCUESTA_COMPONENT_NAME,
                slot: BOX_LOCATIONS.CAJA_1,
                segment: 'test',
                viewport_entry_count: 1,
                state_code: USER_STATE_CODES.NOT_POSTED_FIRST_VIEW
            }
        });
        expect(disconnectMock).not.toHaveBeenCalled();
    });

    it('increments caja_2 views and sends the posted state code for voted users', () => {
        mockIntersectionObserver();
        setVoteStorage(true);
        setHomeStateStorage(3, 2);

        render(
            <CajaEncuesta
                {...baseProps({ boxLocation: BOX_LOCATIONS.CAJA_2 })}
            />
        );

        act(() => {
            triggerIntersection(true);
        });

        expect(getHomeStateStorage()).toEqual({
            box1ViewportEntryCount: 3,
            box2ViewportEntryCount: 3
        });
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: ENCUESTA_IMPRESSION_EVENT,
            rest: {
                poll_id: '3',
                component: ENCUESTA_COMPONENT_NAME,
                slot: BOX_LOCATIONS.CAJA_2,
                segment: 'test',
                viewport_entry_count: 3,
                state_code: USER_STATE_CODES.POSTED_THREE_OR_MORE_VIEWS
            }
        });
    });

    it('sends the login return state code for posted anonymous vote attempts', () => {
        mockIntersectionObserver();
        const timestamp = new Date().toISOString();

        setVoteStorage({
            hasPosted: true,
            deferredVote: true,
            timestamp
        });
        setHomeStateStorage(3);

        render(<CajaEncuesta {...baseProps()} />);

        act(() => {
            triggerIntersection(true);
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: ENCUESTA_IMPRESSION_EVENT,
            rest: {
                poll_id: '3',
                component: ENCUESTA_COMPONENT_NAME,
                slot: BOX_LOCATIONS.CAJA_1,
                segment: 'test',
                viewport_entry_count: 4,
                state_code: USER_STATE_CODES.POSTED_LOGIN_RETURN
            }
        });
        expect(getHomeStateStorage()).toMatchObject({
            box1ViewportEntryCount: 4,
            box2ViewportEntryCount: 0,
            consumedDeferredVoteKey: `${timestamp}|${ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED}`
        });
    });

    it('consumes the deferred vote state only on the first viewport entry', () => {
        mockIntersectionObserver();
        const timestamp = new Date().toISOString();

        setVoteStorage({
            hasPosted: true,
            deferredVote: true,
            timestamp
        });
        setHomeStateStorage(3);

        render(<CajaEncuesta {...baseProps()} />);

        act(() => {
            triggerIntersection(true);
            triggerIntersection(false);
            triggerIntersection(true);
        });

        expect(getHomeStateStorage()).toMatchObject({
            box1ViewportEntryCount: 5,
            box2ViewportEntryCount: 0,
            consumedDeferredVoteKey: `${timestamp}|${ANONYMOUS_VOTE_ATTEMPT_RESULTS.POSTED}`
        });
        expect(addEventToDataLayerV2).toHaveBeenNthCalledWith(1, {
            event: ENCUESTA_IMPRESSION_EVENT,
            rest: {
                poll_id: '3',
                component: ENCUESTA_COMPONENT_NAME,
                slot: BOX_LOCATIONS.CAJA_1,
                segment: 'test',
                viewport_entry_count: 4,
                state_code: USER_STATE_CODES.POSTED_LOGIN_RETURN
            }
        });
        expect(addEventToDataLayerV2).toHaveBeenNthCalledWith(2, {
            event: ENCUESTA_IMPRESSION_EVENT,
            rest: {
                poll_id: '3',
                component: ENCUESTA_COMPONENT_NAME,
                slot: BOX_LOCATIONS.CAJA_1,
                segment: 'test',
                viewport_entry_count: 5,
                state_code: USER_STATE_CODES.POSTED_THREE_OR_MORE_VIEWS
            }
        });
    });

    it('does not track an impression before the wrapper enters viewport', () => {
        mockIntersectionObserver();

        render(<CajaEncuesta {...baseProps()} />);

        act(() => {
            triggerIntersection(false);
        });

        expect(
            window.localStorage.getItem(ENCUESTA_HOME_STATE_STORAGE_KEY)
        ).toBeNull();
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('tracks each viewport entry without duplicating while it remains visible', () => {
        mockIntersectionObserver();

        render(<CajaEncuesta {...baseProps()} />);

        act(() => {
            triggerIntersection(true);
            triggerIntersection(true);
            triggerIntersection(false);
            triggerIntersection(true);
        });

        expect(getHomeStateStorage()).toEqual({
            box1ViewportEntryCount: 2,
            box2ViewportEntryCount: 0
        });
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(2);
        expect(addEventToDataLayerV2).toHaveBeenNthCalledWith(2, {
            event: ENCUESTA_IMPRESSION_EVENT,
            rest: {
                poll_id: '3',
                component: ENCUESTA_COMPONENT_NAME,
                slot: BOX_LOCATIONS.CAJA_1,
                segment: 'test',
                viewport_entry_count: 2,
                state_code: USER_STATE_CODES.NOT_POSTED_TWO_OR_MORE_VIEWS
            }
        });
    });
});
