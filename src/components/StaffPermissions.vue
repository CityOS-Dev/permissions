<template>
  <v-row no-gutters>
    <v-col>
      <h3>Staff users / Roles</h3>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox v-model="permissions.view.enabled" label="View" :hide-details="true" />
    </v-col>
    <v-col cols="3">
      <v-select
        density="comfortable"
        :hide-details="true"
        :items="departments"
        v-model="permissions.view.departments"
        :disabled="!permissions.view.enabled"
      />
    </v-col>
  </v-row>
  <v-row no-gutters class="mt-2 mb-3">
    <v-col cols="2" class="d-flex flex-row align-center ga-3"> Create / Update / Delete </v-col>
    <v-col cols="3"> Admin only </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const store = useAppStore();
const departments = ref([
  {
    title: "Any user",
    value: "any",
  },
  {
    title: "Users of the user department",
    value: "user_department",
  },
]);

const permissions = ref({
  view: {
    enabled: false,
    departments: departments.value[1].value,
  },
});

watch(
  () => permissions.value.view.enabled,
  (isEnabled) => {
    store.setCanViewStaff(isEnabled);
  }
);

watch(
  () => [store.canAssignToDepartment, store.canAssignToAnyUser],
  ([canAssignToDepartment, canAssignToAnyUser]) => {
    if (canAssignToDepartment || canAssignToAnyUser) {
      permissions.value.view.enabled = true;
      permissions.value.view.departments = canAssignToDepartment ? "user_department" : "any";
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    }
  }
);
</script>
