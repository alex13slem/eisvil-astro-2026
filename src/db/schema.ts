import { pgTable, check, integer, varchar, foreignKey, uuid, text, boolean, json, serial, timestamp, bigint, unique, date, pgView } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const spatialRefSys = pgTable("spatial_ref_sys", {
	srid: integer().primaryKey().notNull(),
	authName: varchar("auth_name", { length: 256 }),
	authSrid: integer("auth_srid"),
	srtext: varchar({ length: 2048 }),
	proj4Text: varchar({ length: 2048 }),
}, (table) => [
	check("spatial_ref_sys_srid_check", sql`(srid > 0) AND (srid <= 998999)`),
]);

export const directusRoles = pgTable("directus_roles", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	icon: varchar({ length: 64 }).default('supervised_user_circle').notNull(),
	description: text(),
	parent: uuid(),
}, (table) => [
	foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "directus_roles_parent_foreign"
		}),
]);

export const directusCollections = pgTable("directus_collections", {
	collection: varchar({ length: 64 }).primaryKey().notNull(),
	icon: varchar({ length: 64 }),
	note: text(),
	displayTemplate: varchar("display_template", { length: 255 }),
	hidden: boolean().default(false).notNull(),
	singleton: boolean().default(false).notNull(),
	translations: json(),
	archiveField: varchar("archive_field", { length: 64 }),
	archiveAppFilter: boolean("archive_app_filter").default(true).notNull(),
	archiveValue: varchar("archive_value", { length: 255 }),
	unarchiveValue: varchar("unarchive_value", { length: 255 }),
	sortField: varchar("sort_field", { length: 64 }),
	accountability: varchar({ length: 255 }).default('all'),
	color: varchar({ length: 255 }),
	itemDuplicationFields: json("item_duplication_fields"),
	sort: integer(),
	group: varchar({ length: 64 }),
	collapse: varchar({ length: 255 }).default('open').notNull(),
	previewUrl: varchar("preview_url", { length: 255 }),
	versioning: boolean().default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.group],
			foreignColumns: [table.collection],
			name: "directus_collections_group_foreign"
		}),
]);

export const directusFields = pgTable("directus_fields", {
	id: serial().primaryKey().notNull(),
	collection: varchar({ length: 64 }).notNull(),
	field: varchar({ length: 64 }).notNull(),
	special: varchar({ length: 64 }),
	interface: varchar({ length: 64 }),
	options: json(),
	display: varchar({ length: 64 }),
	displayOptions: json("display_options"),
	readonly: boolean().default(false).notNull(),
	hidden: boolean().default(false).notNull(),
	sort: integer(),
	width: varchar({ length: 30 }).default('full'),
	translations: json(),
	note: text(),
	conditions: json(),
	required: boolean().default(false),
	group: varchar({ length: 64 }),
	validation: json(),
	validationMessage: text("validation_message"),
});

export const directusFiles = pgTable("directus_files", {
	id: uuid().primaryKey().notNull(),
	storage: varchar({ length: 255 }).notNull(),
	filenameDisk: varchar("filename_disk", { length: 255 }),
	filenameDownload: varchar("filename_download", { length: 255 }).notNull(),
	title: varchar({ length: 255 }),
	type: varchar({ length: 255 }),
	folder: uuid(),
	uploadedBy: uuid("uploaded_by"),
	createdOn: timestamp("created_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	modifiedBy: uuid("modified_by"),
	modifiedOn: timestamp("modified_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	charset: varchar({ length: 50 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	filesize: bigint({ mode: "number" }),
	width: integer(),
	height: integer(),
	duration: integer(),
	embed: varchar({ length: 200 }),
	description: text(),
	location: text(),
	tags: text(),
	metadata: json(),
	focalPointX: integer("focal_point_x"),
	focalPointY: integer("focal_point_y"),
	tusId: varchar("tus_id", { length: 64 }),
	tusData: json("tus_data"),
	uploadedOn: timestamp("uploaded_on", { withTimezone: true, mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.uploadedBy],
			foreignColumns: [directusUsers.id],
			name: "directus_files_uploaded_by_foreign"
		}),
	foreignKey({
			columns: [table.modifiedBy],
			foreignColumns: [directusUsers.id],
			name: "directus_files_modified_by_foreign"
		}),
	foreignKey({
			columns: [table.folder],
			foreignColumns: [directusFolders.id],
			name: "directus_files_folder_foreign"
		}).onDelete("set null"),
]);

export const directusFolders = pgTable("directus_folders", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	parent: uuid(),
}, (table) => [
	foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "directus_folders_parent_foreign"
		}),
]);

