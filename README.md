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

`add_markdown`: The message to add to pull requests

`github_token`: Usually ${{ secrets.GITHUB_TOKEN }}, but a personal access token can also be used

`limit_to_pr_opened`: Only run when PR status opened or reopened (default=false)

## Permissions

Pull requests from forks have reduced job running rights.  Provide your GITHUB_TOKEN with explicit permissions to change that.  Read more [here](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token).

```
    permissions:
      pull-requests: write
```


## Example

Create or modify a GitHub workflow, like below.  E.g. `./github/workflows/pr-append.yml`

```yaml
name: "Add to Pull Request Description"
on:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: bcgov-nr/action-pr-description-add@v0.0.2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          add_markdown: |
            ---

            # Things!
            ## Excitement!
            [Links!](https://google.ca)
            `Code!`
```

<!-- ## Acknowledgements

This Action is provided courtesty of the Forestry Suite of Applications, part of the Government of British Columbia. -->
