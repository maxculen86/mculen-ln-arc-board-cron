export const setDropdownData = root =>
    root &&
    root.map(({ childs }) =>
        childs.map(({ name, url, childs: children, site }) => {
            const list = (children && setDropdownData(children).flat()) || [];

            return {
                name,
                href: (site && site.site_url) || url,
                title: name,
                ...(list.length && { list })
            };
        })
    );

export function toggleScroll(isActive) {
    if (typeof window !== 'undefined') {
        window.document.body.classList.toggle('overflow-hidden', isActive);
    }
}
