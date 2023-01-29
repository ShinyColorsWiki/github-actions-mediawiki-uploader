import * as core from '@actions/core'
import * as github from '@actions/github'
import Bot from 'nodemw'
import loadBotConfig from './config'
import {promises as fs} from 'fs'

async function run(): Promise<void> {
  try {
    const client = new Bot(loadBotConfig())

    core.debug('Logging in...')
    const username = core.getInput('username')
    const password = core.getInput('password')

    if (username === '' || password === '') {
      throw new Error('Username or password is not provided.')
    }

    client.logIn(username, password, async err => {
      if (err instanceof Error) {
        throw new Error(err.message)
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
            throw new Error(err.message)
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
