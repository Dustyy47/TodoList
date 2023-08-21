import { TodoData, TodoID } from '@/components/molecules/Todo';
import { handleFetchError } from '@/helpers';
import { $clientHost } from '.';

class TodosAPI {
  async getLists(id: string) {
    try {
      const data = await $clientHost.get(`${id}/lists`);
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async getTodos(userId: string, listId: number) {
    try {
      const data = await $clientHost.get(`${userId}/lists/${listId}`);
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async createTodo(userId: string, listId: number, todo: TodoData) {
    try {
      const data = await $clientHost.post(`${userId}/lists/${listId}`, todo);
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async updateTodo(userId: string, listId: number, todo: TodoData) {
    try {
      const data = await $clientHost.patch(
        `${userId}/lists/${listId}/${todo.id}`,
        todo
      );
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async deleteTodo(userId: string, listId: number, todoId: TodoID) {
    try {
      const data = await $clientHost.delete(
        `${userId}/lists/${listId}/${todoId}`
      );
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async createList(title: string, userId: string) {
    try {
      const data = await $clientHost.post(`${userId}/lists/`, { title });
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async deleteList(userId: string, listId: number) {
    try {
      const data = await $clientHost.delete(`${userId}/lists/${listId}`);
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }
}

export default new TodosAPI();
