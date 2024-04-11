import useSiteServices from '../../../features/LN-10-global/hooks/useSiteServices';

const useTermica = (key, value) => {
    const { termicas } = useSiteServices() || [];

    const element = termicas.find(ter => ter.key === key) || { value: 'true' };
    const result = element.value && element.value.toString() === 'true';

    if (!key || !result) return undefined;
    if (!value) return result;

    return value;
};

export default useTermica;