export const directusActivity = pgTable("directus_activity", {
	id: serial().primaryKey().notNull(),
	action: varchar({ length: 45 }).notNull(),
	user: uuid(),
	timestamp: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	ip: varchar({ length: 50 }),
	userAgent: text("user_agent"),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	origin: varchar({ length: 255 }),
});

export const directusRevisions = pgTable("directus_revisions", {
	id: serial().primaryKey().notNull(),
	activity: integer().notNull(),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	data: json(),
	delta: json(),
	parent: integer(),
	version: uuid(),
}, (table) => [
	foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "directus_revisions_parent_foreign"
		}),
	foreignKey({
			columns: [table.activity],
			foreignColumns: [directusActivity.id],
			name: "directus_revisions_activity_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.version],
			foreignColumns: [directusVersions.id],
			name: "directus_revisions_version_foreign"
		}).onDelete("cascade"),
]);

export const directusUsers = pgTable("directus_users", {
	id: uuid().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 50 }),
	lastName: varchar("last_name", { length: 50 }),
	email: varchar({ length: 128 }),
	password: varchar({ length: 255 }),
	location: varchar({ length: 255 }),
	title: varchar({ length: 50 }),
	description: text(),
	tags: json(),
	avatar: uuid(),
	language: varchar({ length: 255 }).default(sql`NULL`),
	tfaSecret: varchar("tfa_secret", { length: 255 }),
	status: varchar({ length: 16 }).default('active').notNull(),
	role: uuid(),
	token: varchar({ length: 255 }),
	lastAccess: timestamp("last_access", { withTimezone: true, mode: 'string' }),
	lastPage: varchar("last_page", { length: 255 }),
	provider: varchar({ length: 128 }).default('default').notNull(),
	externalIdentifier: varchar("external_identifier", { length: 255 }),
	authData: json("auth_data"),
	emailNotifications: boolean("email_notifications").default(true),
	appearance: varchar({ length: 255 }),
	themeDark: varchar("theme_dark", { length: 255 }),
	themeLight: varchar("theme_light", { length: 255 }),
	themeLightOverrides: json("theme_light_overrides"),
	themeDarkOverrides: json("theme_dark_overrides"),
	textDirection: varchar("text_direction", { length: 255 }).default('auto').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: "directus_users_role_foreign"
		}).onDelete("set null"),
	unique("directus_users_email_unique").on(table.email),
	unique("directus_users_token_unique").on(table.token),
	unique("directus_users_external_identifier_unique").on(table.externalIdentifier),
]);

export const directusRelations = pgTable("directus_relations", {
	id: serial().primaryKey().notNull(),
	manyCollection: varchar("many_collection", { length: 64 }).notNull(),
	manyField: varchar("many_field", { length: 64 }).notNull(),
	oneCollection: varchar("one_collection", { length: 64 }),
	oneField: varchar("one_field", { length: 64 }),
	oneCollectionField: varchar("one_collection_field", { length: 64 }),
	oneAllowedCollections: text("one_allowed_collections"),
	junctionField: varchar("junction_field", { length: 64 }),
	sortField: varchar("sort_field", { length: 64 }),
	oneDeselectAction: varchar("one_deselect_action", { length: 255 }).default('nullify').notNull(),
});

export const directusSessions = pgTable("directus_sessions", {
	token: varchar({ length: 64 }).primaryKey().notNull(),
	user: uuid(),
	expires: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	ip: varchar({ length: 255 }),
	userAgent: text("user_agent"),
	share: uuid(),
	origin: varchar({ length: 255 }),
	nextToken: varchar("next_token", { length: 64 }),
}, (table) => [
	foreignKey({
			columns: [table.user],
			foreignColumns: [directusUsers.id],
			name: "directus_sessions_user_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.share],
			foreignColumns: [directusShares.id],
			name: "directus_sessions_share_foreign"
		}).onDelete("cascade"),
]);

