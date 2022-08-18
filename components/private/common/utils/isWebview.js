const isWebview = agent =>
    (agent.includes('wv') ||
        /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(agent)) &&
    true;

export default isWebview;
