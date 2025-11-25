// src/ui/pages/article/BaseViewArticlePage.js

import { BasePage } from '../BasePage';
import { ArticleContentBlock } from '../../components/ArticleContentBlock';

export class BaseViewArticlePage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.content = new ArticleContentBlock(page, userId);
  }
}