export const directusPermissions = pgTable("directus_permissions", {
	id: serial().primaryKey().notNull(),
	collection: varchar({ length: 64 }).notNull(),
	action: varchar({ length: 10 }).notNull(),
	permissions: json(),
	validation: json(),
	presets: json(),
	fields: text(),
	policy: uuid().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.policy],
			foreignColumns: [directusPolicies.id],
			name: "directus_permissions_policy_foreign"
		}).onDelete("cascade"),
]);

export const directusPresets = pgTable("directus_presets", {
	id: serial().primaryKey().notNull(),
	bookmark: varchar({ length: 255 }),
	user: uuid(),
	role: uuid(),
	collection: varchar({ length: 64 }),
	search: varchar({ length: 100 }),
	layout: varchar({ length: 100 }).default('tabular'),
	layoutQuery: json("layout_query"),
	layoutOptions: json("layout_options"),
	refreshInterval: integer("refresh_interval"),
	filter: json(),
	icon: varchar({ length: 64 }).default('bookmark'),
	color: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.user],
			foreignColumns: [directusUsers.id],
			name: "directus_presets_user_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: "directus_presets_role_foreign"
		}).onDelete("cascade"),
]);

export const directusWebhooks = pgTable("directus_webhooks", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	method: varchar({ length: 10 }).default('POST').notNull(),
	url: varchar({ length: 255 }).notNull(),
	status: varchar({ length: 10 }).default('active').notNull(),
	data: boolean().default(true).notNull(),
	actions: varchar({ length: 100 }).notNull(),
	collections: varchar({ length: 255 }).notNull(),
	headers: json(),
	wasActiveBeforeDeprecation: boolean("was_active_before_deprecation").default(false).notNull(),
	migratedFlow: uuid("migrated_flow"),
}, (table) => [
	foreignKey({
			columns: [table.migratedFlow],
			foreignColumns: [directusFlows.id],
			name: "directus_webhooks_migrated_flow_foreign"
		}).onDelete("set null"),
]);

export const directusMigrations = pgTable("directus_migrations", {
	version: varchar({ length: 255 }).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	timestamp: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const directusPanels = pgTable("directus_panels", {
	id: uuid().primaryKey().notNull(),
	dashboard: uuid().notNull(),
	name: varchar({ length: 255 }),
	icon: varchar({ length: 64 }).default(sql`NULL`),
	color: varchar({ length: 10 }),
	showHeader: boolean("show_header").default(false).notNull(),
	note: text(),
	type: varchar({ length: 255 }).notNull(),
	positionX: integer("position_x").notNull(),
	positionY: integer("position_y").notNull(),
	width: integer().notNull(),
	height: integer().notNull(),
	options: json(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
}, (table) => [
	foreignKey({
			columns: [table.dashboard],
			foreignColumns: [directusDashboards.id],
			name: "directus_panels_dashboard_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_panels_user_created_foreign"
		}).onDelete("set null"),
]);

export const directusNotifications = pgTable("directus_notifications", {
	id: serial().primaryKey().notNull(),
	timestamp: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	status: varchar({ length: 255 }).default('inbox'),
	recipient: uuid().notNull(),
	sender: uuid(),
	subject: varchar({ length: 255 }).notNull(),
	message: text(),
	collection: varchar({ length: 64 }),
	item: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.recipient],
			foreignColumns: [directusUsers.id],
			name: "directus_notifications_recipient_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.sender],
			foreignColumns: [directusUsers.id],
			name: "directus_notifications_sender_foreign"
		}),
]);

