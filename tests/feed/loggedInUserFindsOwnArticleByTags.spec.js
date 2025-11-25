import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithOneTag);
});

test('Logged-in user finds own article by tag in Popular Tags', async ({
  internalHomePage,
  articleWithOneTag,
}) => {
  await internalHomePage.open();

  const tag = articleWithOneTag.tags[0];
  await internalHomePage.popularTags.clickTag(tag);

  const tagFeed = internalHomePage.tagFeed;
  const feedItem = tagFeed.getArticleFeedItem(articleWithOneTag.title);

  await feedItem.assertTitleVisible(articleWithOneTag.title);
  await feedItem.openArticle();
});
