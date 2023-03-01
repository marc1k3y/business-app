export const Roles = {
  1: "owner",
  3: "buyer",
  6: "farmer"
}
export const permissions = {
  profile: {
    access: ["owner", "buyer", "farmer"],
    actions: {
      owner: ["read", "write", "create"],
      buyer: ["read", "write", "create"],
      farmer: ["read", "write", "create"]
    },
  },
  farming: {
    access: ["owner", "buyer", "farmer"],
    actions: {
      owner: ["read", "edit", "create"],
      buyer: ["read", "create"],
      farmer: ["read", "edit", "create"]
    }
  }
}