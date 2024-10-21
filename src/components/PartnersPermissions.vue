<template>
  <v-row no-gutters>
    <v-col>
      <h3>Partners companies & users</h3>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox v-model="permissions.view.enabled" label="View" :hide-details="true" />
    </v-col>
  </v-row>
  <v-row v-if="permissions.view.enabled" no-gutters>
    <v-col cols="2" class="d-flex flex-row align-center ga-3">
      <v-checkbox
        v-model="permissions.create.enabled"
        label="Create / Update / Delete"
        :hide-details="true"
        :disabled="store.canCreateOffers || store.canCreateEvents"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const store = useAppStore();

watch(
  () => [store.canCreateEvents, store.canCreateOffers],
  ([canCreateEvents, canCreateOffers]) => {
    if ((canCreateOffers || canCreateEvents) && !permissions.value.create.enabled) {
      permissions.value.create.enabled = true;
      permissions.value.view.enabled = true;
    }
  }
);
const partners = ref([
  {
    title: "Created by anyone",
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
    partners: partners.value[0].value,
  },
  create: {
    enabled: false,
  },
  updateDelete: {
    enabled: false,
    partners: partners.value.find((p) => p.value === "by_the_user")?.value,
  },
});

const updateDeletePartners = computed(() =>
  partners.value.slice(partners.value.findIndex((p) => p.value === permissions.value.view.partners))
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

watch(
  () => permissions.value.create.enabled,
  (isEnabled) => {
    store.setCanCreatePartners(isEnabled);
  }
);

watch(updateDeletePartners, () => {
  if (!updateDeletePartners.value.find((p) => p.value === permissions.value.view.partners)) {
    permissions.value.updateDelete.partners = updateDeletePartners.value[0].value;
  }
});

watch(
  () => store.canCreatePartners,
  (canCreatePartners) => {
    if (canCreatePartners !== permissions.value.create.enabled) {
      permissions.value.create.enabled = canCreatePartners;
    }
  }
);
</script>
