// tests/articles/createArticle/createArticleWithTags.spec.js
import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const cases = [
  { tagsNumber: 1, name: 'one tag' },
  { tagsNumber: 2, name: 'two tags' },
  { tagsNumber: 10, name: 'ten tags' },
];

cases.forEach(({ tagsNumber, name }) => {
  test.describe(`Create an article with tags (${name})`, () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Create an article with ${name}`, async ({
      internalHomePage,
      createArticlePage,
      viewArticlePage, // InternalViewArticlePage fixture
      logger,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await internalHomePage.header.clickNewArticleLink();

      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.text ?? article.body);
      await createArticlePage.fillTagsField(article.tags);
      await createArticlePage.clickPublishArticleButton();

      // check title/body
      await viewArticlePage.content.assertTitleContains(article.title);
      await viewArticlePage.content.assertBodyContains(article.text ?? article.body);

      // check tags
      for (const tag of article.tags) {
        const present = await viewArticlePage.content.hasTag(tag);
        if (!present) throw new Error(`Tag "${tag}" not found in article`);
      }
    });
  });
});
