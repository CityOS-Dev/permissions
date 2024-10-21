<template>
  <div>
    <v-container>
      <v-row class="mb-4">
        <v-col>
          <h1>Permissions</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <StaffPermissions />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <DepartmentsPermissions />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <PartnersPermissions />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TenantsPermissions />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GuestsPermissions />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GroupsPermissions />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <EventsPermissions />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <OffersPermissions />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup></script>
