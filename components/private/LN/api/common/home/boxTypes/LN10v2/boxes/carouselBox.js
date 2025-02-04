const mapVideo = ({ _id: id, badge, badgeStyle, ...rest }) => ({
    id,
    ...(badge && { badge: badge.toUpperCase() }),
    ...(badge && { badgeStyle }),
    ...rest
});
const carouselBox = ({ videos }, info) => ({
    ...info,
    videos: videos.map(mapVideo)
});

export default carouselBox;
