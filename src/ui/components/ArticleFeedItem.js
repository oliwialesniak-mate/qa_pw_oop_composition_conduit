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

  async assertTitleVisible(title) {
    await this.step(`Assert feed item title "${title}" is visible`, async () => {
      await expect(this.title).toHaveText(title);
    });
  }

  async openArticle() {
    await this.step(`Open article from feed item`, async () => {
      await this.openLink.click();
    });
  }
}
