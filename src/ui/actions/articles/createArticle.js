// src/ui/actions/articles/createArticle.js
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { InternalViewArticlePage } from '../../pages/article/InternalViewArticlePage';
import { ExternalViewArticlePage } from '../../pages/article/ExternalViewArticlePage';
import { testStep } from '../../../../src/common/helpers/pw'; // adapt path to your testStep helper

/**
 * Create article; for userId > 0 we consider internal (logged-in) flow.
 * Returns the view page instance (InternalViewArticlePage or ExternalViewArticlePage)
 */
export async function createArticle(page, article, userId = 0) {
  return await testStep(`Create article "${article.title}"`, async () => {
    const createArticlePage = new CreateArticlePage(page, userId);
    await createArticlePage.open();
    await createArticlePage.submitCreateArticleForm(article);

    // After submitting the article, the app typically navigates to the article page.
    // Determine which view page to return based on userId
    let viewPage;
    if (userId && userId !== 0) {
      viewPage = new InternalViewArticlePage(page, userId);
    } else {
      viewPage = new ExternalViewArticlePage(page);
    }

    // Wait title visible
    await viewPage.content.title.waitFor({ state: 'visible', timeout: 10000 });

    // Validate basic title
    await viewPage.content.assertTitleContains(article.title);

    return viewPage;
  });
}
