import { cache } from "react";

const revalidate = 60;
const MINUTES_5 = 60 * 5;
const HOURS_1 = 60 * 60;
const HOURS_12 = 60 * 60 * 12;

// TODO : Implement option to switch between info for authenticated user and other users.
export async function getUser(username: string) {
  console.log("Fetching user data for", username);
  console.time("getUser");
  const res = await fetch("https://api.github.com/users/" + username, {
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    next: { revalidate: revalidate },
  });
  console.timeEnd("getUser");
  return res.json();
}

export async function getRepos(username: string) {
  console.log("Fetching repos for", username);
  console.time("getRepos");
  const res = await fetch(
    "https://api.github.com/users/" + username + "/repos",
    {
      headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
      next: { revalidate: revalidate },
    }
  );
  console.timeEnd("getRepos");
  return res.json();
}

export async function getSocialAccounts(username: string) {
  console.log("Fetching social accounts for", username);
  console.time("getSocialAccounts");
  const res = await fetch(
    "https://api.github.com/users/" + username + "/social_accounts",
    {
      headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
      next: { revalidate: MINUTES_5 },
    }
  );
  console.timeEnd("getSocialAccounts");
  return res.json();
}

export const getPinnedRepos = cache(async (username: string) => {
  console.log("Fetching pinned repos for", username);
  console.time("getPinnedRepos");
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    body: JSON.stringify({
      query: `{user(login: "${username}") {pinnedItems(first: 6, types: REPOSITORY) {nodes {... on Repository {name}}}}}`,
    }),
  });
  const pinned = await res.json();
  console.timeEnd("getPinnedRepos");
  const names = pinned.data.user.pinnedItems.nodes.map(
    (node: any) => node.name
  );
  return names;
});

export const getUserOrganizations = async (username: string) => {
  console.log("Fetching organizations for", username);
  console.time("getUserOrganizations");
  const res = await fetch("https://api.github.com/graphql", {
    next: { revalidate: MINUTES_5 },
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    body: JSON.stringify({
      query: `{user(login: "${username}") {organizations(first: 6) {nodes {name,websiteUrl,url,avatarUrl,description}}}}`,
    }),
  });
  console.timeEnd("getUserOrganizations");
  return res.json();
};

export const getVercelProjects = async () => {
  if (!process.env.VC_TOKEN) {
    console.log("No Vercel token found - no projects will be shown.");
    return { projects: [] };
  }
  console.log("Fetching Vercel projects");
  console.time("getVercelProjects");
  const res = await fetch("https://api.vercel.com/v9/projects", {
    headers: { Authorization: `Bearer ${process.env.VC_TOKEN}` },
  });
  console.timeEnd("getVercelProjects");
  // eg. expired token.
  if (!res.ok) {
    console.error("Vercel API returned an error.", res.status, res.statusText);
    return { projects: [] };
  }
  return res.json();
};

/** Cache revalidated every 12 hours. */
export const getNextjsLatestRelease = cache(async () => {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    body: JSON.stringify({
      query: `{
				repository(name: "next.js", owner: "vercel") {
					latestRelease {
						tagName
						updatedAt
					}
				}
			}`,
    }),
    next: { revalidate: HOURS_12 },
  });
  if (!res.ok) {
    console.error("GitHub API returned an error.", res.status, res.statusText);
    return {};
  }
  const nextjsLatest = await res.json();

  const result = {
    tagName: nextjsLatest.data.repository.latestRelease.tagName.replace(
      "v",
      ""
    ),
    updatedAt: nextjsLatest.data.repository.latestRelease.updatedAt,
  };
  return result;
});

export const getRepositoryPackageJson = cache(
  async (username: string, reponame: string) => {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
      body: JSON.stringify({
        query: `{
				repository(name: "${reponame}", owner: "${username}") {
					object(expression: "HEAD:package.json") {
						... on Blob {
							text
						}
					}
				}
			}`,
      }),
      next: { revalidate: HOURS_12 },
    });
    const response = await res.json();
    try {
      const packageJson = JSON.parse(response.data.repository.object.text);
      return packageJson;
    } catch (error) {
      console.error("Error parsing package.json", error);
      return {};
    }
  }
);

