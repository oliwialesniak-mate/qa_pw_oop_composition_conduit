// tests/articles/viewArticle/viewArticleCreatedByAnotherUser.spec.js
import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/ExternalViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  // Sign up first user and create article
  await signUpUser(pages[0], users[0], 1);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test('View an article created by another user', async ({
  pages,
  articleWithoutTags,
  users,
}) => {
  // open as guest (second context)
  const guestPage = pages[1];
  const viewPage = new ExternalViewArticlePage(guestPage);

  await viewPage.open(articleWithoutTags.url);

  await viewPage.content.assertTitleContains(articleWithoutTags.title);
  await viewPage.content.assertBodyContains(articleWithoutTags.text ?? articleWithoutTags.body);
  await viewPage.content.assertAuthorIsVisible(users[0].username);
});
