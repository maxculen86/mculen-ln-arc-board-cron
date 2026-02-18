# Content Source Template

Use this template when creating new Fusion content sources.

## File Structure

```
content/
├── sources/
│   ├── {sourceName}Source.js          # Main source file
│   └── utils/{sourceName}Source/
│       └── _helper.js                  # Transform/helper functions
├── schemas/
│   └── {name}-schema.js                # GraphQL schema
└── filters/
    └── {name}-filter.js                # Optional filters
```

## Content Source Pattern

```javascript
// content/sources/{name}Source.js
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { resolve, transform } from './utils/{name}Source/helper';

const fetch = (query, { cachedCall } = {}) => {
    const { url = '' } = query;
    const arcSite = query['arc-site'];
    const uri = `${CONTENT_BASE}${resolve(query)}`;

    const headers = {
        'Content-Type': 'application/json'
    };

    if (ARC_ACCESS_TOKEN) {
        headers.Authorization = `Bearer ${ARC_ACCESS_TOKEN}`;
    }

    const resolveData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        try {
            const response = await global.fetch(uri, {
                method: 'GET',
                headers,
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status} - ${response.statusText}`
                );
            }

            const data = await response.json();
            return transform(data, query, cachedCall);
        } catch (error) {
            if (error.name === 'AbortError') {
                logger.push(
                    'Request timed out',
                    { source: 'content/source/{name}Source', url },
                    arcSite
                );
            } else {
                logger.push(
                    error,
                    { source: 'content/source/{name}Source', url },
                    arcSite
                );
            }
            return {}; // Return empty object on error
        } finally {
            clearTimeout(timeoutId);
        }
    };

    return Promise.resolve(resolveData());
};

export default {
    fetch,
    params: {
        id: 'text',          // Required params
        size: 'text',        // Optional params
        from: 'text',
        // Add your params here
    },
    ttl: 120                 // Cache TTL in seconds
};
```

## Schema Pattern

```javascript
// content/schemas/{name}-schema.js
const schema = `
type Item {
    _id: String
    type: String
    headlines: Headlines
    promo_items: PromoItems
    credits: Credits
}

type Headlines {
    basic: String
}

type PromoItems {
    basic: {
        type: String
        url: String
        resized_urls: [String]
    }
}

type Credit {
    type: String
    name: String
}

type Credits {
    by: [Credit]
}

type Query {
    items: [Item]
    count: Int
}
`;

export default schema;
```

## Helper Pattern

```javascript
// content/sources/utils/{name}Source/_helper.js
import { getAllImagesAuth } from '../signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import getPresets from '../presets';

export const resolve = query => {
    const { id, website } = query;
    return `/content/v4/your-endpoint/?website=${website}&_id=${id}`;
};

export const transform = async (data, query, cachedCall) => {
    const arcSite = query['arc-site'];
    const { presets, presetsDefault } = getPresets(query);

    // Filter and process items
    const items = data.basic || [];
    const filteredItems = items
        .filter(item => item.revision?.published) // Filter unpublished
        .slice(0, query.limit || 10);            // Apply limit

    // Add image auth and resized URLs
    const processedItems = await Promise.all(
        filteredItems.map(async item => {
            const withAuth = await getAllImagesAuth(item, cachedCall);
            return addResizedUrls(withAuth, {
                arcSite,
                presets,
                presetsDefault,
                isAdmin: query.isAdmin
            });
        })
    );

    return processedItems;
};
```

## Checklist

- [ ] Create source file in `content/sources/`
- [ ] Create schema in `content/schemas/`
- [ ] Create helper in `content/sources/utils/{name}Source/`
- [ ] Add error handling with logger
- [ ] Set appropriate TTL (default: 120s)
- [ ] Add timeout (5000ms recommended)
- [ ] Test with `__tests__/content/sources/`
- [ ] Document params in export default
- [ ] Handle authentication (ARC_ACCESS_TOKEN)
- [ ] Return empty object/array on error

## Common Params

```javascript
params: {
    id: 'text',              // Content ID
    'arc-site': 'text',      // Site identifier (auto-injected)
    website: 'text',         // Website identifier
    size: 'text',            // Number of items
    from: 'text',            // Pagination offset
    limit: 'text',           // Max items
    isAdmin: 'text',         // Admin flag for auth
    imageConfig: 'text'      // Image preset config
}
```

## Testing

See `openspec/specs/testing.md` for content source testing patterns.

## Usage in Component

```javascript
import Consumer from 'fusion:consumer';

const MyComponent = ({ customFields }) => {
    // Data fetched automatically by Fusion
};

MyComponent.propTypes = {
    customFields: PropTypes.shape({
        contentConfig: PropTypes.contentConfig('your-source').tag({
            name: 'My Source',
            group: 'Content'
        })
    })
};

export default Consumer(MyComponent);
```
