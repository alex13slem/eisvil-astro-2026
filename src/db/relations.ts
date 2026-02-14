import { relations } from "drizzle-orm/relations";
import { directusRoles, directusCollections, directusUsers, directusFiles, directusFolders, directusRevisions, directusActivity, directusVersions, directusSessions, directusShares, directusPolicies, directusPermissions, directusPresets, directusFlows, directusWebhooks, directusDashboards, directusPanels, directusNotifications, directusOperations, directusAccess, directusComments, directusSettings, games, platforms, gamePlatformLinks, gamesFiles, gameFeatures, socialNetworks, teamSocialNetworkLinks, team, jobRoles, vacancies, publishingPage, developmentPage, settings, gamesTeam1, settingsGames1, formDevelopmentOrderFiles, formDevelopmentOrder } from "./schema";

export const directusRolesRelations = relations(directusRoles, ({one, many}) => ({
	directusRole: one(directusRoles, {
		fields: [directusRoles.parent],
		references: [directusRoles.id],
		relationName: "directusRoles_parent_directusRoles_id"
	}),
	directusRoles: many(directusRoles, {
		relationName: "directusRoles_parent_directusRoles_id"
	}),
	directusUsers: many(directusUsers),
	directusPresets: many(directusPresets),
	directusShares: many(directusShares),
	directusAccesses: many(directusAccess),
	directusSettings: many(directusSettings),
}));

export const directusCollectionsRelations = relations(directusCollections, ({one, many}) => ({
	directusCollection: one(directusCollections, {
		fields: [directusCollections.group],
		references: [directusCollections.collection],
		relationName: "directusCollections_group_directusCollections_collection"
	}),
	directusCollections: many(directusCollections, {
		relationName: "directusCollections_group_directusCollections_collection"
	}),
	directusShares: many(directusShares),
	directusVersions: many(directusVersions),
}));

export const directusFilesRelations = relations(directusFiles, ({one, many}) => ({
	directusUser_uploadedBy: one(directusUsers, {
		fields: [directusFiles.uploadedBy],
		references: [directusUsers.id],
		relationName: "directusFiles_uploadedBy_directusUsers_id"
	}),
	directusUser_modifiedBy: one(directusUsers, {
		fields: [directusFiles.modifiedBy],
		references: [directusUsers.id],
		relationName: "directusFiles_modifiedBy_directusUsers_id"
	}),
	directusFolder: one(directusFolders, {
		fields: [directusFiles.folder],
		references: [directusFolders.id]
	}),
	directusSettings_projectLogo: many(directusSettings, {
		relationName: "directusSettings_projectLogo_directusFiles_id"
	}),
	directusSettings_publicForeground: many(directusSettings, {
		relationName: "directusSettings_publicForeground_directusFiles_id"
	}),
	directusSettings_publicBackground: many(directusSettings, {
		relationName: "directusSettings_publicBackground_directusFiles_id"
	}),
	directusSettings_publicFavicon: many(directusSettings, {
		relationName: "directusSettings_publicFavicon_directusFiles_id"
	}),
	games_logo: many(games, {
		relationName: "games_logo_directusFiles_id"
	}),
	games_bannerBg: many(games, {
		relationName: "games_bannerBg_directusFiles_id"
	}),
	games_bannerFg: many(games, {
		relationName: "games_bannerFg_directusFiles_id"
	}),
	games_fullBanner: many(games, {
		relationName: "games_fullBanner_directusFiles_id"
	}),
	games_decorLeft: many(games, {
		relationName: "games_decorLeft_directusFiles_id"
	}),
	games_decorTop: many(games, {
		relationName: "games_decorTop_directusFiles_id"
	}),
	games_decorRight: many(games, {
		relationName: "games_decorRight_directusFiles_id"
	}),
	games_decorBottom: many(games, {
		relationName: "games_decorBottom_directusFiles_id"
	}),
	gamesFiles: many(gamesFiles),
	gameFeatures: many(gameFeatures),
	teams: many(team),
	publishingPages: many(publishingPage),
	developmentPages: many(developmentPage),
	formDevelopmentOrderFiles: many(formDevelopmentOrderFiles),
}));

