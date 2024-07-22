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

  // Get PR body from GitHub context (previously using octokit)
  const body = context.payload.pull_request?.body || ''

  // Note: Any of these checks can work
  //   body.includes(markdown)
  //   body.endsWith(markdown)
  //   body.match(new RegExp(markdown))
  //   !~body.indexOf(markdown)
  //   !~body.search(markdown)

  // If message is already present, then return/exit
  if (body.endsWith(markdown)) {
    info('Markdown message is already present.  Exiting.')
    return
  }

  // If not present, then append
  const octokit = getOctokit(token)
  if (!body.endsWith(markdown)) {
    info('Description is being updated.')
    await octokit.rest.pulls.update({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.number,
      // Split out any duplicate messages, has been an issue
      body: body.split(markdown)[0].concat(`\n\n${markdown}`)
    })
    return
  }

  // If here, kick up an error
  error('Unexpected result.  Please verify the action has performed correctly.')
}

// Run main function
action()
