import { BaseComponent } from './BaseComponent';

export class BaseArticleContentBlock extends BaseComponent {
  constructor(page, userId) {
    super(page, userId);

    this.root = page.locator('.article-page');
    this.title = this.root.locator('h1');
    this.body = this.root.locator('.article-content');

    // FIXED tag selector
    this.tags = this.root.locator('.tag-list .tag-pill');
  }

  async getTitle() {
    return this.title.innerText();
  }

  async getBody() {
    return this.body.innerText();
  }

  async hasTag(tag) {
    return (await this.tags.filter({ hasText: tag }).count()) > 0;
  }
}
