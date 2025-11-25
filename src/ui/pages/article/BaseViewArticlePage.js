import { BaseComponent } from '../../components/BaseComponent';
import { ArticleContentBlock } from '../../components/ArticleContentBlock';

export class BaseViewArticlePage extends BaseComponent {
  constructor(page, userId = 0) {
    super(page, userId);

    this.content = new ArticleContentBlock(page, userId);
  }

  async open(slugOrUrl) {
    // FIX: accept slug OR full URL
    const url = slugOrUrl.startsWith('/')
      ? slugOrUrl
      : `/article/${slugOrUrl}`;

    await this.page.goto(url);

    // ensure article content is visible
    await this.content.title.waitFor({ state: 'visible' });
  }
}
