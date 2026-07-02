import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';
import get from '../utils/get';

const useSiteTooltip = key => {
    const globalContext = useContext(GlobalContext);
    const tooltips = get(globalContext, 'state.siteService.tooltips') ?? [];

    return tooltips.find(t => t.text === key);
};

export default useSiteTooltip;
