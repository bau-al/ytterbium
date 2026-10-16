import { Article } from '../api/article.api'
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

export async function CheckFolderIntegrity() {
    if (!existsSync('db_cache')) {
        mkdir('db_cache');
    }
}

export async function WriteToCache(data: Article, key: string) {
    const path: string = `db_cache/${key}.json`;
    const toCache: Article = {
        id: data.id,
        key: data.key,
        title: data.title,
        thumbnail: data.thumbnail,
        extract: data.extract
    }
    writeFile(path, JSON.stringify(toCache));
}