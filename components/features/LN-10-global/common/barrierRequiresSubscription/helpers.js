import get from '../../../../private/common/utils/get';

export const getConfigBarrierData = (isLogged, CONFIG_BARRIER) => {
    const button = get(CONFIG_BARRIER, 'button', { href: '', label: '' });
    const title = get(CONFIG_BARRIER, 'title', '');
    const unLogged = get(CONFIG_BARRIER, 'unLogged', {});
    const logged = get(CONFIG_BARRIER, 'logged', {});

    const message = isLogged ? logged : unLogged;
    return { button, title, message };
};
