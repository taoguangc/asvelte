import { type CollectionEntry } from 'astro:content'
import { slugify } from './common'

export const sortItemsByDateDesc = (a: { data: { publishDate: Date } }, b: { data: { publishDate: Date } }) => {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime()
}

export function getAllTags(posts: CollectionEntry<'posts'>[]) {
  const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))]
  return tags
    .map((tag) => {
      return {
        name: tag,
        id: slugify(tag)
      }
    })
    .filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos
    })
}

export function getPostsByTag(posts: CollectionEntry<'posts'>[], tagId: string) {
  const filteredPosts: CollectionEntry<'posts'>[] = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId))
  return filteredPosts
}
