import { readdir, readFile } from "node:fs/promises";
import { CheckFolderIntegrity } from "./writer.cache";

// Checks if article is present in cache
export async function CacheCheck(key: string) {
    let fileFound: boolean = false;
    const cachePath: string = "db_cache"

    const files = await readdir(cachePath);
    for (const file of files) {
        let filename = file.replace(".json", "")
        if(filename == key) {
            fileFound = true;
            break;
        }
    }
    return fileFound;
}

// Function that reads the article from cache
export async function ReadFromCache(key: string) {
    // read
    const cachePath: string = `db_cache/${key}.json`;
    let articleInCache = await readFile(cachePath, 'utf-8');
    let parsedArticle = JSON.parse(articleInCache);

    return parsedArticle;
}