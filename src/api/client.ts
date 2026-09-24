const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

async function readError(response: Response, fallback: string) {
  try {
    const payload = await response.json();
    if (typeof payload?.detail === "string") return payload.detail;
    if (Array.isArray(payload?.detail) && payload.detail[0]?.msg) return payload.detail[0].msg;
  } catch {
    // The server may return a non-JSON error page.
  }
  return fallback;
}

class ApiClient {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) throw new Error(await readError(response, `API GET ${path} failed: ${response.status}`));
    return response.json();
  }

  async post<T>(path: string, data: unknown, headers?: Record<string, string>): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error(await readError(response, `API POST ${path} failed: ${response.status}`));
    return response.json();
  }

  async patch<T>(path: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error(await readError(response, `API PATCH ${path} failed: ${response.status}`));
    return response.json();
  }
}

export const apiClient = new ApiClient();
