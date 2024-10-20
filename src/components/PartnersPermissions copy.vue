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
    <v-col cols="3">
      <v-select
        density="comfortable"
        :hide-details="true"
        :items="partners"
        v-model="permissions.view.partners"
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
        v-model="permissions.updateDelete.partners"
        :disabled="!permissions.updateDelete.enabled"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const partners = ref([
  {
    title: "Any partner",
    value: "any",
  },
  {
    title: "Created by the user or their department",
    value: "by_the_user_or_their_department",
  },
  {
    title: "Created by the user",
    value: "by_the_user",
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

watch(updateDeletePartners, () => {
  if (!updateDeletePartners.value.find((p) => p.value === permissions.value.view.partners)) {
    permissions.value.updateDelete.partners = updateDeletePartners.value[0].value;
  }
});
</script>
