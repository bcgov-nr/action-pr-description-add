<!-- Badges -->
[![Build-Test](https://github.com/bcgov-nr/action-pr-description-add/actions/workflows/test.yml/badge.svg)](https://github.com/bcgov-nr/action-pr-description-add/actions/workflows/test.yml)
[![Check dist/](https://github.com/bcgov-nr/action-pr-description-add/actions/workflows/check-dist.yml/badge.svg)](https://github.com/bcgov-nr/action-pr-description-add/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/bcgov-nr/action-pr-description-add/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/bcgov-nr/action-pr-description-add/actions/workflows/codeql-analysis.yml)
[![Contributors](https://img.shields.io/github/contributors/bcgov-nr/action-pr-description-add)](/../../graphs/contributors)
[![Forks](https://img.shields.io/github/forks/bcgov-nr/action-pr-description-add)](/../../network/members)
[![Stargazers](https://img.shields.io/github/stars/bcgov-nr/action-pr-description-add)](/../../stargazers)
[![Issues](https://img.shields.io/github/issues/bcgov-nr/action-pr-description-add)](/../../issues)
[![MIT License](https://img.shields.io/github/license/bcgov-nr/action-pr-description-add.svg)](/LICENSE)
[![Lifecycle](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

# Add to Pull Request Descriptions

This action adds to Pull Request descriptions using markdown.  It checks if the message is already present before adding.

## Input

#### Required

`add_markdown`: The message to add to pull requests, in markdown.

#### Optional

`github_token`: ${{ secrets.GITHUB_TOKEN }} or a Personal Access Token (PAT).  Default is to inherit a token from the calling workflow.

`limit_to_pr_opened`: Only take action when PR status is opened or reopened.  Default = false.

## Permissions

#### Explicit rights
Repositories can have different permissions for their tokens.  It can't hurt to explicitly provide rights.  Read more [here](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token).

```
    permissions:
      pull-requests: write
```

#### Forks
Forks receive purposefully limited rights, preventing this action from running successfully.  It is recommended to skip this job with a condition.
```
    if: "!github.event.pull_request.head.repo.fork"
```

## Example #1, minimal

Create or modify a GitHub workflow, like below.  E.g. `./github/workflows/pr-append.yml`

```yaml
name: "Add to Pull Request Description"
on:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: bcgov-nr/action-pr-description-add@main
        with:
          add_markdown: |
            ---

            # Things!
            ## Excitement!
            [Links!](https://google.ca)
            `Code!`
```

## Example #2, advanced


```yaml
name: "Add to Pull Request Description"
on:
  pull_request:

jobs:
  test:
    name: PR Greeting
    permissions:
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - uses: bcgov-nr/action-pr-description-add@main
        with:
          github_token: "${{ secrets.GITHUB_TOKEN }}"
          limit_to_pr_opened: "true"
          add_markdown: |
            ---

            # Things!
            ## Excitement!
            [Links!](https://google.ca)
            `Code!`
```

<!-- ## Acknowledgements

This Action is provided courtesty of Forestry Digital Services and Natural Resources Architecture, part of the Government of British Columbia. -->
