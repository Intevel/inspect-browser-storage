import { expect, it, describe } from 'vitest'
import { readFromStorage, writeToStorage } from '../src'

describe('inspect-browser-storage', () => {
  it('functions should be defined', () => {
    expect(readFromStorage).toBeDefined()
    expect(writeToStorage).toBeDefined()
  })
})
