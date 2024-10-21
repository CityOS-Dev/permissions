<template>
  <v-row no-gutters>
    <v-col>
      <h3>Requests</h3>
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
        :items="requests"
        v-model="permissions.view.requests"
        :disabled="!permissions.view.enabled"
      />
    </v-col>
  </v-row>
  <v-row v-if="permissions.view.enabled" no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox v-model="permissions.create.enabled" label="Create" :hide-details="true" />
    </v-col>
  </v-row>
  <v-row v-if="permissions.view.enabled && permissions.create.enabled" no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox
        v-model="permissions.updateDelete.enabled"
        label="Update / Delete"
        :hide-details="true"
        :disabled="true"
      />
    </v-col>
    <v-col cols="3">
      <v-select
        density="comfortable"
        :hide-details="true"
        :items="updateDeletePartners"
        v-model="permissions.updateDelete.requests"
        :disabled="!permissions.updateDelete.enabled"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
// import { useAppStore } from "@/stores/app";

// const store = useAppStore();

// const isDialogOpen = ref(false);

const requests = ref([
  {
    title: "Any request",
    value: "any",
  },
  {
    title: "Created by the user or their department",
    value: "created_by_the_user_or_their_department",
  },
  {
    title: "Created by the user",
    value: "created_by_the_user",
  },
]);

const permissions = ref({
  view: {
    enabled: true,
    requests: requests.value[2].value,
  },
  create: {
    enabled: false,
  },
  updateDelete: {
    enabled: false,
    requests: requests.value.find((p) => p.value === "created_by_the_user")?.value,
  },
});

const updateDeletePartners = computed(() =>
  requests.value.slice(requests.value.findIndex((p) => p.value === permissions.value.view.requests))
);

watch(
  permissions,
  () => {
    permissions.value.updateDelete.enabled = permissions.value.create.enabled;
  },
  {
    deep: true,
  }
);

watch(updateDeletePartners, () => {
  if (
    !updateDeletePartners.value.find((p) => p.value === permissions.value.updateDelete.requests)
  ) {
    permissions.value.updateDelete.requests = updateDeletePartners.value[0].value;
  }
});
</script>