export const directusShares = pgTable("directus_shares", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	role: uuid(),
	password: varchar({ length: 255 }),
	userCreated: uuid("user_created"),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	dateStart: timestamp("date_start", { withTimezone: true, mode: 'string' }),
	dateEnd: timestamp("date_end", { withTimezone: true, mode: 'string' }),
	timesUsed: integer("times_used").default(0),
	maxUses: integer("max_uses"),
}, (table) => [
	foreignKey({
			columns: [table.collection],
			foreignColumns: [directusCollections.collection],
			name: "directus_shares_collection_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: "directus_shares_role_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_shares_user_created_foreign"
		}).onDelete("set null"),
]);

export const directusFlows = pgTable("directus_flows", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	icon: varchar({ length: 64 }),
	color: varchar({ length: 255 }),
	description: text(),
	status: varchar({ length: 255 }).default('active').notNull(),
	trigger: varchar({ length: 255 }),
	accountability: varchar({ length: 255 }).default('all'),
	options: json(),
	operation: uuid(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
}, (table) => [
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_flows_user_created_foreign"
		}).onDelete("set null"),
	unique("directus_flows_operation_unique").on(table.operation),
]);

export const directusOperations = pgTable("directus_operations", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	key: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 255 }).notNull(),
	positionX: integer("position_x").notNull(),
	positionY: integer("position_y").notNull(),
	options: json(),
	resolve: uuid(),
	reject: uuid(),
	flow: uuid().notNull(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
}, (table) => [
	foreignKey({
			columns: [table.resolve],
			foreignColumns: [table.id],
			name: "directus_operations_resolve_foreign"
		}),
	foreignKey({
			columns: [table.reject],
			foreignColumns: [table.id],
			name: "directus_operations_reject_foreign"
		}),
	foreignKey({
			columns: [table.flow],
			foreignColumns: [directusFlows.id],
			name: "directus_operations_flow_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_operations_user_created_foreign"
		}).onDelete("set null"),
	unique("directus_operations_resolve_unique").on(table.resolve),
	unique("directus_operations_reject_unique").on(table.reject),
]);

export const directusDashboards = pgTable("directus_dashboards", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	icon: varchar({ length: 64 }).default('dashboard').notNull(),
	note: text(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
	color: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_dashboards_user_created_foreign"
		}).onDelete("set null"),
]);

export const directusTranslations = pgTable("directus_translations", {
	id: uuid().primaryKey().notNull(),
	language: varchar({ length: 255 }).notNull(),
	key: varchar({ length: 255 }).notNull(),
	value: text().notNull(),
});

export const directusAccess = pgTable("directus_access", {
	id: uuid().primaryKey().notNull(),
	role: uuid(),
	user: uuid(),
	policy: uuid().notNull(),
	sort: integer(),
}, (table) => [
	foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: "directus_access_role_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.user],
			foreignColumns: [directusUsers.id],
			name: "directus_access_user_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.policy],
			foreignColumns: [directusPolicies.id],
			name: "directus_access_policy_foreign"
		}).onDelete("cascade"),
]);

export const directusComments = pgTable("directus_comments", {
	id: uuid().primaryKey().notNull(),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	comment: text().notNull(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
	userUpdated: uuid("user_updated"),
}, (table) => [
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_comments_user_created_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "directus_comments_user_updated_foreign"
		}),
]);

export const directusVersions = pgTable("directus_versions", {
	id: uuid().primaryKey().notNull(),
	key: varchar({ length: 64 }).notNull(),
	name: varchar({ length: 255 }),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	hash: varchar({ length: 255 }),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
	userUpdated: uuid("user_updated"),
	delta: json(),
}, (table) => [
	foreignKey({
			columns: [table.collection],
			foreignColumns: [directusCollections.collection],
			name: "directus_versions_collection_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_versions_user_created_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "directus_versions_user_updated_foreign"
		}),
]);

