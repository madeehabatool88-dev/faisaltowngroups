export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];
const storageKey = "ft:attribution:v2";
type Attribution = Record<string, string>;
type StorageAccess = () => Pick<Storage, "getItem" | "setItem" | "removeItem">;

// A tagged landing replaces the whole record. Untagged internal navigation reuses it.
// Never combine old click IDs with a new campaign, including legacy per-key storage.
export function captureAttribution(search: string, accessStorage: StorageAccess): Attribution {
  const current: Attribution = {};
  const query = new URLSearchParams(search);
  for (const key of attributionKeys) {
    const value = query.get(key);
    if (value) current[key] = value;
  }
  let saved: Attribution = {};
  try {
    const storage = accessStorage();
    for (const key of attributionKeys) storage.removeItem(`ft:${key}`);
    if (Object.keys(current).length) {
      storage.removeItem(storageKey);
      storage.setItem(storageKey, JSON.stringify(current));
    } else {
      const record = JSON.parse(storage.getItem(storageKey) || "{}");
      for (const key of attributionKeys) {
        if (typeof record?.[key] === "string" && record[key]) saved[key] = record[key];
      }
    }
  } catch {
    // URL attribution remains available even when storage access or writes fail.
  }
  return Object.keys(current).length ? current : saved;
}

export function campaignWhatsAppUrl(href: string, campaign = ""): string {
  const url = new URL(href);
  const original = (url.searchParams.get("text") || "")
    .replace(/\nCampaign reference:[^\r\n]*/g, "");
  const clean = campaign.replace(/[^a-zA-Z0-9 _-]/g, "").trim().slice(0, 60);
  url.searchParams.set("text", clean ? `${original}\nCampaign reference: ${clean}` : original);
  return url.toString();
}
