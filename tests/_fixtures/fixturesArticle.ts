// tests/_fixtures/fixturesArticle.ts
import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { InternalViewArticlePage } from '../../src/ui/pages/article/InternalViewArticlePage';

export const test = base.extend<{
  articleWithoutTags: any;
  articleWithOneTag: any;
  createArticlePage: CreateArticlePage;
  viewArticlePage: InternalViewArticlePage;
}>({
  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger);
    await use(article);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);
    await use(article);
  },
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);
    await use(createArticlePage);
  },
  viewArticlePage: async ({ page, user }, use) => {
    // default fixture for logged-in tests: InternalViewArticlePage
    const viewArticlePage = new InternalViewArticlePage(page, user?.id ?? 0);
    await use(viewArticlePage);
  },
});
