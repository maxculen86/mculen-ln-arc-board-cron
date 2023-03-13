export const setDropdownData = root =>
    root &&
    root.map(({ childs }) =>
        childs.map(({ name, url, childs: children }) => {
            const list = (children && setDropdownData(children).flat()) || [];

            return {
                name,
                href: url,
                title: name,
                ...(list.length && { list })
            };
        })
    );

export function toggleScroll(isActive) {
    document.body.style.overflowY = isActive ? 'hidden' : 'auto';
}
