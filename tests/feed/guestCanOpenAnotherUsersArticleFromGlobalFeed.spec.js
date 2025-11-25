import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { ExternalViewArticlePage } from '../../src/ui/pages/article/ExternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test('Guest can open another user’s article from Global Feed', async ({
  pages,
  articleWithoutTags,
}) => {
  const guestPage = pages[1];

  await guestPage.goto('/');

  const item = guestPage.locator('.article-preview')
    .filter({ hasText: articleWithoutTags.title })
    .first();

  await item.locator('.preview-link').click();

  const viewPage = new ExternalViewArticlePage(guestPage);

  await viewPage.content.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewPage.content.assertArticleBodyIsVisible(articleWithoutTags.text);
});
