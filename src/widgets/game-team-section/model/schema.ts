import { SOCIAL_NETWORK_SLUGS } from "@/entities/social-networks";
import { z } from "astro:schema";

export const TeamSocialNetworkSchema = z.object({
  name: z.string(),
  slug: z.enum(SOCIAL_NETWORK_SLUGS),
  link: z.string(),
});

export const GameTeamMemberSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string().url(),
  role: z.string(),
  description: z.string(),
  socialNetworks: z.array(TeamSocialNetworkSchema),
});
export type GameTeamMember = z.infer<typeof GameTeamMemberSchema>;