export const directusSettings = pgTable("directus_settings", {
	id: serial().primaryKey().notNull(),
	projectName: varchar("project_name", { length: 100 }).default('Directus').notNull(),
	projectUrl: varchar("project_url", { length: 255 }),
	projectColor: varchar("project_color", { length: 255 }).default('#6644FF').notNull(),
	projectLogo: uuid("project_logo"),
	publicForeground: uuid("public_foreground"),
	publicBackground: uuid("public_background"),
	publicNote: text("public_note"),
	authLoginAttempts: integer("auth_login_attempts").default(25),
	authPasswordPolicy: varchar("auth_password_policy", { length: 100 }),
	storageAssetTransform: varchar("storage_asset_transform", { length: 7 }).default('all'),
	storageAssetPresets: json("storage_asset_presets"),
	customCss: text("custom_css"),
	storageDefaultFolder: uuid("storage_default_folder"),
	basemaps: json(),
	mapboxKey: varchar("mapbox_key", { length: 255 }),
	moduleBar: json("module_bar"),
	projectDescriptor: varchar("project_descriptor", { length: 100 }),
	defaultLanguage: varchar("default_language", { length: 255 }).default('en-US').notNull(),
	customAspectRatios: json("custom_aspect_ratios"),
	publicFavicon: uuid("public_favicon"),
	defaultAppearance: varchar("default_appearance", { length: 255 }).default('auto').notNull(),
	defaultThemeLight: varchar("default_theme_light", { length: 255 }),
	themeLightOverrides: json("theme_light_overrides"),
	defaultThemeDark: varchar("default_theme_dark", { length: 255 }),
	themeDarkOverrides: json("theme_dark_overrides"),
	reportErrorUrl: varchar("report_error_url", { length: 255 }),
	reportBugUrl: varchar("report_bug_url", { length: 255 }),
	reportFeatureUrl: varchar("report_feature_url", { length: 255 }),
	publicRegistration: boolean("public_registration").default(false).notNull(),
	publicRegistrationVerifyEmail: boolean("public_registration_verify_email").default(true).notNull(),
	publicRegistrationRole: uuid("public_registration_role"),
	publicRegistrationEmailFilter: json("public_registration_email_filter"),
	visualEditorUrls: json("visual_editor_urls"),
	acceptedTerms: boolean("accepted_terms").default(false),
	projectId: uuid("project_id"),
}, (table) => [
	foreignKey({
			columns: [table.projectLogo],
			foreignColumns: [directusFiles.id],
			name: "directus_settings_project_logo_foreign"
		}),
	foreignKey({
			columns: [table.publicForeground],
			foreignColumns: [directusFiles.id],
			name: "directus_settings_public_foreground_foreign"
		}),
	foreignKey({
			columns: [table.publicBackground],
			foreignColumns: [directusFiles.id],
			name: "directus_settings_public_background_foreign"
		}),
	foreignKey({
			columns: [table.storageDefaultFolder],
			foreignColumns: [directusFolders.id],
			name: "directus_settings_storage_default_folder_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.publicFavicon],
			foreignColumns: [directusFiles.id],
			name: "directus_settings_public_favicon_foreign"
		}),
	foreignKey({
			columns: [table.publicRegistrationRole],
			foreignColumns: [directusRoles.id],
			name: "directus_settings_public_registration_role_foreign"
		}).onDelete("set null"),
]);

export const directusExtensions = pgTable("directus_extensions", {
	enabled: boolean().default(true).notNull(),
	id: uuid().primaryKey().notNull(),
	folder: varchar({ length: 255 }).notNull(),
	source: varchar({ length: 255 }).notNull(),
	bundle: uuid(),
});

export const directusPolicies = pgTable("directus_policies", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	icon: varchar({ length: 64 }).default('badge').notNull(),
	description: text(),
	ipAccess: text("ip_access"),
	enforceTfa: boolean("enforce_tfa").default(false).notNull(),
	adminAccess: boolean("admin_access").default(false).notNull(),
	appAccess: boolean("app_access").default(false).notNull(),
});

