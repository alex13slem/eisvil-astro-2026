import { db } from "@/db/client";
import {
  gamesTeam1,
  jobRoles,
  socialNetworks,
  team,
  teamSocialNetworkLinks,
} from "@/db/schema";
import { toAssetUrl } from "@/shared/utils";
import { eq, inArray } from "drizzle-orm";
import { GameTeamMemberSchema, type GameTeamMember } from "../model/schema";

export default async function fetchGameTeamMembers(
  gameId: string,
): Promise<GameTeamMember[]> {
  const teams = await db
    .select({
      id: team.id,
      name: team.name,
      image: team.image,
      role: jobRoles.name,
      description: team.description,
    })
    .from(gamesTeam1)
    .innerJoin(team, eq(gamesTeam1.teamId, team.id))
    .leftJoin(jobRoles, eq(team.roleId, jobRoles.id))
    .where(eq(gamesTeam1.gamesId, gameId));

  const memberIds = teams.map((member) => member.id);
  if (!memberIds.length) {
    return [];
  }

  const networkLinks = await db
    .select({
      memberId: teamSocialNetworkLinks.memberId,
      name: socialNetworks.name,
      slug: socialNetworks.slug,
      link: teamSocialNetworkLinks.link,
    })
    .from(teamSocialNetworkLinks)
    .innerJoin(
      socialNetworks,
      eq(teamSocialNetworkLinks.networkId, socialNetworks.id),
    )
    .where(inArray(teamSocialNetworkLinks.memberId, memberIds));

  const socialNetworksByMemberId = new Map<
    string,
    { name: string; slug: string; link: string }[]
  >();

  for (const row of networkLinks) {
    if (!row.memberId) continue;
    const list = socialNetworksByMemberId.get(row.memberId) ?? [];
    list.push({
      name: row.name ?? "",
      slug: row.slug ?? "",
      link: row.link ?? "",
    });
    socialNetworksByMemberId.set(row.memberId, list);
  }

  const normalizedData = teams.map((member) => ({
    id: member.id,
    name: member.name ?? "",
    image: toAssetUrl(member.image),
    role: member.role ?? "",
    description: member.description ?? "",
    socialNetworks: socialNetworksByMemberId.get(member.id) ?? [],
  }));

  const { success, data } =
    await GameTeamMemberSchema.array().safeParseAsync(normalizedData);
  if (!success) throw new Error("Error fetching game team");

  return data;
}
