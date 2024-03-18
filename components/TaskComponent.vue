<template>
  <div class="taskcontainer q-pa-sm q-mb-md">
    <div class="row">
      <div class="col-11" style="margin: auto; font-size: 15pt">
        {{ title }}
        <q-icon name="flag" :style="chooseFlag()"></q-icon>
      </div>
      <div style="margin: auto; margin-right: 0px">
        <q-btn-dropdown color="primary" label="mehr" rounded outline>
          <q-list>
            <q-item clickable v-close-popup @click="changeValue = !changeValue">
              <q-item-section>
                <q-item-label>Unteraufgabe Hinzufügen</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="edit = !edit">
              <q-item-section>
                <q-item-label>Bearbeiten</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="emitDelete">
              <q-item-section>
                <q-item-label>Löschen</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-select
                  v-model="priority"
                  :options="prio"
                  label="Priorität"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <q-separator class="q-mt-md" v-if="subTasks.length !== 0"></q-separator>
    <div
      v-for="(task, index) of subTasks"
      :key="`${index}${task.subTaskTitle}`"
    >
      <SubTaskComponent
        :sub-task-title="task.subTaskTitle"
        @delete="deleteSubTask(index)"
      />
      <q-separator
        class="q-mt-md"
        v-if="index !== subTasks.length - 1"
      ></q-separator>
    </div>
  </div>

  <q-dialog v-model="changeValue" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Unteraufgabe erstellen</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="subTitle"
          autofocus
          @keyup.enter="addSubTitle"
        />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="hinzufügen" @click="addSubTitle" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="edit" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">titel ändern</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="title" autofocus @keyup.enter="edit = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="bestätigen" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, toRef } from 'vue';
import SubTaskComponent from './subTaskComponent.vue';

type Task = {
  title: string;
  priority: string;
  subTasks: SubTask[];
};

type List = {
  tasks: Task[];
};

type SubTask = {
  subTaskTitle: string;
};

const props = defineProps(['title', 'priority']);
const emit = defineEmits(['delete', 'prio']);
const edit = ref<boolean>(false);
const changeValue = ref<boolean>(false);
const title = toRef<string>(props.title);
const prio = ref<string[]>(['niedrig', 'mittel', 'hoch']);
const priority = toRef<string>(props.priority);

const subTitle = ref<string>('');
const subTasks = ref<SubTask[]>([]);

function emitDelete(): void {
  emit('delete');
}

// function getKey(name: string): string {
//   return crypto.randomUUID() + name;
// }

function addSubTitle(): void {
  const newSubTask: SubTask = {
    subTaskTitle: subTitle.value,
  };

  subTasks.value.push(newSubTask);
  changeValue.value = false;
}

function deleteSubTask(index: number): void {
  subTasks.value.splice(index, 1);
}

function chooseFlag(): string {
  emit('prio', priority.value);
  if (priority.value === 'hoch') {
    return 'color:red;';
  } else if (priority.value === 'mittel') {
    return 'color:orange;';
  } else if (priority.value === 'niedrig') {
    return 'color:green;';
  } else {
    return 'display: none;';
  }

  // let prioo =
  //   {
  //     high: 'color: red;',
  //     middle: 'color: orange;',
  //     low: 'color: green;',
  //   }[name] ?? 'color: white;';

  // return prioo;
}
</script>
<style>
.taskcontainer {
  border: 1px solid lightgray;
  border-radius: 25px;
}
</style>
