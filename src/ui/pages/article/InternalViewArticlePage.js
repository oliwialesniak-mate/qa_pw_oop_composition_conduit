import { BaseViewArticlePage } from './BaseViewArticlePage';

export class InternalViewArticlePage extends BaseViewArticlePage {
  constructor(page, userId = 1) {
    super(page, userId);
  }
}
