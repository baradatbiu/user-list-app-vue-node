import cacheManager from "cache-manager";

export const memoryCache = cacheManager.caching({
  store: "memory",
  max: 10000,
  ttl: 3600,
});
