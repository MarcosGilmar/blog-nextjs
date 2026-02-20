import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files"

const Author = defineNestedType(() => ({
  name: 'Author',
  fields: {
    name: {
      type: 'string',
      required: true
    },
    avatar: {
      type: 'string',
      required: true
    },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string' as const, required: true },
    date: { type: 'date' as const, required: true },
    description: { type: 'string' as const, required: true },
    image: { type: 'string' as const, required: true },
    author: {
      type: 'nested',
      of: Author,
      required: true
    },
  },
  computedFields: {
    slug: {
        type: 'string' as const,
        resolve: (doc) => doc._raw.sourceFileName.replace('.md', '')
    }
    },
}))

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] })