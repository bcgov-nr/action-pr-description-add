import {error, getInput, info} from '@actions/core'
import {context, getOctokit} from '@actions/github'

// Action input
const markdown = getInput('add_markdown')
const token = getInput('github_token')
const limit_to_pr_opened = getInput('limit_to_pr_opened')

if (!markdown || !token || !limit_to_pr_opened) {
  error('Error: please verify input!')
}

// Main function
async function action(): Promise<void> {
  // If limit_to_pr_opened is true, then verify status (opened, reopened)
  const trigger = JSON.stringify(context.payload.action) || ''
  const statuses = ['opened', 'reopened']
  if (limit_to_pr_opened === 'true' && statuses.includes(trigger)) {
    info('PR not opened or reopened with limit_to_pr_opened=true.  Exiting.')
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

  // if our markdown message tag is already present, remove it
  let body = pullRequest.body || ''
  if (body.includes('<!-- pr-description-bot -->')) {
    info('Markdown message is already present.')
    body = body.split('<!-- pr-description-bot -->')[0]
  }

  // If we're here update the body
  info('Description is being updated.')
  await octokit.rest.pulls.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.number,
    body: body.concat(`\n<!-- pr-description-bot -->\n${markdown}`)
  })
}

// Run main function
action()
