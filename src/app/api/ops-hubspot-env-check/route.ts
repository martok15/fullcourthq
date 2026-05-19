import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TARGET_KEYS = [
  "HUBSPOT_PRIVATE_APP_TOKEN",
  "HUBSPOT_DEAL_PIPELINE",
  "HUBSPOT_DEAL_STAGE",
  "NEXT_PUBLIC_SITE_URL",
];

export async function GET() {
  const cloudflare = await getCloudflareEnvSnapshot();

  return NextResponse.json(
    {
      ok: true,
      checkedAt: new Date().toISOString(),
      processEnv: summarizeEnv(process.env),
      cloudflareEnv: cloudflare,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

function summarizeEnv(source: NodeJS.ProcessEnv | Record<string, unknown> | undefined) {
  return Object.fromEntries(
    TARGET_KEYS.map((key) => {
      const value = source?.[key];

      return [
        key,
        {
          present: typeof value === "string" ? value.trim().length > 0 : value != null,
          type: typeof value,
        },
      ];
    }),
  );
}

async function getCloudflareEnvSnapshot() {
  try {
    const importCloudflareWorkers = new Function("specifier", "return import(specifier)") as (
      specifier: string,
    ) => Promise<{ env?: Record<string, unknown> }>;
    const cloudflareWorkers = await importCloudflareWorkers("cloudflare:workers");

    return {
      available: true,
      ...summarizeEnv(cloudflareWorkers.env),
    };
  } catch (error) {
    return {
      available: false,
      error: error instanceof Error ? error.message : "Unknown Cloudflare env import error",
    };
  }
}
