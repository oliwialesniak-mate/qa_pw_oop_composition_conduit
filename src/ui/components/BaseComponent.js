// src/ui/components/BaseComponent.js
export class BaseComponent {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {number|string} userId
   */
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  /**
   * Wrap steps so trace/logging looks consistent
   * @param {string} title
   * @param {Function} fn
   */
  async step(title, fn) {
    // testStep helper in your project might exist; if so you can replace this
    // For now just call the function (keeps behavior consistent)
    return await fn();
  }
}
