// src/ui/components/ArticleContentBlock.js
import { BaseComponent } from './BaseComponent';
import { expect } from '../../common/helpers/pw';

export class ArticleContentBlock extends BaseComponent {
  constructor(page) {
    super(page);

    this.title = page.locator('h1.article-title');
    this.body = page.locator('div.article-body');
    this.author = page.locator('.author');
  }

  async assertArticleTitleIsVisible(title) {
    await this.step(`Assert article title "${title}" is visible`, async () => {
      await expect(this.title).toHaveText(title);
    });
  }

  async assertArticleBodyIsVisible(body) {
    await this.step(`Assert article body is visible`, async () => {
      await expect(this.body).toHaveText(body);
    });
  }

  async assertAuthorIsVisible(authorName) {
    await this.step(`Assert author "${authorName}" is visible`, async () => {
      await expect(this.author).toHaveText(authorName);
    });
  }
}
