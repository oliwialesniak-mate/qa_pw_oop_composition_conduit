// src/ui/components/ArticleContentBlock.js
import { BaseArticleContentBlock } from './BaseArticleContentBlock';

export class ArticleContentBlock extends BaseArticleContentBlock {
  constructor(page, userId = 0) {
    super(page, userId);
    // If any article-specific locators differ, you can override them here.
  }
}