export const directusUsersRelations = relations(directusUsers, ({one, many}) => ({
	directusFiles_uploadedBy: many(directusFiles, {
		relationName: "directusFiles_uploadedBy_directusUsers_id"
	}),
	directusFiles_modifiedBy: many(directusFiles, {
		relationName: "directusFiles_modifiedBy_directusUsers_id"
	}),
	directusRole: one(directusRoles, {
		fields: [directusUsers.role],
		references: [directusRoles.id]
	}),
	directusSessions: many(directusSessions),
	directusPresets: many(directusPresets),
	directusPanels: many(directusPanels),
	directusNotifications_recipient: many(directusNotifications, {
		relationName: "directusNotifications_recipient_directusUsers_id"
	}),
	directusNotifications_sender: many(directusNotifications, {
		relationName: "directusNotifications_sender_directusUsers_id"
	}),
	directusShares: many(directusShares),
	directusFlows: many(directusFlows),
	directusOperations: many(directusOperations),
	directusDashboards: many(directusDashboards),
	directusAccesses: many(directusAccess),
	directusComments_userCreated: many(directusComments, {
		relationName: "directusComments_userCreated_directusUsers_id"
	}),
	directusComments_userUpdated: many(directusComments, {
		relationName: "directusComments_userUpdated_directusUsers_id"
	}),
	directusVersions_userCreated: many(directusVersions, {
		relationName: "directusVersions_userCreated_directusUsers_id"
	}),
	directusVersions_userUpdated: many(directusVersions, {
		relationName: "directusVersions_userUpdated_directusUsers_id"
	}),
	games_userUpdated: many(games, {
		relationName: "games_userUpdated_directusUsers_id"
	}),
	games_userCreated: many(games, {
		relationName: "games_userCreated_directusUsers_id"
	}),
	teams_userUpdated: many(team, {
		relationName: "team_userUpdated_directusUsers_id"
	}),
	teams_userCreated: many(team, {
		relationName: "team_userCreated_directusUsers_id"
	}),
	vacancies_userUpdated: many(vacancies, {
		relationName: "vacancies_userUpdated_directusUsers_id"
	}),
	vacancies_userCreated: many(vacancies, {
		relationName: "vacancies_userCreated_directusUsers_id"
	}),
	publishingPages: many(publishingPage),
	developmentPages: many(developmentPage),
	settings: many(settings),
}));

export const directusFoldersRelations = relations(directusFolders, ({one, many}) => ({
	directusFiles: many(directusFiles),
	directusFolder: one(directusFolders, {
		fields: [directusFolders.parent],
		references: [directusFolders.id],
		relationName: "directusFolders_parent_directusFolders_id"
	}),
	directusFolders: many(directusFolders, {
		relationName: "directusFolders_parent_directusFolders_id"
	}),
	directusSettings: many(directusSettings),
}));

export const directusRevisionsRelations = relations(directusRevisions, ({one, many}) => ({
	directusRevision: one(directusRevisions, {
		fields: [directusRevisions.parent],
		references: [directusRevisions.id],
		relationName: "directusRevisions_parent_directusRevisions_id"
	}),
	directusRevisions: many(directusRevisions, {
		relationName: "directusRevisions_parent_directusRevisions_id"
	}),
	directusActivity: one(directusActivity, {
		fields: [directusRevisions.activity],
		references: [directusActivity.id]
	}),
	directusVersion: one(directusVersions, {
		fields: [directusRevisions.version],
		references: [directusVersions.id]
	}),
}));

export const directusActivityRelations = relations(directusActivity, ({many}) => ({
	directusRevisions: many(directusRevisions),
}));

export const directusVersionsRelations = relations(directusVersions, ({one, many}) => ({
	directusRevisions: many(directusRevisions),
	directusCollection: one(directusCollections, {
		fields: [directusVersions.collection],
		references: [directusCollections.collection]
	}),
	directusUser_userCreated: one(directusUsers, {
		fields: [directusVersions.userCreated],
		references: [directusUsers.id],
		relationName: "directusVersions_userCreated_directusUsers_id"
	}),
	directusUser_userUpdated: one(directusUsers, {
		fields: [directusVersions.userUpdated],
		references: [directusUsers.id],
		relationName: "directusVersions_userUpdated_directusUsers_id"
	}),
}));

export const directusSessionsRelations = relations(directusSessions, ({one}) => ({
	directusUser: one(directusUsers, {
		fields: [directusSessions.user],
		references: [directusUsers.id]
	}),
	directusShare: one(directusShares, {
		fields: [directusSessions.share],
		references: [directusShares.id]
	}),
}));

