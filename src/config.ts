import * as core from '@actions/core'
import {BotOptions} from 'nodemw/lib/types'

export default function loadBotConfig(): BotOptions {
  const url: string = core.getInput('mediawiki_api_url')
  const useragent = core.getInput('useragent')
  let {protocol, port, host, pathname} = new URL(url)

  if (pathname.includes('/api.php')) {
    const path = pathname.split('/api.php')[0]
    pathname = path === '' ? '/' : path
  }

  return {
    protocol,
    server: host,
    port: parseInt(port, 10),
    path: pathname,
    userAgent: useragent === '' ? undefined : useragent,
    debug: core.isDebug()
  }
}
