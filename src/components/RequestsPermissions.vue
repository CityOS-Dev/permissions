<template>
  <v-row no-gutters>
    <v-col>
      <h3>Requests</h3>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox
        v-model="permissions.view.enabled"
        label="View"
        :hide-details="true"
        :disabled="permissions.assign.enabled"
      />
    </v-col>
    <v-col cols="3">
      <v-select
        density="comfortable"
        :hide-details="true"
        :items="requests"
        v-model="permissions.view.requests"
        :disabled="!permissions.view.enabled"
      />
    </v-col>
  </v-row>
  <v-row v-if="permissions.view.enabled" no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox v-model="permissions.assign.enabled" label="Assign" :hide-details="true" />
    </v-col>
    <v-col cols="3">
      <v-select
        density="comfortable"
        :hide-details="true"
        :items="users"
        v-model="permissions.assign.users"
        :disabled="!permissions.assign.enabled"
      />
    </v-col>
  </v-row>
  <v-row v-if="permissions.view.enabled" no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox v-model="permissions.create.enabled" label="Create" :hide-details="true" />
    </v-col>
  </v-row>
  <div class="text-center pa-4">
    <v-dialog v-model="isDialogOpen" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        text="Access to assigning requests will automatically grant access to viewing staff users."
        title="Grant access to assigning requests?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn
            @click="
              () => {
                permissions.assign.enabled = false;
                store.setCanAssignToDepartment(false);
                store.setCanAssignToAnyUser(false);
                isDialogOpen = false;
              }
            "
          >
            Cancel
          </v-btn>

          <v-btn
            @click="
              () => {
                store.setCanAssignToDepartment(
                  permissions.assign.users === 'to_the_user_or_their_department'
                );
                store.setCanAssignToAnyUser(permissions.assign.users === 'any');
                isDialogOpen = false;
              }
            "
          >
            Ok
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const store = useAppStore();

const isDialogOpen = ref(false);

const requests = ref([
  {
    title: "Any request",
    value: "any",
  },
  {
    title: "Assigned to the user or their department",
    value: "assigned_to_the_user_or_their_department",
  },
  {
    title: "Assigned to the user",
    value: "assigned_to_the_user",
  },
]);

const users = ref([
  {
    title: "To any user",
    value: "any",
  },
  {
    title: "To the user or their department",
    value: "to_the_user_or_their_department",
  },
  {
    title: "To the user",
    value: "to_the_user",
  },
]);

const permissions = ref({
  view: {
    enabled: true,
    requests: requests.value[2].value,
  },
  assign: {
    enabled: false,
    users: users.value[2].value,
  },
  create: {
    enabled: false,
  },
});

watch(
  () => [permissions.value.assign.enabled, permissions.value.assign.users],
  () => {
    if (permissions.value.assign.enabled && permissions.value.assign.users !== "to_the_user") {
      if (!store.canViewStaff) {
        isDialogOpen.value = true;
      }
    }
  }
);
</script>
