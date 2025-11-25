// tests/articles/createArticle/createArticleWithRequiredFields.spec.js
import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let article;

test.beforeEach(async ({ page, user, logger }) => {
  article = generateNewArticleData(logger);
  await signUpUser(page, user);
});

test('Create an article with required fields', async ({
  internalHomePage,
  createArticlePage,
  viewArticlePage, // fixture returns InternalViewArticlePage for logged-in flows
}) => {
  await internalHomePage.header.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text ?? article.body);
  await createArticlePage.clickPublishArticleButton();

  // The viewArticlePage fixture is InternalViewArticlePage — assert via content block
  await viewArticlePage.content.assertTitleContains(article.title);
  await viewArticlePage.content.assertBodyContains(article.text ?? article.body);
});
