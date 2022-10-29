/* eslint-disable no-console */
import * as core from '@actions/core'

async function run(): Promise<void> {
  const body: string = core.getInput('body')
  const token: string = core.getInput('token')
  if (!body || !token) {
    throw new Error('Error: incomplete input!')
  }
  console.log('token is present')
  console.log('body: ${body}')
}

run()
