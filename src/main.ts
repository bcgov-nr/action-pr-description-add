import {getInput, info} from '@actions/core'
import {getOctokit} from '@actions/github'

// Action input
const append = getInput('append')
const owner = getInput('owner')
const pr_no = getInput('pr_no')
const repo = getInput('repo')
const token = getInput('token')

// Validate input
if (!append || !owner || !pr_no || !repo || !token) {
  throw new Error('Error: incomplete input!')
}

// Authenticate
const octokit = getOctokit(token)

// Main function
async function run(): Promise<void> {
  const res = await octokit.request(
    `GET /repos/${owner}/${repo}/pulls/${pr_no}`
  )
  info(`append: ${append}`)
  info(`description: ${JSON.stringify(res.data.body)}`)
}

// Run main function
run()
