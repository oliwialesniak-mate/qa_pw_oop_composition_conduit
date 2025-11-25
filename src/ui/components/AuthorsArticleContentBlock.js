// src/ui/components/AuthorsArticleContentBlock.js
import { BaseArticleContentBlock } from './BaseArticleContentBlock.js';

export class AuthorsArticleContentBlock extends BaseArticleContentBlock {
  constructor(page, userId = 0) {
    super(page, userId);

    this.editButton = page.getByRole('button', { name: 'Edit Article' });
    this.deleteButton = page.getByRole('button', { name: 'Delete Article' });
  }

  async edit() {
    await this.step('Click Edit Article', async () => {
      await this.editButton.click();
    });
  }

  async delete() {
    await this.step('Click Delete Article', async () => {
      await this.deleteButton.click();
    });
  }

  async canEdit() {
    return (await this.editButton.count()) > 0;
  }

  async canDelete() {
    return (await this.deleteButton.count()) > 0;
  }
}
