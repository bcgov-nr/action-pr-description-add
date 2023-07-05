import {error, getInput, info} from '@actions/core'
import {context, getOctokit} from '@actions/github'

// Action input
const markdown = getInput('add_markdown')
const token = getInput('github_token')
if (!markdown || !token) {
  error('Error: please verify input!')
}

// Main function
async function action(): Promise<void> {
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
  // if (body.includes(markdown)) {
  //   info('Markdown message is already present')
  //   return
  // }

  // If we're here update the body
  info('Description is being updated')
  octokit.rest.pulls.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.number,
    body: body.concat(`\n\n${markdown}`)
  })
}

// Run main function
action()
