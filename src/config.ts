import {getInput, isDebug} from '@actions/core'
import {MwnOptions} from 'mwn'

export default function loadBotConfig(): MwnOptions {
  const apiUrl: string = getInput('mediawiki_api_url')
  const useragent = getInput('useragent')

  const username = getInput('username')
  const password = getInput('password')

  return {
    apiUrl,
    userAgent: emptyToUndefined(useragent),
    silent: !isDebug(),

    username: emptyToUndefined(username),
    password: emptyToUndefined(password)
  }
}

function emptyToUndefined(str: string) {
  return str === '' ? undefined : str
}
