import {error, getInput, info} from '@actions/core'
import {context, getOctokit} from '@actions/github'

// Action input
const markdown = getInput('add_markdown')
const token = getInput('github_token')
const opened_only = getInput('opened_only')

if (!markdown || !token || !opened_only) {
  error('Error: please verify input!')
}

// Main function
async function action(): Promise<void> {
  // If opened_only is true, then verify status (opened, reopened)
  const trigger = JSON.stringify(context.payload.action) || ''
  const statuses = ['opened', 'reopened']
  if (opened_only === 'true' && statuses.includes(trigger)) {
    info('PR not opened or reopened with opened_only=true.  Exiting.')
    return
  }

  // Authenticate Octokit client
  const octokit = getOctokit(token)

  // Get pull request using the GitHub context
  const {data: pullRequest} = await octokit.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.number
  })

  // Exit/return if our markdown message is already present
  const body = pullRequest.body || ''
  if (body.includes(markdown)) {
    info('Markdown message is already present.  Exiting.')
    return
  }

  // If we're here update the body
  info('Description is being updated.')
  await octokit.rest.pulls.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.number,
    body: body.concat(`\n\n${markdown}`)
  })
}

// Run main function
action()
