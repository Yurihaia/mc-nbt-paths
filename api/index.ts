import { join } from "path";

// This exposes the real directory of the nbt docs to allow use in mcfunction-langserver
// as parcel bludgeons require.resolve
export const root = join(__dirname, "..", "root.json");
