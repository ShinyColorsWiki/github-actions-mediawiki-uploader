import * as core from '@actions/core'
import * as github from '@actions/github'
import { mwn } from 'mwn'
import loadBotConfig from './config'
import {promises as fs} from 'fs'

async function run(): Promise<void> {
  try {
    core.debug('Logging in...')
    const bot = await mwn.init(loadBotConfig())
    core.debug('Logged in.')

    const title = core.getInput('pagename')
    const content = await fs.readFile(core.getInput('filepath'), {
      encoding: 'utf-8'
    })

    if (title === '' || content === '') {
      throw new Error('title or content is not provided.')
    }

    const commit = github.context.sha
    const summary = `Editing wiki page by action with ${commit}`

    core.debug("Save page...")
    const resp = await bot.save(title, content, summary)
    core.info(`Updated ${resp.title} as ${resp.result}. (${resp.newtimestamp})`)

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
