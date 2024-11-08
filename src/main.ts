import {promises as fs} from 'fs'
import {debug, getInput, info, setFailed} from '@actions/core'
import {context} from '@actions/github'
import {Mwn} from 'mwn'
import loadBotConfig from './config'
import {stringFormatUnicorn} from './utils'

async function run(): Promise<void> {
  try {
    debug('Logging in...')
    const bot = await Mwn.init(loadBotConfig())
    debug('Logged in.')

    const title = getInput('pagename')
    const content = await fs.readFile(getInput('filepath'), {
      encoding: 'utf-8'
    })

    if (title === '' || content === '') {
      throw new Error('title or content is not provided.')
    }

    const summary = stringFormatUnicorn(getInput('summary'), {
      title,
      commit: context.sha
    })

    debug('Save page...')
    const resp = await bot.save(title, content, summary)

    info(`Updated ${resp.title} as ${resp.result}. (${resp.newtimestamp})`)
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
