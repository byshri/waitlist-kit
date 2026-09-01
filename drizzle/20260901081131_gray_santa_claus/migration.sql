CREATE TABLE `subscribers` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`email` text NOT NULL UNIQUE,
	`email_verified` integer,
	`unsubscribed` integer,
	`confirmation_token` text UNIQUE,
	`traffic_source` text,
	`device` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT "email_format_check" CHECK("email" GLOB '*@*.*')
);
