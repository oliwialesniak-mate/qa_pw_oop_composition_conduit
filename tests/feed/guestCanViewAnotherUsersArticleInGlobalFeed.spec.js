import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test('Guest can view another user’s article in Global Feed', async ({
  externalHomePage,
  articleWithoutTags,
}) => {
  await externalHomePage.open();
  await externalHomePage.globalFeed.open();

  const feedItem = externalHomePage.globalFeed.getArticleFeedItem(
    articleWithoutTags.title,
  );

  await feedItem.assertTitleVisible(articleWithoutTags.title);
});
