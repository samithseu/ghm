import type { H3Event } from "h3";
import type { FetchError } from "ofetch";

interface GitHubUser {
  login: string;
  id: number;
  name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
export type User = Omit<GitHubUser, "login"> & {
  email: string;
  username: GitHubUser["login"];
};

const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);
    const rawUsername = getRouterParam(event as H3Event, "username");
    const username = rawUsername?.trim();

    if (!username || !GITHUB_USERNAME_REGEX.test(username)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid GitHub username format",
      });
    }

    try {
      const userAgent =
        getRequestHeader(event, "User-Agent") || "GHM-GitHub-Mail-Fetcher";

      const headers: Record<string, string> = {
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
        "User-Agent": userAgent,
      };

      if (config.github?.token) {
        headers.Authorization = `Bearer ${config.github.token}`;
      }

      const res = await $fetch<GitHubUser>(
        `https://api.github.com/users/${encodeURIComponent(username)}`,
        { headers },
      );

      setHeader(
        event,
        "Cache-Control",
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      );

      return {
        id: res.id,
        username: res.login,
        name: res.name,
        email: `${res.id}+${res.login}@users.noreply.github.com`,
        avatar_url: res.avatar_url,
        created_at: res.created_at,
        updated_at: res.updated_at,
      } satisfies User;
    } catch (error: any) {
      const statusCode = error.statusCode || error.status || 500;
      throw createError({
        statusCode,
        statusMessage:
          statusCode === 404
            ? "User Not Found"
            : error.statusMessage || "Internal Server Error",
        message:
          statusCode === 404
            ? `GitHub user '${username}' was not found`
            : error.message || "Internal Server Error",
      });
    }
  },
  {
    maxAge: 60 * 60, // 1 hour
    swr: true,
    getKey: (event) => {
      const username =
        getRouterParam(event, "username", { decode: true }) ?? "";
      return username.toLowerCase().trim();
    },
  },
);
