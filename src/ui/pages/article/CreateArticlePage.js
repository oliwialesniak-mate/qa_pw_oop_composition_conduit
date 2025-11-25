import { BaseComponent } from '../../components/BaseComponent';
import { expect } from '../../../common/helpers/pw';

export class CreateArticlePage extends BaseComponent {
  constructor(page, userId = 1) {
    super(page, userId);

    this.titleInput = page.locator('input[placeholder="Article Title"]');
    this.descriptionInput = page.locator(
      'input[placeholder="What\'s this article about?"]',
    );
    this.bodyInput = page.locator('textarea[placeholder="Write your article (in markdown)"]');
    this.tagsInput = page.locator('input[placeholder="Enter tags"]');
    this.publishButton = page.locator('button', { hasText: 'Publish Article' });

    // FIXED strict mode selector
    this.errorMessage = page.locator('.error-messages li');
  }

  async fillTitle(title) {
    await this.titleInput.fill(title);
  }

  async fillDescription(description) {
    await this.descriptionInput.fill(description);
  }

  async fillBody(body) {
    await this.bodyInput.fill(body);
  }

  async addTag(tag) {
    await this.tagsInput.fill(tag);
    await this.tagsInput.press('Enter');
  }

  async clickPublishArticleButton() {
    await this.publishButton.click();
  }

  async assertErrorMessageContainsText(text) {
    // FIXED: strict mode — use .first(), not all elements
    await expect(this.errorMessage.first()).toContainText(text);
  }
}
