import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithoutTags);
});

test('Logged-in user can view own article in Global Feed', async ({
  internalHomePage,
  articleWithoutTags,
}) => {
  await internalHomePage.open();
  await internalHomePage.globalFeed.open();

  const feedItem = internalHomePage.globalFeed.getArticleFeedItem(
    articleWithoutTags.title,
  );

  await feedItem.assertTitleVisible(articleWithoutTags.title);
  await feedItem.openArticle();

  await internalHomePage.header.assertUserIsLoggedIn();
});
