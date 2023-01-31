import * as core from '@actions/core'
import {MwnOptions} from 'mwn'

export default function loadBotConfig(): MwnOptions {
  const apiUrl: string = core.getInput('mediawiki_api_url')
  const useragent = core.getInput('useragent')

  const username = core.getInput('username')
  const password = core.getInput('password')

  return {
    apiUrl,
    userAgent: emptyToUndefined(useragent),
    silent: !core.isDebug(),

    username: emptyToUndefined(username),
    password: emptyToUndefined(password)
  }
}

function emptyToUndefined(str: string) {
  return str === '' ? undefined : str
}