export const directusSharesRelations = relations(directusShares, ({one, many}) => ({
	directusSessions: many(directusSessions),
	directusCollection: one(directusCollections, {
		fields: [directusShares.collection],
		references: [directusCollections.collection]
	}),
	directusRole: one(directusRoles, {
		fields: [directusShares.role],
		references: [directusRoles.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusShares.userCreated],
		references: [directusUsers.id]
	}),
}));

export const directusPermissionsRelations = relations(directusPermissions, ({one}) => ({
	directusPolicy: one(directusPolicies, {
		fields: [directusPermissions.policy],
		references: [directusPolicies.id]
	}),
}));

export const directusPoliciesRelations = relations(directusPolicies, ({many}) => ({
	directusPermissions: many(directusPermissions),
	directusAccesses: many(directusAccess),
}));

export const directusPresetsRelations = relations(directusPresets, ({one}) => ({
	directusUser: one(directusUsers, {
		fields: [directusPresets.user],
		references: [directusUsers.id]
	}),
	directusRole: one(directusRoles, {
		fields: [directusPresets.role],
		references: [directusRoles.id]
	}),
}));

export const directusWebhooksRelations = relations(directusWebhooks, ({one}) => ({
	directusFlow: one(directusFlows, {
		fields: [directusWebhooks.migratedFlow],
		references: [directusFlows.id]
	}),
}));

export const directusFlowsRelations = relations(directusFlows, ({one, many}) => ({
	directusWebhooks: many(directusWebhooks),
	directusUser: one(directusUsers, {
		fields: [directusFlows.userCreated],
		references: [directusUsers.id]
	}),
	directusOperations: many(directusOperations),
}));

export const directusPanelsRelations = relations(directusPanels, ({one}) => ({
	directusDashboard: one(directusDashboards, {
		fields: [directusPanels.dashboard],
		references: [directusDashboards.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusPanels.userCreated],
		references: [directusUsers.id]
	}),
}));

export const directusDashboardsRelations = relations(directusDashboards, ({one, many}) => ({
	directusPanels: many(directusPanels),
	directusUser: one(directusUsers, {
		fields: [directusDashboards.userCreated],
		references: [directusUsers.id]
	}),
}));

export const directusNotificationsRelations = relations(directusNotifications, ({one}) => ({
	directusUser_recipient: one(directusUsers, {
		fields: [directusNotifications.recipient],
		references: [directusUsers.id],
		relationName: "directusNotifications_recipient_directusUsers_id"
	}),
	directusUser_sender: one(directusUsers, {
		fields: [directusNotifications.sender],
		references: [directusUsers.id],
		relationName: "directusNotifications_sender_directusUsers_id"
	}),
}));

export const directusOperationsRelations = relations(directusOperations, ({one, many}) => ({
	directusOperation_resolve: one(directusOperations, {
		fields: [directusOperations.resolve],
		references: [directusOperations.id],
		relationName: "directusOperations_resolve_directusOperations_id"
	}),
	directusOperations_resolve: many(directusOperations, {
		relationName: "directusOperations_resolve_directusOperations_id"
	}),
	directusOperation_reject: one(directusOperations, {
		fields: [directusOperations.reject],
		references: [directusOperations.id],
		relationName: "directusOperations_reject_directusOperations_id"
	}),
	directusOperations_reject: many(directusOperations, {
		relationName: "directusOperations_reject_directusOperations_id"
	}),
	directusFlow: one(directusFlows, {
		fields: [directusOperations.flow],
		references: [directusFlows.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusOperations.userCreated],
		references: [directusUsers.id]
	}),
}));

export const directusAccessRelations = relations(directusAccess, ({one}) => ({
	directusRole: one(directusRoles, {
		fields: [directusAccess.role],
		references: [directusRoles.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusAccess.user],
		references: [directusUsers.id]
	}),
	directusPolicy: one(directusPolicies, {
		fields: [directusAccess.policy],
		references: [directusPolicies.id]
	}),
}));

export const directusCommentsRelations = relations(directusComments, ({one}) => ({
	directusUser_userCreated: one(directusUsers, {
		fields: [directusComments.userCreated],
		references: [directusUsers.id],
		relationName: "directusComments_userCreated_directusUsers_id"
	}),
	directusUser_userUpdated: one(directusUsers, {
		fields: [directusComments.userUpdated],
		references: [directusUsers.id],
		relationName: "directusComments_userUpdated_directusUsers_id"
	}),
}));

