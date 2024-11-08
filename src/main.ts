import {promises as fs} from 'fs'
import * as core from '@actions/core'
import * as github from '@actions/github'
import {Mwn} from 'mwn'
import loadBotConfig from './config'
import {stringFormatUnicorn} from './utils'

async function run(): Promise<void> {
  try {
    core.debug('Logging in...')
    const bot = await Mwn.init(loadBotConfig())
    core.debug('Logged in.')

    const title = core.getInput('pagename')
    const content = await fs.readFile(core.getInput('filepath'), {
      encoding: 'utf-8'
    })

    if (title === '' || content === '') {
      throw new Error('title or content is not provided.')
    }

    const summary = stringFormatUnicorn(core.getInput('summary'), {
      title,
      commit: github.context.sha
    })

    core.debug('Save page...')
    const resp = await bot.save(title, content, summary)

    core.info(`Updated ${resp.title} as ${resp.result}. (${resp.newtimestamp})`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
