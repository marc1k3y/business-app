export const Roles = {
  1: "owner",
  3: "buyer"
}
export const permissions = {
  dashboard: { access: ["owner", "buyer"], actions: { owner: ["read", "write", "create"] } },
  farming: { access: ["owner", "buyer"], actions: { owner: ["read", "write", "create"] } },
}