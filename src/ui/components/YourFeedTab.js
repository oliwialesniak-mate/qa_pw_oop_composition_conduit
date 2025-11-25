// src/ui/components/YourFeedTab.js
import { BaseComponent } from './BaseComponent.js';
import { ArticleFeedList } from './ArticleFeedList.js';
import { expect } from '../../common/helpers/pw';

export class YourFeedTab extends BaseComponent {
  #yourFeedLink;

  constructor(page, userId = 0) {
    super(page, userId);

    this.#yourFeedLink = page.getByText('Your Feed');
    this.feedList = new ArticleFeedList(page, userId);
  }

  async open() {
    await this.step(`Open 'Your Feed' tab`, async () => {
      await this.#yourFeedLink.click();
      await this.feedList.waitForAny();
    });
  }

  async assertTabLinkVisible() {
    await this.step(`Assert 'Your Feed' link is visible`, async () => {
      await expect(this.#yourFeedLink).toBeVisible();
    });
  }
}
