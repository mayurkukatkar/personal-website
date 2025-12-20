"use server"

export async function fetchGithubRepos(username: string) {
    if (!username) {
        return { error: "Username is required" }
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                // Add authorization if you have a token in env, otherwise anonymous is fine for public repos (rate limited)
                // Authorization: `token ${process.env.GITHUB_TOKEN}`, 
            },
            next: { revalidate: 60 } // Cache for 1 minute
        })

        if (!response.ok) {
            if (response.status === 404) {
                return { error: "User not found" }
            }
            return { error: "Failed to fetch repositories" }
        }

        const repos = await response.json()

        // Filter out forks if desired, or keep them. keeping them for now.
        return {
            repos: repos.map((repo: any) => ({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url,
                homepage: repo.homepage,
                topics: repo.topics, // Array of strings
                owner: repo.owner.login,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language,
                updated_at: repo.updated_at
            }))
        }

    } catch (error) {
        console.error("GitHub fetch error:", error)
        return { error: "Failed to connect to GitHub" }
    }
}
