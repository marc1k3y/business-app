export const Roles = {
  1: "owner"
}
export const permissions = {
  dashboard: { access: ["owner"], actions: { owner: ["read", "write", "create"] } },
  test: { access: ["owner"], actions: { owner: ["read", "write", "create"] } },
}