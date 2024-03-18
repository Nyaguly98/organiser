<template>
  <div class="q-mt-md q-ml-md q-mr-md">
    <div class="row">
      <div>
        <q-checkbox left-label v-model="left" rounded />
        {{ subTaskTitle }}
      </div>
      <div style="margin: auto; margin-right: 0px">
        <q-btn
          flat
          @click="emitDelSubTask"
          icon="delete"
          style="color: rgb(196, 7, 7)"
          class="borderDelete"
        ></q-btn>
        <q-btn flat @click="editSubTitle = !editSubTitle" icon="edit"></q-btn>
      </div>
    </div>
  </div>
  <q-dialog v-model="editSubTitle">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">titel ändern</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="subTaskTitle"
          autofocus
          @keyup.enter="editSubTitle = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="bestätigen" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, toRef } from 'vue';

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

const props = defineProps(['subTaskTitle']);
const emits = defineEmits(['delete']);
const editSubTitle = ref<boolean>(false);
const subTaskTitle = toRef<string>(props.subTaskTitle);
const left = ref<boolean>(false);

function emitDelSubTask(): void {
  emits('delete');
}
</script>
<style>
.borderDelete {
  border-right: solid 1px lightgray;
}
</style>
