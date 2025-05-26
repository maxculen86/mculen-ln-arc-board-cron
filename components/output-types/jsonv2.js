const jsonV2 = ({ children }) => children;

jsonV2.contentType = 'application/json';
jsonV2.fallback = ['json', 'default'];

export default jsonV2;
