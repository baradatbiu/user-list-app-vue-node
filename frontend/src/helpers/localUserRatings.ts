import { UserRatings, Filters } from "@/types/user";

const KEY = "USER_RATINGS";

export function getLocalRatings(): UserRatings {
  const defaultValue = [] as UserRatings;
  const value = localStorage.getItem(KEY);

  const reviver = (k: string, v: string | number) => {
    if (k === Filters.Rating) return Number(v);
    return v;
  };

  return value ? JSON.parse(value, reviver) : defaultValue;
}

export function setLocalRatings(ratings: UserRatings): void {
  localStorage.setItem(KEY, JSON.stringify(ratings));
}
