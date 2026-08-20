export function detailedError(error: any): void {
    console.error("Error name:", error.name);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error meta:", error.meta);
    console.error("Error cause:", error.cause);

    console.dir(error, { depth: null });
}