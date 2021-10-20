import { Filters, User, Users } from "@/types/user";

export interface State {
  users: [] | Users;
  loading: boolean;
  currentFilter: "" | Filters;
  directSortOrder: boolean;
  currentUser: Record<string, never> | User;
}

export const state: State = {
  users: [],
  loading: false,
  currentFilter: "",
  directSortOrder: true,
  currentUser: {},
};
