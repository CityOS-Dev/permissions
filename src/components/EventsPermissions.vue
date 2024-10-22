<template>
  <v-row no-gutters>
    <v-col>
      <h3>Events</h3>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox
        v-model="permissions.view.enabled"
        label="View"
        :hide-details="true"
        :disabled="permissions.viewAndApprove.enabled"
      />
    </v-col>
    <v-col cols="3">
      <v-select
        density="comfortable"
        :hide-details="true"
        :items="events"
        v-model="permissions.view.events"
        :disabled="!permissions.view.enabled"
      />
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox
        v-model="permissions.viewAndApprove.enabled"
        label="Approve"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="3">
      <v-select
        density="comfortable"
        :hide-details="true"
        :items="partners"
        v-model="permissions.viewAndApprove.partners"
        :disabled="!permissions.viewAndApprove.enabled"
      />
    </v-col>
    <v-col
      cols="3"
      v-if="
        permissions.viewAndApprove.enabled &&
        permissions.viewAndApprove.partners === 'some_partners'
      "
      class="ml-2"
    >
      <v-select
        density="comfortable"
        :hide-details="true"
        :items="['Partner 1', 'Partner 2', 'Partner 3']"
        :disabled="!permissions.view.enabled"
        :multiple="true"
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
        v-model="permissions.updateDelete.events"
        :disabled="!permissions.updateDelete.enabled"
      />
    </v-col>
  </v-row>
  <div class="text-center pa-4">
    <v-dialog v-model="isDialogOpen" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        text="Access to creation events will automatically grant access to partners companies and users."
        title="Grant access to creation events?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn
            @click="
              () => {
                permissions.create.enabled = false;
                store.setCanCreatePartners(false);
                isDialogOpen = false;
              }
            "
          >
            Cancel
          </v-btn>

          <v-btn @click="isDialogOpen = false"> Ok </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const store = useAppStore();

const isDialogOpen = ref(false);

const events = ref([
  {
    title: "Any event",
    value: "any",
  },
  {
    title: "Created or approved by the user or their department",
    value: "created_by_the_user_or_their_department",
  },
  {
    title: "Created or approved by the user",
    value: "created_by_the_user",
  },
]);

const partners = [
  {
    title: "Any partner",
    value: "any",
  },
  {
    title: "Some partners",
    value: "some_partners",
  },
];

const permissions = ref({
  view: {
    enabled: true,
    events: events.value[2].value,
  },
  viewAndApprove: {
    enabled: false,
    partners: partners[1].value,
  },
  create: {
    enabled: false,
  },
  updateDelete: {
    enabled: false,
    events: events.value.find((p) => p.value === "created_by_the_user")?.value,
  },
});

watch(
  () => permissions.value.create.enabled,
  (isEnabled) => {
    if (isEnabled && !store.canCreatePartners) {
      isDialogOpen.value = true;
    }
    store.setCanCreateEvents(isEnabled);
  }
);

const updateDeletePartners = computed(() =>
  events.value.slice(events.value.findIndex((p) => p.value === permissions.value.view.events))
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
  if (!updateDeletePartners.value.find((p) => p.value === permissions.value.updateDelete.events)) {
    permissions.value.updateDelete.events = updateDeletePartners.value[0].value;
  }
});

watch(
  () => permissions.value.viewAndApprove.enabled,
  (isEnabled) => {
    if (isEnabled && !permissions.value.view.enabled) {
      permissions.value.view.enabled = true;
    }
  }
);
</script>