export const directusSettingsRelations = relations(directusSettings, ({one}) => ({
	directusFile_projectLogo: one(directusFiles, {
		fields: [directusSettings.projectLogo],
		references: [directusFiles.id],
		relationName: "directusSettings_projectLogo_directusFiles_id"
	}),
	directusFile_publicForeground: one(directusFiles, {
		fields: [directusSettings.publicForeground],
		references: [directusFiles.id],
		relationName: "directusSettings_publicForeground_directusFiles_id"
	}),
	directusFile_publicBackground: one(directusFiles, {
		fields: [directusSettings.publicBackground],
		references: [directusFiles.id],
		relationName: "directusSettings_publicBackground_directusFiles_id"
	}),
	directusFolder: one(directusFolders, {
		fields: [directusSettings.storageDefaultFolder],
		references: [directusFolders.id]
	}),
	directusFile_publicFavicon: one(directusFiles, {
		fields: [directusSettings.publicFavicon],
		references: [directusFiles.id],
		relationName: "directusSettings_publicFavicon_directusFiles_id"
	}),
	directusRole: one(directusRoles, {
		fields: [directusSettings.publicRegistrationRole],
		references: [directusRoles.id]
	}),
}));

export const gamesRelations = relations(games, ({one, many}) => ({
	directusUser_userUpdated: one(directusUsers, {
		fields: [games.userUpdated],
		references: [directusUsers.id],
		relationName: "games_userUpdated_directusUsers_id"
	}),
	directusUser_userCreated: one(directusUsers, {
		fields: [games.userCreated],
		references: [directusUsers.id],
		relationName: "games_userCreated_directusUsers_id"
	}),
	directusFile_logo: one(directusFiles, {
		fields: [games.logo],
		references: [directusFiles.id],
		relationName: "games_logo_directusFiles_id"
	}),
	directusFile_bannerBg: one(directusFiles, {
		fields: [games.bannerBg],
		references: [directusFiles.id],
		relationName: "games_bannerBg_directusFiles_id"
	}),
	directusFile_bannerFg: one(directusFiles, {
		fields: [games.bannerFg],
		references: [directusFiles.id],
		relationName: "games_bannerFg_directusFiles_id"
	}),
	directusFile_fullBanner: one(directusFiles, {
		fields: [games.fullBanner],
		references: [directusFiles.id],
		relationName: "games_fullBanner_directusFiles_id"
	}),
	directusFile_decorLeft: one(directusFiles, {
		fields: [games.decorLeft],
		references: [directusFiles.id],
		relationName: "games_decorLeft_directusFiles_id"
	}),
	directusFile_decorTop: one(directusFiles, {
		fields: [games.decorTop],
		references: [directusFiles.id],
		relationName: "games_decorTop_directusFiles_id"
	}),
	directusFile_decorRight: one(directusFiles, {
		fields: [games.decorRight],
		references: [directusFiles.id],
		relationName: "games_decorRight_directusFiles_id"
	}),
	directusFile_decorBottom: one(directusFiles, {
		fields: [games.decorBottom],
		references: [directusFiles.id],
		relationName: "games_decorBottom_directusFiles_id"
	}),
	gamePlatformLinks: many(gamePlatformLinks),
	gamesFiles: many(gamesFiles),
	gameFeatures: many(gameFeatures),
	gamesTeam1s: many(gamesTeam1),
	settingsGames1s: many(settingsGames1),
}));

export const gamePlatformLinksRelations = relations(gamePlatformLinks, ({one}) => ({
	platform: one(platforms, {
		fields: [gamePlatformLinks.platformId],
		references: [platforms.id]
	}),
	game: one(games, {
		fields: [gamePlatformLinks.gameId],
		references: [games.id]
	}),
}));

export const platformsRelations = relations(platforms, ({many}) => ({
	gamePlatformLinks: many(gamePlatformLinks),
}));

export const gamesFilesRelations = relations(gamesFiles, ({one}) => ({
	directusFile: one(directusFiles, {
		fields: [gamesFiles.directusFilesId],
		references: [directusFiles.id]
	}),
	game: one(games, {
		fields: [gamesFiles.gamesId],
		references: [games.id]
	}),
}));

