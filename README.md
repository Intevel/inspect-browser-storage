# ⚗️ inspect-browser-storage

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]

> With this package you can locally and programmatically modify the LocalStorage and SessionStorage of a browser. This also applies to an Browser based Electron app.

⚠️ The default paths currently belong to chromium, other browsers will be added in the next versions. But you can set `dbPath` option for other databases. ⚠️

## Usage

Install package:

```sh
# npm
npm install inspect-browser-storage

# yarn
yarn install inspect-browser-storage

# pnpm
pnpm install inspect-browser-storage
```

Import:

```js
// ESM
import { writeToStorage, readFromStorage } from 'inspect-browser-storage'

// CommonJS
const { writeToStorage, readFromStorage } = require('inspect-browser-storage')
```

### `readFromStorage(domain, key, options?)`

**Example:**

```js
const data = await readFromStorage('test-application.de', 'auth_token')
// -> Returns the value of the key 'auth_token' in the localStorage of 'https://test-application.de/'
```

**Options:**

- `dbPath`: (string) The domain in the storage.
- `key`: (string) the key of the item in storage
- `options?`: (object) Options are defaults and get merged with the default options.
  - `dbPath`: (string) Path to the database, default is the chromium path on your system
  - `autoUnlink`: (boolean) If true, the package will try to unlock the database LOCK File. Default is true
  - `protocol`: (string) Which protocol should be added to the domain, can be https:// or http://. Default is https://
  - `storage`: (string) Define which storage it should use, can be `localStorage` or `sessionStorage`. Default is `localStorage`

### `writeToStorage(domain, key, value, options?)`

**Example:**

```js
const data = await writeToStorage('test-application.de', 'auth_token', 'eyDasdlok.......')
```

**Options:**

- `dbPath`: (string) The domain in the storage.
- `key`: (string) the key of the item in storage
- `value`: (string) the value which should set to the key in storage
- `options?`: (object) Options are defaults and get merged with the default options.
  - `dbPath`: (string) Path to the database, default is the chromium path on your system
  - `autoUnlink`: (boolean) If true, the package will try to unlock the database LOCK File. Default is true
  - `protocol`: (string) Which protocol should be added to the domain, can be https:// or http://. Default is https://
  - `storage`: (string) Define which storage it should use, can be `localStorage` or `sessionStorage`. Default is `localStorage`

## 💻 Development

- Clone this repository
- Install dependencies using `yarn install`
- Run watcher build `yarn dev`

## License

Made with 💚 by Conner Bachmann. <br />
The idea originally comes from [Jan Bölsche](https://github.com/regular) and his package [chrome-localstorage](https://github.com/regular/chrome-localstorage/)

Published under [MIT License](./LICENSE).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/inspect-browser-storage?style=flat-square
[npm-version-href]: https://npmjs.com/package/inspect-browser-storage

[npm-downloads-src]: https://img.shields.io/npm/dm/inspect-browser-storage?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/inspect-browser-storage

[github-actions-src]: https://img.shields.io/github/workflow/status/Intevel/inspect-browser-storage/ci/main?style=flat-square
[github-actions-href]: https://github.com/Intevel/inspect-browser-storage/actions?query=workflow%3Aci
