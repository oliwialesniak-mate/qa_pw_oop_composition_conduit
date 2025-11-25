// src/ui/components/ArticleFeedItem.js
import { BaseComponent } from './BaseComponent';
import { expect } from '../../common/helpers/pw';

export class ArticleFeedItem extends BaseComponent {
  constructor(page, root, userId = 0) {
    super(page, userId);
    this.root = root;

    this.title = root.locator('.preview-link h1');
    this.openLink = root.locator('.preview-link');
  }

  /**
   * Assert title is visible.
   * Uses toContainText to avoid exact-match failures.
   * @param {string} title
   */
  async assertTitleVisible(title) {
    await this.step(`Assert feed item title contains "${title}"`, async () => {
      await expect(this.title).toContainText(title);
    });
  }

  /**
   * Clicks the article link after waiting for visibility
   */
  async openArticle() {
    await this.step(`Open article from feed item`, async () => {
      await this.openLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.openLink.click();
    });
  }
}
