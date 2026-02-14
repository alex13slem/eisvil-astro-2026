export const SOCIAL_NETWORK_SLUGS = ["vk", "telegram", "max"] as const;
export type SocialNetworkSlug = (typeof SOCIAL_NETWORK_SLUGS)[number];
