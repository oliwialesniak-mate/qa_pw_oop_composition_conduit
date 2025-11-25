import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { expect } from '@playwright/test';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test('Guest can view another user’s article in Global Feed', async ({
  pages,
  articleWithoutTags,
}) => {
  const guestPage = pages[1];

  await guestPage.goto('/');

  const item = guestPage.locator('.article-preview')
    .filter({ hasText: articleWithoutTags.title })
    .first();

  // FIXED: proper title selector
  await item.locator('h1').waitFor();

  await expect(item.locator('h1')).toContainText(articleWithoutTags.title);
});
