// `query` es el eco crudo del usuario: solo como red para que Queryly nunca quede sin término
const KEYWORDS_LIMIT = 2;

const fromKeywords = keywords =>
    Array.isArray(keywords)
        ? keywords
              .filter(keyword => typeof keyword === 'string' && keyword.trim())
              .slice(0, KEYWORDS_LIMIT)
              .map(keyword => keyword.trim())
              .join(' / ')
        : '';

const getMessageTerm = message =>
    fromKeywords(message?.keywords) || message?.query?.trim() || '';

export const getSearchTerm = (messages = []) =>
    messages
        .filter(message => message?.message_type === 'input')
        .map(message => getMessageTerm(message.data?.message))
        .findLast(Boolean) ?? '';
