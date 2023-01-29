import * as core from '@actions/core'
import * as github from '@actions/github'
import Bot from 'nodemw'
import loadBotConfig from './config'
import {promises as fs} from 'fs'

async function run(): Promise<void> {
  try {
    const client = new Bot(loadBotConfig())

    // Since username, password fields are missing on definition
    // Just set with Bot.setConfig.
    ;['username', 'password'].forEach(key => {
      const value = core.getInput(key)
      client.setConfig(key, value)
    })

    core.debug('Logging in...')
    client.logIn(async err => {
      if (err instanceof Error) {
        throw err
      }

      core.debug('Logged in.')

      const title = core.getInput('pagename')
      const content = await fs.readFile(core.getInput('filepath'), {
        encoding: 'utf-8'
      })
      const commit = github.context.sha

      core.debug('Editing..')
      client.edit(
        title,
        content,
        `Editing wiki page by action with ${commit}`,
        (err, args) => {
          if (err instanceof Error) {
            throw err
          }

          if (args === undefined) {
            throw new Error('Unknown error occured.')
          }

          core.info(
            `Updated ${args.title} as ${args.result}. (${args.newtimestamp})`
          )
        }
      )
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
