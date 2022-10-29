<!-- Badges -->
[![Tests](https://github.com/DerekRoberts/action-pr-description-add/workflows/build-test/badge.svg)](https://github.com/DerekRoberts/action-pr-description-add)
[![Contributors](https://img.shields.io/github/contributors/DerekRoberts/action-pr-description-add)](/../../graphs/contributors)
[![Forks](https://img.shields.io/github/forks/DerekRoberts/action-pr-description-add)](/../../network/members)
[![Stargazers](https://img.shields.io/github/stars/DerekRoberts/action-pr-description-add)](/../../stargazers)
[![Issues](https://img.shields.io/github/issues/DerekRoberts/action-pr-description-add)](/../../issues)
[![MIT License](https://img.shields.io/github/license/DerekRoberts/action-pr-description-add.svg)](/LICENSE)
[![Lifecycle](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

# Add to Pull Request Descriptions

This action adds to Pull Request descriptions using markdown.  It checks if the message is already present before adding.

## Input

`add_markdown`: The message to add to pull requests

`github_token`: Usually ${{ secrets.GITHUB_TOKEN }}, but a personal access token can also be used

## Example

Create or modify a GitHub workflow, like below.  E.g. `./github/workflows/pr-append.yml`

```yaml
name: "Add to Pull Request Description"
on:
  pull_request: [opened]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: DerekRoberts/action-pr-description-add@v0.0.1
        with:
          add_markdown: |
            ---
            # Things!
            ## Excitement!
            [Another link!](https://gov.bc.ca)
          github_token: ${{ secrets.GITHUB_TOKEN }}

```

## Acknowledgements

This Action is provided courtesty of the Forestry Suite of Applications, part of the Government of British Columbia.
