// src/ui/components/TagFeedTab.js
import { BaseComponent } from './BaseComponent';
import { ArticleFeedList } from './ArticleFeedList';

export class TagFeedTab extends BaseComponent {
  constructor(page, userId = 0) {
    super(page, userId);
    this.page = page;

    this.feedList = new ArticleFeedList(page, userId);
  }

  async openTag(tagName) {
    await this.step(`Open tag '${tagName}'`, async () => {
      await this.page.getByRole('link', { name: tagName }).click();
      await this.feedList.waitForAny();
    });
  }

  getArticleFeedItem(title) {
    return this.feedList.getArticleFeedItem(title);
  }
}
