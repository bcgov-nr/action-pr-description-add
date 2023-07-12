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

  // Exit/return if our markdown message is already present
  let body = pullRequest.body || ''
  if (body.includes(markdown)) {
    info('Markdown message is already present.  Exiting.')
    return
  }

  // There have been issues with duplication, so remove those
  body = body.split(markdown)[0]

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
