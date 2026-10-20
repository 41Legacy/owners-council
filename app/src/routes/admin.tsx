import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { listSubmissions, type ChapterRow, type InvitationRow } from "@/lib/api/council.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Council submissions" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: Admin,
});

function toCsv(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

function download(name: string, rows: Record<string, unknown>[]) {
  const blob = new Blob([toCsv(rows)], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function Admin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ invitations: InvitationRow[]; chapters: ChapterRow[] } | null>(
    null,
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const key = String(new FormData(event.currentTarget).get("key") ?? "");
    setLoading(true);
    setError("");
    try {
      setData(await listSubmissions({ data: { key } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load submissions");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="oc-admin">
      <h1 className="oc-h2">Council submissions</h1>
      <form className="oc-admin__key" onSubmit={onSubmit}>
        <label htmlFor="key">Admin key</label>
        <input autoComplete="off" id="key" name="key" required type="password" />
        <button className="cta-admin" disabled={loading} type="submit">
          {loading ? "Loading" : "Open"}
        </button>
      </form>
      {error ? (
        <p className="oc-form__error" role="alert">
          {error}
        </p>
      ) : null}
      {data ? (
        <>
          <section className="oc-admin__block">
            <div className="oc-admin__bar">
              <h2>Owner invitation requests ({data.invitations.length})</h2>
              <button className="cta-admin" onClick={() => download("invitation-requests.csv", data.invitations)} type="button">
                Download CSV
              </button>
            </div>
            <div className="oc-admin__scroll">
              <table>
                <thead>
                  <tr>
                    <th>Date</th><th>Name</th><th>Company</th><th>Email</th><th>Phone</th><th>Region</th><th>Revenue</th><th>Referred by</th><th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {data.invitations.map((r) => (
                    <tr key={r.id}>
                      <td>{r.created_at}</td><td>{r.name}</td><td>{r.company}</td><td>{r.email}</td><td>{r.phone}</td><td>{r.region}</td><td>{r.revenue}</td><td>{r.referred_by}</td><td>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="oc-admin__block">
            <div className="oc-admin__bar">
              <h2>Advisor chapter inquiries ({data.chapters.length})</h2>
              <button className="cta-admin" onClick={() => download("chapter-inquiries.csv", data.chapters)} type="button">
                Download CSV
              </button>
            </div>
            <div className="oc-admin__scroll">
              <table>
                <thead>
                  <tr>
                    <th>Date</th><th>Name</th><th>Firm</th><th>Practice</th><th>Email</th><th>Phone</th><th>Region</th><th>Client base</th>
                  </tr>
                </thead>
                <tbody>
                  {data.chapters.map((r) => (
                    <tr key={r.id}>
                      <td>{r.created_at}</td><td>{r.name}</td><td>{r.firm}</td><td>{r.role}</td><td>{r.email}</td><td>{r.phone}</td><td>{r.region}</td><td>{r.clients}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
