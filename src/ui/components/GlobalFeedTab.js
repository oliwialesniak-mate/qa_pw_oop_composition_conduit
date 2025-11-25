import { BaseComponent } from './BaseComponent';
import { ArticleFeedList } from './ArticleFeedList';
import { expect } from '../../common/helpers/pw';

export class GlobalFeedTab extends BaseComponent {
  #globalFeedLink;

  constructor(page, userId = 0) {
    super(page, userId);

    this.#globalFeedLink = page.getByText('Global Feed');
    this.feedList = new ArticleFeedList(page, userId);
  }

  async open() {
    await this.step(`Open 'Global Feed' tab`, async () => {
      await this.#globalFeedLink.click();
      await this.feedList.waitForAny();
    });
  }

  async assertTabLinkVisible() {
    await this.step(`Assert 'Global Feed' link is visible`, async () => {
      await expect(this.#globalFeedLink).toBeVisible();
    });
  }

  getArticleFeedItem(title) {
    return this.feedList.getArticleFeedItem(title);
  }
}
