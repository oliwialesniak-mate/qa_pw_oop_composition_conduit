import { BaseComponent } from './BaseComponent';

export class PopularTags extends BaseComponent {
  constructor(page, userId = 0) {
    super(page, userId);

    this.container = page.locator('.tag-list');
  }

  async clickTag(tagName) {
    await this.step(`Click tag '${tagName}' in Popular Tags`, async () => {
      await this.container.getByText(tagName).click();
    });
  }
}
