import { validateCarruselChildren } from '../../../../../../../chains/utils/validateCarruselChildren';
import isTodayEnabled from '../../../../../../../chains/utils/isTodayEnabled';

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

class GetCajaCarrusel {
    constructor(props, config) {
        this.props = props;
        this.config = config;
    }

    get childProps() {
        const { id, renderables } = this.props;
        const chain = renderables.find(({ props }) => props.id === id);
        return chain?.children.map(({ props }) => props) ?? [];
    }

    validate() {
        const { layout, customFields } = this.props;
        const {
            hideCarousel = false,
            enabledDays = [],
            shouldSchedule = false
        } = customFields;

        const isHome = layout === LAYOUT;

        if (hideCarousel) return true;

        const children = this.props.children.filter(Boolean);

        const error = validateCarruselChildren({
            children,
            childProps: this.childProps,
            allowedChildren: this.config.allowedChildren,
            isHorizontal: this.config.isHorizontal
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
            return true;
        }

        return false;
    }

    renderResponse() {
        const { title, link, logoId, buttonLogo } = this.props.customFields;
        const children = this.props.children.filter(Boolean);

        return {
            information: {
                title,
                link,
                logoId,
                buttonLogo,
                ...(this.config.isHorizontal && { isHorizontal: true })
            },
            videos: children.slice(0, 10)
        };
    }

    render() {
        try {
            if (this.validate()) {
                return null;
            }
            return this.renderResponse();
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default GetCajaCarrusel;
