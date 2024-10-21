<template>
  <v-row no-gutters>
    <v-col>
      <h3>Offers</h3>
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
        :items="offers"
        v-model="permissions.view.offers"
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
        v-model="permissions.updateDelete.offers"
        :disabled="!permissions.updateDelete.enabled"
      />
    </v-col>
  </v-row>
  <div class="text-center pa-4">
    <v-dialog v-model="isDialogOpen" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        text="Access to creation offers will automatically grant access to partners companies and users."
        title="Grant access to creation offers?"
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

const offers = ref([
  {
    title: "Any offer",
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
    offers: offers.value[2].value,
  },
  create: {
    enabled: false,
  },
  updateDelete: {
    enabled: false,
    offers: offers.value.find((p) => p.value === "created_by_the_user")?.value,
  },
});

watch(
  () => permissions.value.create.enabled,
  (isEnabled) => {
    if (isEnabled && !store.canCreatePartners) {
      isDialogOpen.value = true;
    }
    store.setCanCreateOffers(isEnabled);
  }
);

const updateDeletePartners = computed(() =>
  offers.value.slice(offers.value.findIndex((p) => p.value === permissions.value.view.offers))
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
  if (!updateDeletePartners.value.find((p) => p.value === permissions.value.updateDelete.offers)) {
    permissions.value.updateDelete.offers = updateDeletePartners.value[0].value;
  }
});
</script>
