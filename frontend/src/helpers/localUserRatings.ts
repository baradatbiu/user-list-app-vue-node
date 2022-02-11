import { UserRatings } from "@/types/user";

const KEY = "USER_RATINGS";

export function getLocalRatings(): UserRatings {
  const defaultValue = [] as UserRatings;
  const value = localStorage.getItem(KEY);

  return value ? JSON.parse(value) : defaultValue;
}

export function setLocalRatings(ratings: UserRatings): void {
  localStorage.setItem(KEY, JSON.stringify(ratings));
}
