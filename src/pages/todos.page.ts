import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export class TodosPage extends BasePage {
  private todoInput = 'input[placeholder*="What needs to be done"]';
  private todoList = '.todo-list';
  private todoItems = '.todo-item';
  private todoItemTitle = '.todo-item-title';
  private todoItemCheckbox = '.todo-item input[type="checkbox"]';
  private todoItemDelete = '.todo-item button.delete';
  private filterAll = 'button.filter-all';
  private filterActive = 'button.filter-active';
  private filterCompleted = 'button.filter-completed';
  private clearCompleted = 'button.clear-completed';
  private todoCount = '.todo-count';
  private emptyState = '.empty-state';

  constructor(page: Page, baseURL: string = '') {
    super(page, baseURL);
  }

  async navigate(): Promise<void> {
    await super.navigate('/todos');
    await this.waitForPageLoad();
  }

  async addTodo(title: string): Promise<void> {
    await this.page.fill(this.todoInput, title);
    await this.page.press(this.todoInput, 'Enter');
  }

  async addMultipleTodos(titles: string[]): Promise<void> {
    for (const title of titles) {
      await this.addTodo(title);
    }
  }

  async getTodoItems(): Promise<TodoItem[]> {
    const items = await this.page.locator(this.todoItems).all();
    const todos: TodoItem[] = [];

    for (const item of items) {
      const title = await item.locator(this.todoItemTitle).textContent();
      const isCompleted = await item.locator(this.todoItemCheckbox).isChecked();
      todos.push({
        id: (await item.getAttribute('data-id')) || '',
        title: title || '',
        completed: isCompleted,
      });
    }

    return todos;
  }

  async getTodoCount(): Promise<number> {
    const countText = await this.getText(this.todoCount);
    const match = countText.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  async getActiveTodosCount(): Promise<number> {
    const items = await this.page.locator(this.todoItems).all();
    let count = 0;
    for (const item of items) {
      const isCompleted = await item.locator(this.todoItemCheckbox).isChecked();
      if (!isCompleted) count++;
    }
    return count;
  }

  async toggleTodo(todoTitle: string): Promise<void> {
    const item = this.page.locator(this.todoItems).filter({ hasText: todoTitle });
    await item.locator(this.todoItemCheckbox).click();
  }

  async deleteTodo(todoTitle: string): Promise<void> {
    const item = this.page.locator(this.todoItems).filter({ hasText: todoTitle });
    await item.hover();
    await item.locator(this.todoItemDelete).click();
  }

  async editTodo(oldTitle: string, newTitle: string): Promise<void> {
    const item = this.page.locator(this.todoItems).filter({ hasText: oldTitle });
    await item.locator(this.todoItemTitle).dblclick();
    await item.locator('input[type="text"]').fill(newTitle);
    await this.page.press('input[type="text"]', 'Enter');
  }

  async filterAllTodos(): Promise<void> {
    await this.page.click(this.filterAll);
  }

  async filterActiveTodos(): Promise<void> {
    await this.page.click(this.filterActive);
  }

  async filterCompletedTodos(): Promise<void> {
    await this.page.click(this.filterCompleted);
  }

  async clearCompleted(): Promise<void> {
    await this.page.click(this.clearCompleted);
  }

  async isTodoVisible(todoTitle: string): Promise<boolean> {
    const item = this.page.locator(this.todoItems).filter({ hasText: todoTitle });
    return item.isVisible();
  }

  async isEmptyStateVisible(): Promise<boolean> {
    return this.isVisible(this.emptyState);
  }

  async waitForTodosLoaded(): Promise<void> {
    await this.page.waitForSelector(this.todoList, { state: 'visible' });
  }

  async getVisibleTodos(): Promise<string[]> {
    const items = await this.page.locator(this.todoItems).all();
    const titles: string[] = [];
    for (const item of items) {
      const title = await item.locator(this.todoItemTitle).textContent();
      if (title) titles.push(title);
    }
    return titles;
  }
}
