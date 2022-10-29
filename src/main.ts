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

  // API path built from context, current PR description
  const apiPath = `/repos/${context.repo.owner}/${context.repo.repo}/pulls/${context.payload.number}`
  const description = (await octokit.request(`GET ${apiPath}`)).data.body || ''

  // Check the description for our markdown message
  if (description.includes(markdown)) {
    info('Markdown message is already present')
    return
  }

  // Append markdown and update/patch description
  info('Description is being updated')
  await octokit.request(`PATCH ${apiPath}`, {
    body: description.concat(`\n${markdown}`)
  })
}

// Run main function
action()
