const msg =
  'This Action has moved to bcgov/actions/pr-description-add. ' +
  'Please update your workflow to use bcgov/actions/pr-description-add instead. ' +
  'See: https://github.com/bcgov/actions/tree/main/pr-description-add'

// Use GitHub Actions workflow command directly (no dependency on @actions/core)
process.stdout.write(`::warning::${msg}\n`)
