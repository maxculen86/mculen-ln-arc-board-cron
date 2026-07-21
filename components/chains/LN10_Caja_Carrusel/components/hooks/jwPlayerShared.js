import get from '../../../../private/common/utils/get';

export const HOST_Z_INDEX = '40';
// Overlay chrome (Volver, Share, swipe legend) must stack above the host (40).
export const OVERLAY_Z_INDEX = 50;

export const hasDom = () =>
    typeof window !== 'undefined' && typeof document !== 'undefined';

export const invokeMethod = (target, methodName, ...args) => {
    const method = get(target, methodName);

    if (typeof method !== 'function') return undefined;

    return method.apply(target, args);
};

export const positionHostOverRect = ({
    host,
    target,
    player,
    lastSize,
    setLastSize,
    force = false,
    onResizeError
}) => {
    const getBoundingClientRect = get(target, 'getBoundingClientRect');
    const rect =
        typeof getBoundingClientRect === 'function'
            ? getBoundingClientRect.call(target)
            : undefined;

    if (!rect || !host) return null;

    const hostStyle = host.style;
    hostStyle.position = 'fixed';
    hostStyle.top = `${rect.top}px`;
    hostStyle.left = `${rect.left}px`;
    hostStyle.width = `${rect.width}px`;
    hostStyle.height = `${rect.height}px`;

    const sizeChanged =
        !lastSize ||
        lastSize.width !== rect.width ||
        lastSize.height !== rect.height;

    if (
        player &&
        typeof player.resize === 'function' &&
        rect.width > 0 &&
        rect.height > 0 &&
        (force || sizeChanged)
    ) {
        try {
            player.resize(rect.width, rect.height);

            if (typeof setLastSize === 'function') {
                setLastSize({ width: rect.width, height: rect.height });
            }
        } catch (e) {
            if (typeof onResizeError === 'function') {
                onResizeError(e);
            }
        }
    }

    hostStyle.overflow = 'hidden';

    return rect;
};

export const createPlayerHost = ({
    hostId,
    playerId,
    hostParent,
    hostStyles = {},
    playerStyles = {},
    hidden = false
}) => {
    if (!hasDom()) return null;

    const existingHost = document.getElementById(hostId);
    const existingPlayer = document.getElementById(playerId);

    if (existingHost && existingPlayer) {
        return { hostElement: existingHost, playerElement: existingPlayer };
    }

    const hostElement = document.createElement('div');
    hostElement.id = hostId;

    Object.entries(hostStyles).forEach(([key, value]) => {
        hostElement.style[key] = value;
    });

    if (hidden) {
        hostElement.style.display = 'block';
        hostElement.style.visibility = 'hidden';
        hostElement.style.opacity = '0';
        hostElement.style.pointerEvents = 'none';
    }

    const playerElement = document.createElement('div');
    playerElement.id = playerId;

    Object.entries(playerStyles).forEach(([key, value]) => {
        playerElement.style[key] = value;
    });

    hostElement.appendChild(playerElement);
    (hostParent || document.body).appendChild(hostElement);

    return { hostElement, playerElement };
};
