export function mapImageUrlValueToRealUrl(imageUrl: string): string {
    const apiBase = (process.env.GRAPHQL_API ?? 'http://localhost:3000/graphql').replace(/\/graphql\/?$/, '');
    return `${apiBase}/files/by-url?url=${encodeURIComponent(imageUrl)}`;
}
