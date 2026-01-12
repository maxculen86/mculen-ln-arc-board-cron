import Consumer from 'fusion:consumer';
import isTodayEnabled from '../utils/isTodayEnabled';
import { validateCarruselChildren } from '../utils/validateCarruselChildren';

const LAYOUT = 'LN10-Home_Main';
const shouldSkipRender = ({
    hideCarousel = false,
    enabledDays = [],
    isHome = false,
    shouldSchedule
}) => {
    if (!shouldSchedule) {
        return hideCarousel;
    }
    return (
        hideCarousel ||
        (isHome && (enabledDays.length === 0 || !isTodayEnabled(enabledDays)))
    );
};

class CarouselChain {
    constructor(props) {
        this.props = props;
    }

    render() {
        const { layout, customFields } = this.props;
        const {
            hideCarousel = false,
            enabledDays = [],
            shouldSchedule = false
        } = customFields;
        const isHome = layout === LAYOUT;
        if (hideCarousel) {
            return null;
        }
        const children = this.props.children.filter(child => child !== null);
        const allowedChildren = [
            'LN-10/itemCarrusel',
            'LN-common/bannerRefactor'
        ];
        const error = validateCarruselChildren({
            children,
            childProps: this.childProps,
            allowedChildren
        });
        if (
            error ||
            shouldSkipRender({
                hideCarousel,
                enabledDays,
                isHome,
                shouldSchedule
            })
        ) {
            return null;
        }
        const { title, link, logoId, buttonLogo } = this.props.customFields;
        return {
            information: { title, link, logoId, buttonLogo },
            videos: children.slice(0, 10)
        };
    }

    get childProps() {
        const { id, renderables } = this.props;
        const chain = renderables.find(({ props }) => props.id === id);
        return chain?.children.map(({ props }) => props) ?? [];
    }
}

export default Consumer(CarouselChain);
