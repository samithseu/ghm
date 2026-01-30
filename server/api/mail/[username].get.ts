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

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);
    const username = getRouterParam(event as H3Event, "username");
    if (!username || !username.match(/^[\w\-\d]+$/))
      throw createError({ message: "username is required" });

    try {
      const res = await $fetch<GitHubUser>(
        `https://api.github.com/users/${encodeURIComponent(username)}`,
        {
          headers: {
            Authorization: `Bearer ${config.github.token}`,
            "X-GitHub-Api-Version": "2022-11-28",
            Accept: "application/vnd.github+json",
          },
        },
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
    } catch (error: FetchError | any) {
      throw createError({
        statusCode: error.status ?? 500,
        statusMessage: error.statusMessage ?? "Internal Server Error",
        message: error.message ?? "Internal Server Error",
      });
    }
  },
  {
    maxAge: 60 * 60, // 1 hour
    swr: true,
    getKey: (event) =>
      getRouterParam(event, "username", { decode: true }) ?? "",
  },
);
