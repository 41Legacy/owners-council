// Server-only access to this site's Cloudflare bindings and secrets.
// Bindings are present ONLY if opted into via app.manifest.json; secrets are
// present only when set in the website settings. Guard before use.
import { env } from "cloudflare:workers";
import type {
  D1Database,
  DurableObjectNamespace,
  KVNamespace,
  R2Bucket,
} from "@cloudflare/workers-types";

type AppEnv = {
  DB?: D1Database;
  STORAGE?: R2Bucket;
  KV?: KVNamespace;
  CONTAINER?: DurableObjectNamespace;
  HF_ENV?: string;
  APP_SLUG?: string;
  /** Optional: a webhook (GoHighLevel, Zapier, Make) that receives every submission as JSON. */
  LEAD_WEBHOOK_URL?: string;
  /** GoHighLevel Private Integration token (41 Legacy sub-account). */
  GHL_PRIVATE_TOKEN?: string;
  /** Required to open /admin and read submissions. */
  ADMIN_KEY?: string;
};

export function bindings(): AppEnv {
  return env as unknown as AppEnv;
}
