// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { paths, expiresIn } = await req.json();

    if (!Array.isArray(paths) || paths.length === 0) {
      return new Response(JSON.stringify({ error: "paths[] required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ttl = typeof expiresIn === "number" ? expiresIn : 60 * 15;
    const bucket = "sealed";

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1) Validate requested paths against DB for published plates
    // Only allow signing paths that exist in measures.artifacts joined to measures.plates where published=true
    const { data: allowedRows, error: allowErr } = await supabaseAdmin
      .from("measures.artifacts")
      .select("storage_path, plate:measures.plates!inner(published)")
      .in("storage_path", paths)
      .eq("plate.published", true);

    if (allowErr) {
      return new Response(JSON.stringify({ error: allowErr.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const allowed = new Set((allowedRows ?? []).map((r: any) => r.storage_path));

    // 2) Sign only allowed paths
    const signed = await Promise.all(
      paths.map(async (path: string) => {
        if (!allowed.has(path)) {
          return { path, error: "Not allowed (unpublished or unregistered artifact)" };
        }

        const { data, error } = await supabaseAdmin.storage
          .from(bucket)
          .createSignedUrl(path, ttl);

        if (error) return { path, error: error.message };
        return { path, url: data.signedUrl };
      })
    );

    return new Response(JSON.stringify({ bucket, signed }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? "unknown error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});

