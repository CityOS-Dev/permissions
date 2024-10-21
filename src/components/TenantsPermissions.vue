<template>
  <v-row no-gutters>
    <v-col>
      <h3>Tenant users</h3>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox v-model="permissions.view.enabled" label="View" :hide-details="true" />
    </v-col>
  </v-row>
  <v-row no-gutters v-if="permissions.view.enabled">
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox
        v-model="permissions.createUpdateDelete.enabled"
        label="Create / Update / Delete"
        :hide-details="true"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const permissions = ref({
  view: {
    enabled: false,
  },
  createUpdateDelete: {
    enabled: false,
  },
});

const store = useAppStore();

watch(
  () => store.canViewUserGroups,
  (canViewUserGroups) => {
    if (canViewUserGroups) {
      permissions.value.view.enabled = true;
    }
  }
);

watch(
  () => permissions.value.view.enabled,
  (isEnabled) => {
    store.setCanViewTenants(isEnabled);
  }
);
</script>
