<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="./pictures/work_smart.png" />
          </q-avatar>
          make your dailey simpler
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      side="left"
      v-model="drawer"
      style="background-color: rgb(241, 241, 241)"
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <q-list class="menu-list">
          <q-item
            @click="$router.push('/menu')"
            :active="$route.path.includes('menu')"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section> Menu </q-item-section>
          </q-item>

          <q-item
            @click="$router.push('/tasks')"
            :active="$route.path.includes('tasks')"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> Aufgaben </q-item-section>
          </q-item>

          <q-item
            @click="$router.push('/calendar')"
            :active="$route.path.includes('calendar')"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="calendar_month" />
            </q-item-section>

            <q-item-section> Kalender </q-item-section>
          </q-item>

          <q-item
            @click="$router.push('/notes')"
            :active="$route.path.includes('notes')"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="notes" />
            </q-item-section>

            <q-item-section> Notizen </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>
