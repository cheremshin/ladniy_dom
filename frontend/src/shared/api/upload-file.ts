const API_BASE = (process.env.GRAPHQL_API ?? 'http://localhost:3000/graphql').replace(/\/graphql\/?$/, '');

export async function uploadFile(
    file: File,
    entityType?: string,
    entityId?: string,
): Promise<string> {
    const url = new URL('/files/upload', API_BASE);
    if (entityType) url.searchParams.set('entityType', entityType);
    if (entityId) url.searchParams.set('entityId', entityId);

    const formData = new FormData();
    formData.set('file', file);

    const res = await fetch(url.toString(), {
        method: 'POST',
        body: formData,
        credentials: 'include',
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Upload failed: ${res.status}`);
    }

    const data = (await res.json()) as { path: string };
    return data.path;
}
