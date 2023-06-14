import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionAPI } from 'notion-client';

export const propertyTable = {
  Public: 'Public',
  Published: 'Published',
  Tags: 'Tags',
};

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface DatabaseOption {
  databaseId: string;
  options?: string[];
}

export const getDatabaseItems = async ({ databaseId, options = [] }: DatabaseOption) => {
  const tagFilters = options.map(tagName => ({
    property: propertyTable.Tags,
    multi_select: {
      contains: tagName,
    },
  }));

  const databaseItems = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: propertyTable.Public,
          checkbox: {
            equals: true,
          },
        },
        ...tagFilters,
      ],
    },
    sorts: [
      {
        property: propertyTable.Published,
        direction: 'descending',
      },
    ],
  });

  return databaseItems.results;
};

export const getPageItem = async (pageId: string) => {
  const pageItem = await notion.pages.retrieve({
    page_id: pageId,
  });

  return pageItem;
};

export const getSearchItem = async (query: string) => {
  const searchItem = await notion.search({
    query,
    sort: {
      direction: 'descending',
      timestamp: 'last_edited_time',
    },
    filter: {
      property: 'object',
      value: 'page',
    },
    page_size: 12,
  });

  return searchItem.results as PageObjectResponse[];
};

export const reactNotionApi = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const recordMap = await reactNotionApi.getPage(pageId);

  const signedUrls = recordMap.signed_urls;

  const filteredSignedUrls = Object.keys(signedUrls).reduce<typeof recordMap.signed_urls>(
    (acc, key) => {
      if (signedUrls[key].indexOf('expirationTimestamp') > -1) {
        return acc;
      }

      acc[key] = signedUrls[key];

      return acc;
    },
    {},
  );

  recordMap.signed_urls = filteredSignedUrls;

  return recordMap;
};