export const games = pgTable("games", {
	id: uuid().primaryKey().notNull(),
	userCreated: uuid("user_created"),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }),
	userUpdated: uuid("user_updated"),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }),
	name: varchar({ length: 255 }),
	logo: uuid(),
	bannerDescription: text("banner_description"),
	description: text(),
	shortPromoDescription: text("short_promo_description"),
	bannerBg: uuid("banner_bg"),
	bannerFg: uuid("banner_fg"),
	fullBanner: uuid("full_banner"),
	genre: varchar({ length: 255 }),
	developer: varchar({ length: 255 }),
	publisher: varchar({ length: 255 }),
	releaseDate: date("release_date"),
	slug: varchar({ length: 255 }).default(sql`NULL`),
	siteUrl: varchar("site_url", { length: 255 }),
	decorLeft: uuid("decor_left"),
	decorTop: uuid("decor_top"),
	decorRight: uuid("decor_right"),
	decorBottom: uuid("decor_bottom"),
}, (table) => [
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "games_user_updated_foreign"
		}),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "games_user_created_foreign"
		}),
	foreignKey({
			columns: [table.logo],
			foreignColumns: [directusFiles.id],
			name: "games_logo_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.bannerBg],
			foreignColumns: [directusFiles.id],
			name: "games_banner_bg_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.bannerFg],
			foreignColumns: [directusFiles.id],
			name: "games_banner_fg_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.fullBanner],
			foreignColumns: [directusFiles.id],
			name: "games_full_banner_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.decorLeft],
			foreignColumns: [directusFiles.id],
			name: "games_decor_left_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.decorTop],
			foreignColumns: [directusFiles.id],
			name: "games_decor_top_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.decorRight],
			foreignColumns: [directusFiles.id],
			name: "games_decor_right_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.decorBottom],
			foreignColumns: [directusFiles.id],
			name: "games_decor_bottom_foreign"
		}).onDelete("set null"),
	unique("games_slug_unique").on(table.slug),
]);

export const platforms = pgTable("platforms", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	slug: varchar({ length: 255 }).default(sql`NULL`),
}, (table) => [
	unique("platforms_slug_unique").on(table.slug),
]);

export const gamePlatformLinks = pgTable("game_platform_links", {
	id: serial().primaryKey().notNull(),
	platformId: integer("platform_id"),
	gameId: uuid("game_id"),
	link: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.platformId],
			foreignColumns: [platforms.id],
			name: "game_platform_links_platform_id_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "game_platform_links_game_id_foreign"
		}).onDelete("cascade"),
]);

export const gamesFiles = pgTable("games_files", {
	id: serial().primaryKey().notNull(),
	gamesId: uuid("games_id"),
	directusFilesId: uuid("directus_files_id"),
}, (table) => [
	foreignKey({
			columns: [table.directusFilesId],
			foreignColumns: [directusFiles.id],
			name: "games_files_directus_files_id_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.gamesId],
			foreignColumns: [games.id],
			name: "games_files_games_id_foreign"
		}).onDelete("set null"),
]);

export const gameFeatures = pgTable("game_features", {
	id: serial().primaryKey().notNull(),
	gameId: uuid("game_id"),
	order: integer().default(1),
	title: varchar({ length: 255 }),
	description: text(),
	image: uuid(),
}, (table) => [
	foreignKey({
			columns: [table.image],
			foreignColumns: [directusFiles.id],
			name: "game_features_image_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "game_features_game_id_foreign"
		}).onDelete("cascade"),
]);

export const socialNetworks = pgTable("social_networks", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	slug: varchar({ length: 255 }).default(sql`NULL`),
}, (table) => [
	unique("social_networks_slug_unique").on(table.slug),
]);

export const teamSocialNetworkLinks = pgTable("team_social_network_links", {
	id: uuid().primaryKey().notNull(),
	memberId: uuid("member_id"),
	networkId: integer("network_id"),
	link: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.networkId],
			foreignColumns: [socialNetworks.id],
			name: "team_social_network_links_network_id_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [team.id],
			name: "team_social_network_links_member_id_foreign"
		}).onDelete("cascade"),
]);

export const team = pgTable("team", {
	id: uuid().primaryKey().notNull(),
	userCreated: uuid("user_created"),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }),
	userUpdated: uuid("user_updated"),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }),
	name: varchar({ length: 255 }),
	roleId: integer("role_id"),
	description: text(),
	image: uuid(),
}, (table) => [
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "team_user_updated_foreign"
		}),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "team_user_created_foreign"
		}),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [jobRoles.id],
			name: "team_role_id_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.image],
			foreignColumns: [directusFiles.id],
			name: "team_image_foreign"
		}).onDelete("set null"),
]);

