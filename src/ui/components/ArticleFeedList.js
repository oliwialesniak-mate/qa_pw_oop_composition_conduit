// src/ui/components/ArticleFeedList.js
import { BaseComponent } from './BaseComponent';
import { ArticleFeedItem } from './ArticleFeedItem';

export class ArticleFeedList extends BaseComponent {
  constructor(page, userId = 0) {
    super(page, userId);
    this.items = page.locator('.article-preview, .feed .article-preview');
  }

  async waitForAny() {
    await this.items.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  getArticleFeedItem(title) {
    const root = this.items.filter({ hasText: title }).first();
    return new ArticleFeedItem(this.page, root, this.userId);
  }
}
