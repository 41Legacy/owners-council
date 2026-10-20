import { createFileRoute } from "@tanstack/react-router";

import { bindings } from "@/lib/bindings.server";
import { GHL } from "@/lib/ghl.server";

// Temporary diagnostics: reports presence and status codes only, never secret values.
export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const { DB, GHL_PRIVATE_TOKEN, ADMIN_KEY } = bindings();
        const token = GHL_PRIVATE_TOKEN ?? "";
        let ghlStatus: number | string = "no token";
        let ghlMessage = "";
        if (token) {
          try {
            const res = await fetch(
              `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${GHL.locationId}`,
              { headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", Accept: "application/json" } },
            );
            ghlStatus = res.status;
            if (!res.ok) ghlMessage = (await res.text()).slice(0, 200);
          } catch (e) {
            ghlStatus = "fetch failed";
            ghlMessage = e instanceof Error ? e.message : String(e);
          }
        }
        return Response.json(
          {
            db: Boolean(DB),
            adminKeySet: Boolean(ADMIN_KEY),
            ghlTokenSet: Boolean(token),
            ghlTokenPrefix: token.slice(0, 4),
            ghlTokenLength: token.length,
            ghlTokenHasWhitespace: /\s/.test(token),
            ghlStatus,
            ghlMessage,
          },
          { headers: { "cache-control": "no-store", "x-robots-tag": "noindex" } },
        );
      },
    },
  },
});
