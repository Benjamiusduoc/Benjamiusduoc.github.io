export const GITHUB_USER = 'benjamiusduoc'
export const PROFILE_URL = `https://github.com/${GITHUB_USER}`
export const AVATAR_URL = `https://github.com/${GITHUB_USER}.png`
export const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`

export function prepareRepos(repos = []) {
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
}

export function getLanguages(repos = []) {
  const set = new Set()
  for (const r of repos) {
    if (r.language) set.add(r.language)
  }
  return [...set].sort()
}
