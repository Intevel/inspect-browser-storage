import { platform, homedir } from 'os'
import { unlinkSync } from 'fs'
import { join } from 'pathe'
import { defu } from 'defu'
import levelup from 'levelup'
import leveldown from 'leveldown'
import { InspectOptions } from './types'

export function readFromStorage (domain: string, key: string, options: InspectOptions): Promise<string> {
  const config = getOptionsWithDefaults(options)
  if (!config.dbPath) { throw new Error('no dbpath defined') }
  if (config.autoUnlink) {
    unlinkSync(config.dbPath + '/LOCK')
  }
  const db = levelup(leveldown(config.dbPath), { })
  const storageKey = Buffer.from('_' + config.protocol + domain + '\u0000\u0001' + key)

  return new Promise((resolve, reject) => {
    db.get(storageKey, (err, value) => {
      if (err) { return reject(err) }
      return resolve(value.toString().slice(1))
    })
  })
}

export function writeToStorage (domain: string, key: string, value: string, options: InspectOptions): Promise<any> {
  const config = getOptionsWithDefaults(options)
  if (!config.dbPath) { throw new Error('no dbpath defined') }
  if (config.autoUnlink) {
    unlinkSync(config.dbPath + '/LOCK')
  }
  const db = levelup(leveldown(config.dbPath), { })
  const storageKey = Buffer.from('_' + config.protocol + domain + '\u0000\u0001' + key)
  const storageValue = Buffer.from('\u0001' + value)

  return new Promise(() => {
    db.put(storageKey, storageValue)
  })
}

function getOptionsWithDefaults (options: InspectOptions): InspectOptions {
  const OptionsDefaults: InspectOptions = {
    protocol: 'https://',
    storage: 'localStorage',
    autoUnlink: true
  }
  const config = defu(options, OptionsDefaults)
  // @ts-ignore
  return defu(config, { dbPath: getPath(config.storage) })
}

function getPath (storage: string): string {
  const storageString = storage === 'localStorage' ? 'Local Storage' : 'Session Storage'
  const paths = {
    linux: `.config/chromium/Default/${storageString}/leveldb`,
    darwin: `Library/Application Support/Chromium/Default/${storageString}/leveldb`,
    win32: `/AppData/Local/Google/Chrome/User Data/Default/${storageString}/leveldb`
  }
  // @ts-expect-error indexes
  return join(homedir(), paths[platform()] || paths.linux)
}
