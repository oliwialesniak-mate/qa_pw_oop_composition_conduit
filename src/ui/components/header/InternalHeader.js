// src/ui/components/header/InternalHeader.js
import { BaseComponent } from '../BaseComponent';
import { expect } from '../../../common/helpers/pw';

export class InternalHeader extends BaseComponent {
  constructor(page, userId = 0) {
    super(page, userId);

    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: /settings/i });
  }

  async clickNewArticleLink() {
    await this.step(`Click 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertUserIsLoggedIn() {
    await this.step(`Assert user is logged in`, async () => {
      await expect(this.settingsLink).toBeVisible();
    });
  }
}