export const jobRoles = pgTable("job_roles", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	slug: varchar({ length: 255 }).default(sql`NULL`),
}, (table) => [
	unique("job_roles_slug_unique").on(table.slug),
]);

export const vacancies = pgTable("vacancies", {
	id: uuid().primaryKey().notNull(),
	userCreated: uuid("user_created"),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }),
	userUpdated: uuid("user_updated"),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }),
	positionId: integer("position_id"),
	workplace: json(),
	body: text(),
	formLink: varchar("form_link", { length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "vacancies_user_updated_foreign"
		}),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "vacancies_user_created_foreign"
		}),
	foreignKey({
			columns: [table.positionId],
			foreignColumns: [jobRoles.id],
			name: "vacancies_position_id_foreign"
		}).onDelete("set null"),
]);

export const publishingPage = pgTable("publishing_page", {
	id: serial().primaryKey().notNull(),
	userUpdated: uuid("user_updated"),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }),
	image: uuid(),
	description: text(),
	body: text(),
}, (table) => [
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "publishing_page_user_updated_foreign"
		}),
	foreignKey({
			columns: [table.image],
			foreignColumns: [directusFiles.id],
			name: "publishing_page_image_foreign"
		}).onDelete("set null"),
]);

export const developmentPage = pgTable("development_page", {
	id: serial().primaryKey().notNull(),
	userUpdated: uuid("user_updated"),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }),
	image: uuid(),
	description: text(),
	body: text(),
}, (table) => [
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "development_page_user_updated_foreign"
		}),
	foreignKey({
			columns: [table.image],
			foreignColumns: [directusFiles.id],
			name: "development_page_image_foreign"
		}).onDelete("set null"),
]);

export const settings = pgTable("settings", {
	id: serial().primaryKey().notNull(),
	userUpdated: uuid("user_updated"),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }),
	privacyPolicy: text("privacy_policy"),
	termsOfService: text("terms_of_service"),
	publishingSupportEmail: varchar("publishing_support_email", { length: 255 }),
	developmentSupportEmail: varchar("development_support_email", { length: 255 }).default(sql`NULL`),
	careerSupportEmail: varchar("career_support_email", { length: 255 }).default(sql`NULL`),
}, (table) => [
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "settings_user_updated_foreign"
		}),
]);

export const gamesTeam1 = pgTable("games_team_1", {
	id: serial().primaryKey().notNull(),
	gamesId: uuid("games_id"),
	teamId: uuid("team_id"),
}, (table) => [
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [team.id],
			name: "games_team_1_team_id_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.gamesId],
			foreignColumns: [games.id],
			name: "games_team_1_games_id_foreign"
		}).onDelete("set null"),
]);

export const settingsGames1 = pgTable("settings_games_1", {
	id: serial().primaryKey().notNull(),
	settingsId: integer("settings_id"),
	gamesId: uuid("games_id"),
}, (table) => [
	foreignKey({
			columns: [table.gamesId],
			foreignColumns: [games.id],
			name: "settings_games_1_games_id_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.settingsId],
			foreignColumns: [settings.id],
			name: "settings_games_1_settings_id_foreign"
		}).onDelete("set null"),
]);

export const formCareer = pgTable("form_career", {
	id: serial().primaryKey().notNull(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }),
	fullName: varchar("full_name", { length: 255 }),
	contact: varchar({ length: 255 }),
	portfolioLink: varchar("portfolio_link", { length: 255 }),
	coverLetter: text("cover_letter"),
});

export const formDevelopmentOrderFiles = pgTable("form_development_order_files", {
	id: serial().primaryKey().notNull(),
	formDevelopmentOrderId: integer("form_development_order_id"),
	directusFilesId: uuid("directus_files_id"),
}, (table) => [
	foreignKey({
			columns: [table.directusFilesId],
			foreignColumns: [directusFiles.id],
			name: "form_development_order_files_directus_files_id_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.formDevelopmentOrderId],
			foreignColumns: [formDevelopmentOrder.id],
			name: "form_development_order_files_form_developme__ab5abe8_foreign"
		}).onDelete("set null"),
]);

