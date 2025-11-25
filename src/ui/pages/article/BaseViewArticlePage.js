// src/ui/pages/article/BaseViewArticlePage.js
import { BaseComponent } from '../../components/BaseComponent';
import { ArticleContentBlock } from '../../components/ArticleContentBlock';

export class BaseViewArticlePage extends BaseComponent {
  constructor(page, userId = 0) {
    super(page, userId);

    // Common article content block
    this.content = new ArticleContentBlock(page);
  }

  /**
   * Open article by URL
   * @param {string} url
   */
  async open(url) {
    await this.page.goto(url);
  }
}
