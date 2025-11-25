export class BaseArticleContentBlock {
  constructor(page) {
    this.page = page;
    this.root = page.locator('.article-page');

    this.title = this.root.locator('h1');
    this.body = this.root.locator('div.article-content');
    this.tags = this.root.locator('.tag-list a');
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