export const formDevelopmentOrder = pgTable("form_development_order", {
	id: serial().primaryKey().notNull(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }),
	fullName: varchar("full_name", { length: 255 }),
	companyName: varchar("company_name", { length: 255 }),
	contact: varchar({ length: 255 }),
	description: text(),
});

export const formPublishing = pgTable("form_publishing", {
	id: serial().primaryKey().notNull(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }),
	fullName: varchar("full_name", { length: 255 }),
	contact: varchar({ length: 255 }),
	buildLink: varchar("build_link", { length: 255 }),
	description: text(),
});
export const geographyColumns = pgView("geography_columns", {	// TODO: failed to parse database type 'name'
	fTableCatalog: varchar("f_table_catalog", { length: 63 }),
	fTableSchema: varchar("f_table_schema", { length: 63 }),
	fTableName: varchar("f_table_name", { length: 63 }),
	fGeographyColumn: varchar("f_geography_column", { length: 63 }),
	coordDimension: integer("coord_dimension"),
	srid: integer(),
	type: text(),
}).as(sql`SELECT current_database() AS f_table_catalog, n.nspname AS f_table_schema, c.relname AS f_table_name, a.attname AS f_geography_column, postgis_typmod_dims(a.atttypmod) AS coord_dimension, postgis_typmod_srid(a.atttypmod) AS srid, postgis_typmod_type(a.atttypmod) AS type FROM pg_class c, pg_attribute a, pg_type t, pg_namespace n WHERE t.typname = 'geography'::name AND a.attisdropped = false AND a.atttypid = t.oid AND a.attrelid = c.oid AND c.relnamespace = n.oid AND (c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"])) AND NOT pg_is_other_temp_schema(c.relnamespace) AND has_table_privilege(c.oid, 'SELECT'::text)`);

export const geometryColumns = pgView("geometry_columns", {	fTableCatalog: varchar("f_table_catalog", { length: 256 }),
	fTableSchema: varchar("f_table_schema", { length: 63 }),
	fTableName: varchar("f_table_name", { length: 63 }),
	fGeometryColumn: varchar("f_geometry_column", { length: 63 }),
	coordDimension: integer("coord_dimension"),
	srid: integer(),
	type: varchar({ length: 30 }),
}).as(sql`SELECT current_database()::character varying(256) AS f_table_catalog, n.nspname AS f_table_schema, c.relname AS f_table_name, a.attname AS f_geometry_column, COALESCE(postgis_typmod_dims(a.atttypmod), sn.ndims, 2) AS coord_dimension, COALESCE(NULLIF(postgis_typmod_srid(a.atttypmod), 0), sr.srid, 0) AS srid, replace(replace(COALESCE(NULLIF(upper(postgis_typmod_type(a.atttypmod)), 'GEOMETRY'::text), st.type, 'GEOMETRY'::text), 'ZM'::text, ''::text), 'Z'::text, ''::text)::character varying(30) AS type FROM pg_class c JOIN pg_attribute a ON a.attrelid = c.oid AND NOT a.attisdropped JOIN pg_namespace n ON c.relnamespace = n.oid JOIN pg_type t ON a.atttypid = t.oid LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(split_part(s.consrc, ''''::text, 2), ')'::text, ''::text) AS type FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%geometrytype(% = %'::text) st ON st.connamespace = n.oid AND st.conrelid = c.oid AND (a.attnum = ANY (st.conkey)) LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text)::integer AS ndims FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%ndims(% = %'::text) sn ON sn.connamespace = n.oid AND sn.conrelid = c.oid AND (a.attnum = ANY (sn.conkey)) LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text), '('::text, ''::text)::integer AS srid FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%srid(% = %'::text) sr ON sr.connamespace = n.oid AND sr.conrelid = c.oid AND (a.attnum = ANY (sr.conkey)) WHERE (c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"])) AND NOT c.relname = 'raster_columns'::name AND t.typname = 'geometry'::name AND NOT pg_is_other_temp_schema(c.relnamespace) AND has_table_privilege(c.oid, 'SELECT'::text)`);