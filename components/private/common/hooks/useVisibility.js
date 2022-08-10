const useVisibility = props => {
    const hasTruthly = Object.values(props).every(Boolean);
    return hasTruthly ? 'visible' : 'hidden';
};
export default useVisibility;
