/** Whenever I needed to change a link's url, it broke all links attached to it. This file is an attempt to fix that problem. */

export const activitiesUrl = getUrl({ isAbsolute: true }, "activities");
export const registerUrl = getUrl({ isAbsolute: true }, "account", "register");
export const loginUrl = getUrl({ isAbsolute: true }, "account", "login");
export const routinesUrl = getUrl({ isAbsolute: true }, "routines");
export const errorUrl = getUrl({ isAbsolute: true }, "error");

export default function getUrl({ isAbsolute = false }, ...strings) {
  const link = strings.join("/");
  const prefix = isAbsolute ? "/" : "";
  return prefix + link;
}
