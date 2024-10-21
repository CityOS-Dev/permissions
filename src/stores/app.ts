// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    canCreatePartners: false,
    canCreateOffers: false,
    canCreateEvents: false,
    canViewUserGroups: false,
    canViewTenants: false,
    canViewGuests: false,
  }),
  actions: {
    setCanCreatePartners(canCreatePartners: boolean) {
      this.canCreatePartners = canCreatePartners;
    },
    setCanCreateOffers(canCreateOffers: boolean) {
      this.canCreateOffers = canCreateOffers;
    },
    setCanCreateEvents(canCreateEvents: boolean) {
      this.canCreateEvents = canCreateEvents;
    },
    setCanViewUserGroups(canViewUserGroups: boolean) {
      this.canViewUserGroups = canViewUserGroups;
    },
    setCanViewTenants(canViewTenants: boolean) {
      this.canViewTenants = canViewTenants;
    },
    setCanViewGuests(canViewGuests: boolean) {
      this.canViewGuests = canViewGuests;
    },
  },
});
