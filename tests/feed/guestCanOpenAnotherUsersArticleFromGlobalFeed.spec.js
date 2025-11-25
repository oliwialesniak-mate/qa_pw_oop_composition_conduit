import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { ExternalViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test('Guest can open another user’s article from Global Feed', async ({
  pages,
  articleWithoutTags,
  externalHomePage,
}) => {
  await externalHomePage.open();
  await externalHomePage.globalFeed.open();

  const feedItem = externalHomePage.globalFeed.getArticleFeedItem(
    articleWithoutTags.title,
  );

  await feedItem.openArticle();

  const viewPage = new ExternalViewArticlePage(pages[0]);

  await viewPage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewPage.assertArticleTextIsVisible(articleWithoutTags.text);
});