export const gameFeaturesRelations = relations(gameFeatures, ({one}) => ({
	directusFile: one(directusFiles, {
		fields: [gameFeatures.image],
		references: [directusFiles.id]
	}),
	game: one(games, {
		fields: [gameFeatures.gameId],
		references: [games.id]
	}),
}));

export const teamSocialNetworkLinksRelations = relations(teamSocialNetworkLinks, ({one}) => ({
	socialNetwork: one(socialNetworks, {
		fields: [teamSocialNetworkLinks.networkId],
		references: [socialNetworks.id]
	}),
	team: one(team, {
		fields: [teamSocialNetworkLinks.memberId],
		references: [team.id]
	}),
}));

export const socialNetworksRelations = relations(socialNetworks, ({many}) => ({
	teamSocialNetworkLinks: many(teamSocialNetworkLinks),
}));

export const teamRelations = relations(team, ({one, many}) => ({
	teamSocialNetworkLinks: many(teamSocialNetworkLinks),
	directusUser_userUpdated: one(directusUsers, {
		fields: [team.userUpdated],
		references: [directusUsers.id],
		relationName: "team_userUpdated_directusUsers_id"
	}),
	directusUser_userCreated: one(directusUsers, {
		fields: [team.userCreated],
		references: [directusUsers.id],
		relationName: "team_userCreated_directusUsers_id"
	}),
	jobRole: one(jobRoles, {
		fields: [team.roleId],
		references: [jobRoles.id]
	}),
	directusFile: one(directusFiles, {
		fields: [team.image],
		references: [directusFiles.id]
	}),
	gamesTeam1s: many(gamesTeam1),
}));

export const jobRolesRelations = relations(jobRoles, ({many}) => ({
	teams: many(team),
	vacancies: many(vacancies),
}));

export const vacanciesRelations = relations(vacancies, ({one}) => ({
	directusUser_userUpdated: one(directusUsers, {
		fields: [vacancies.userUpdated],
		references: [directusUsers.id],
		relationName: "vacancies_userUpdated_directusUsers_id"
	}),
	directusUser_userCreated: one(directusUsers, {
		fields: [vacancies.userCreated],
		references: [directusUsers.id],
		relationName: "vacancies_userCreated_directusUsers_id"
	}),
	jobRole: one(jobRoles, {
		fields: [vacancies.positionId],
		references: [jobRoles.id]
	}),
}));

export const publishingPageRelations = relations(publishingPage, ({one}) => ({
	directusUser: one(directusUsers, {
		fields: [publishingPage.userUpdated],
		references: [directusUsers.id]
	}),
	directusFile: one(directusFiles, {
		fields: [publishingPage.image],
		references: [directusFiles.id]
	}),
}));

export const developmentPageRelations = relations(developmentPage, ({one}) => ({
	directusUser: one(directusUsers, {
		fields: [developmentPage.userUpdated],
		references: [directusUsers.id]
	}),
	directusFile: one(directusFiles, {
		fields: [developmentPage.image],
		references: [directusFiles.id]
	}),
}));

export const settingsRelations = relations(settings, ({one, many}) => ({
	directusUser: one(directusUsers, {
		fields: [settings.userUpdated],
		references: [directusUsers.id]
	}),
	settingsGames1s: many(settingsGames1),
}));

export const gamesTeam1Relations = relations(gamesTeam1, ({one}) => ({
	team: one(team, {
		fields: [gamesTeam1.teamId],
		references: [team.id]
	}),
	game: one(games, {
		fields: [gamesTeam1.gamesId],
		references: [games.id]
	}),
}));

export const settingsGames1Relations = relations(settingsGames1, ({one}) => ({
	game: one(games, {
		fields: [settingsGames1.gamesId],
		references: [games.id]
	}),
	setting: one(settings, {
		fields: [settingsGames1.settingsId],
		references: [settings.id]
	}),
}));

export const formDevelopmentOrderFilesRelations = relations(formDevelopmentOrderFiles, ({one}) => ({
	directusFile: one(directusFiles, {
		fields: [formDevelopmentOrderFiles.directusFilesId],
		references: [directusFiles.id]
	}),
	formDevelopmentOrder: one(formDevelopmentOrder, {
		fields: [formDevelopmentOrderFiles.formDevelopmentOrderId],
		references: [formDevelopmentOrder.id]
	}),
}));

export const formDevelopmentOrderRelations = relations(formDevelopmentOrder, ({many}) => ({
	formDevelopmentOrderFiles: many(formDevelopmentOrderFiles),
}));