export const getRecentUserActivity = cache(async (username: string) => {
  console.log("Fetching recent activity for", username);
  console.time("getRecentUserActivity");
  const res = await fetch(
    "https://api.github.com/users/" + username + "/events",
    {
      headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
      next: { revalidate: HOURS_12 },
    }
  );
  const response = await res.json();
  console.timeEnd("getRecentUserActivity");
  return response;
});

export const getTrafficPageViews = async (
  username: string,
  reponame: string
) => {
  const res = await fetch(
    "https://api.github.com/repos/" +
      username +
      "/" +
      reponame +
      "/traffic/views",
    {
      headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
      next: { revalidate: HOURS_1 },
    }
  );
  const response = await res.json();

  const sumUniques = response.uniques || 0;

  // Today date in format YYYY-MM-DD.
  const today = new Date().toISOString().slice(0, 10);
  // Last day with at least one view.
  const todayUniques =
    response.views?.find((day: any) => day.timestamp.startsWith(today))
      ?.uniques || 0;

  return { sumUniques, todayUniques };
};

export const getDependabotAlerts = cache(
  async (username: string, reponame: string) => {
    const res = await fetch(
      "https://api.github.com/repos/" +
        username +
        "/" +
        reponame +
        "/dependabot/alerts",
      {
        headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
        next: { revalidate: HOURS_12 },
      }
    );

    const response = await res.json();

    // Id dependabot is not enabled, the response will be an object, not an array.
    if (response.length === undefined) {
      return [];
    }
    const openAlertsBySeverity = response.reduce((acc: any, alert: any) => {
      if (alert.state === "open") {
        acc[alert.security_advisory.severity] = acc[
          alert.security_advisory.severity
        ]
          ? acc[alert.security_advisory.severity] + 1
          : 1;
      }
      return acc;
    }, {});

    return openAlertsBySeverity;
  }
);

/**
 * Determines if a repository is using Next.js App Router or legacy pages/_app.jsx. Or both.
 * @param {*} repoOwner GitHub username
 * @param {string} repoName repository name
 * @returns Object with two booleans: isRouterPages and isRouterApp
 */
export async function checkAppJsxTsxExistence(
  repoOwner: string,
  repoName: string
) {
  const urlPagesAppJSX = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/pages/_app.jsx`;
  // TODO : Add more possible ways to check for App Router.
  const urlAppLayoutJSX = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/app/layout.jsx`;

  const urlPagesAppTSX = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/pages/_app.tsx`;
  const urlAppLayoutTSX = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/app/layout.tsx`;

  const res = {
    isRouterPagesJSX: false,
    isRouterAppJSX: false,
    isRouterPagesTSX: false,
    isRouterAppTSX: false,
  };

  try {
    const [isPagesResJSX, isAppLayoutResJSX, isPagesResTSX, isAppLayoutResTSX] =
      await Promise.all([
        fetch(urlPagesAppJSX, {
          headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
          next: { revalidate: HOURS_12 },
        }),
        fetch(urlAppLayoutJSX, {
          headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
          next: { revalidate: HOURS_12 },
        }),
        fetch(urlPagesAppTSX, {
          headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
          next: { revalidate: HOURS_12 },
        }),
        fetch(urlAppLayoutTSX, {
          headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
          next: { revalidate: HOURS_12 },
        }),
      ]);

    if (isPagesResJSX.status === 200) {
      res.isRouterPagesJSX = true;
    }

    if (isAppLayoutResJSX.status === 200) {
      res.isRouterAppJSX = true;
    }

    if (isPagesResTSX.status === 200) {
      res.isRouterPagesJSX = true;
    }

    if (isAppLayoutResTSX.status === 200) {
      res.isRouterAppJSX = true;
    }
  } catch (error: any) {
    console.error(
      `Error checking _app.jsx(tsx) existence in ${repoName}: ${error.message}`
    );
  }
  return res;
}

