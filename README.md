# react-cache-kit

> Lightweight and flexible caching utility for React apps.  
> Supports memory, localStorage, sessionStorage drivers, TTL expiration, and `remember` callbacks out of the box.

---

## Features

- ✅ Easy `get`, `set`, `delete`, `clear` methods
- ✅ `remember` function (Laravel-style caching)
- ✅ TTL (Time-To-Live) expiration support
- ✅ Multiple drivers: Memory, localStorage, sessionStorage
- ✅ Zero dependencies, super lightweight
- ✅ TypeScript support out of the box

---

## Installation

```bash
npm install react-cache-kit
```

or

```bash
yarn add react-cache-kit
```

---

## Usage

### Basic Example

```typescript
import Cache from 'react-cache-kit';
import { LocalStorageDriver } from 'react-cache-kit';

// Initialize with a driver (optional)
const cache = new Cache(new LocalStorageDriver());

// Set value with TTL (in seconds)
await cache.set('user', { id: 1, name: 'Rustem' }, 3600);

// Get cached value
const user = await cache.get('user');

// Delete key
await cache.delete('user');

// Clear all cache
await cache.clear();
```

---

### Using `remember`

```typescript
const product = await cache.remember('product_123', 600, async () => {
  const res = await fetch('/api/products/123');
  return await res.json();
});
```

If the `product_123` key is not found or expired, it will call the callback, cache the result, and return it.

---

## Drivers

- **MemoryDriver** (default) — in-memory storage
- **LocalStorageDriver** — browser localStorage
- **SessionStorageDriver** — browser sessionStorage

You can create your own driver by implementing `get`, `set`, `delete`, and `clear` methods!

---

## API Reference

| Method        | Description                                         |
| ------------- | --------------------------------------------------- |
| `get(key)`    | Get a value by key                                   |
| `set(key, value, ttl?)` | Set a value with optional TTL (seconds)      |
| `delete(key)` | Delete a key                                         |
| `clear()`     | Clear all cache                                      |
| `remember(key, ttl, callback)` | Get a value or cache a callback result |

---

## License

[MIT](./LICENSE) © [Rustem Kaimolla](https://github.com/rustem-kaimolla)

---

