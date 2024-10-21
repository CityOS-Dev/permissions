<template>
  <v-row no-gutters>
    <v-col>
      <h3>Users groups</h3>
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
  <div class="text-center pa-4">
    <v-dialog v-model="isDialogOpen" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        text="Access to view user groups will automatically grant access to view tenant and guest users."
        title="Grant access to view user groups?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn
            @click="
              () => {
                permissions.view.enabled = false;
                isDialogOpen = false;
              }
            "
          >
            Cancel
          </v-btn>

          <v-btn
            @click="
              () => {
                store.setCanViewUserGroups(true);
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

const permissions = ref({
  view: {
    enabled: false,
  },
  createUpdateDelete: {
    enabled: false,
  },
});

const isDialogOpen = ref(false);

const store = useAppStore();

watch(
  () => permissions.value.view.enabled,
  () => {
    if (permissions.value.view.enabled) {
      if (!store.canViewTenants || !store.canViewGuests) {
        isDialogOpen.value = true;
      }
    } else {
      store.setCanViewUserGroups(false);
    }
  }
);

watch(
  () => [store.canViewTenants, store.canViewGuests],
  ([canViewTenants, canViewGuests]) => {
    if (!canViewTenants || !canViewGuests) {
      permissions.value.view.enabled = false;
    }
  }
);
</script>
