<template>
  <q-input
    class="q-mt-lg q-ml-md q-mr-md"
    rounded
    outlined
    v-model="title"
    label="Erstelle eine Aufgabe"
  >
    <template v-slot:append>
      <q-btn round color="primary" @click="addTask" icon="add"></q-btn>
    </template>
  </q-input>

  <div class="q-mt-lg q-ml-md q-mr-md" rounded outlined>
    <TaskComponent
      v-for="task of taskList.tasks"
      :key="task.title"
      :title="task.title"
      :priority="task.priority"
      @delete="deleteTask(task)"
      @prio="changePrio($event, task)"
    />
  </div>
</template>

<script setup lang="ts">
import TaskComponent from 'components/TaskComponent.vue';

import { ref } from 'vue';

type Task = {
  title: string;
  priority: string;
};

type List = {
  tasks: Task[];
};

const taskList = ref<List>({ tasks: [] });
const title = ref<string>('');
// const priority = ref<string>('');

function addTask(): void {
  const newTask = {
    title: title.value,
    priority: '',
  };

  taskList.value.tasks.push(newTask);
}

function deleteTask(task: Task): void {
  const index = taskList.value.tasks.indexOf(task);
  taskList.value.tasks.splice(index, 1);
}

function changePrio(prio: string, task: Task): void {
  const index = taskList.value.tasks.indexOf(task);
  taskList.value.tasks[index].priority = prio;
  sort();
}

function sort() {
  taskList.value.tasks.sort(
    (a, b) => prioToNumber(b.priority) - prioToNumber(a.priority)
  );
}

function prioToNumber(prio: string): number {
  if (prio === 'hoch') {
    return 2;
  } else if (prio === 'mittel') {
    return 1;
  } else {
    return 0;
  }
}
</script>

<style></style>
