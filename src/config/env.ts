import "dotenv/config";
import z from "zod";

const timeUnits = {
	m: 60,
	h: 3600,
	d: 86400,
};

const EnvConfigSchema = z.object({
	SECRET: z.string(),
	EXPIRES_IN: z.string().refine((val) => /^[0-9]+[mhd]$/.test(val), {
		message: "EXPIRES_IN must be a valid time format (e.g., '10m', '2h', '1d')",
	}),
	PORT: z.coerce.number().min(1024).max(65535).default(9000),
	NODE_ENV: z.enum(["dev", "prod"]).default("dev"), // NODE_ENV=dev or NODE_ENV=prod
});

export type EnvConfigSchema = z.infer<typeof EnvConfigSchema>;
const envConfigSchema: EnvConfigSchema = EnvConfigSchema.parse(process.env);

const expiresInValue = envConfigSchema.EXPIRES_IN;
const expiresInUnit = expiresInValue.slice(-1) as keyof typeof timeUnits;
const expiresInNumber = parseInt(expiresInValue.slice(0, -1), 10);
const expiresInSeconds = expiresInNumber * timeUnits[expiresInUnit];

export const appConfig = {
	secret: envConfigSchema.SECRET,
	expiresIn: expiresInSeconds,
	port: envConfigSchema.PORT,
	env: envConfigSchema.NODE_ENV,
};
