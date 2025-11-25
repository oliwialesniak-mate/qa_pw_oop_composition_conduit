// src/ui/pages/article/ExternalViewArticlePage.js
import { BaseViewArticlePage } from './BaseViewArticlePage';

export class ExternalViewArticlePage extends BaseViewArticlePage {
  constructor(page) {
    super(page, 0); // guest user has userId = 0
  }

  // Guest-specific methods can be added if needed
}
