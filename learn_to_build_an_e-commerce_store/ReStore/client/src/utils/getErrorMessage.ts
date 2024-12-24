export function getErrorMessage(error: unknown): string | null {
    if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = (error as { data: { message?: string } }).data;
        return errorData?.message || null;
    }
    return null;
}