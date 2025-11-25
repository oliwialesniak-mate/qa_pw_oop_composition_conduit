// tests/feed/loggedInUserCanSeeOwnArticleInGlobalFeed.spec.js
import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { InternalViewArticlePage } from '../../src/ui/pages/article/InternalViewArticlePage';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithoutTags, user.id ?? 1);
});

test('Logged-in user can view own article in Global Feed', async ({
  internalHomePage,
  articleWithoutTags,
  page,
  user,
}) => {
  await internalHomePage.open();
  await internalHomePage.globalFeed.open();

  const feedItem = internalHomePage.globalFeed.getArticleFeedItem(articleWithoutTags.title);
  await feedItem.assertTitleVisible(articleWithoutTags.title);
  await feedItem.openArticle();

  const viewPage = new InternalViewArticlePage(page, user.id ?? 1);
  await viewPage.content.assertTitleContains(articleWithoutTags.title);
  await viewPage.content.assertBodyContains(articleWithoutTags.text ?? articleWithoutTags.body);
  await internalHomePage.header.assertUserIsLoggedIn();
});
