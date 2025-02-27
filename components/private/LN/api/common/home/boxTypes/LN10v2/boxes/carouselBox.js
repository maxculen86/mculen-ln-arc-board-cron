const mapVideo = ({ jwVideoId: id, badge, badgeStyle, _id, ...rest }) => ({
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
