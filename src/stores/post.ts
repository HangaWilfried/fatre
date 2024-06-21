import { PublicationService } from "@/services/main";
import { defineStore } from "pinia";

export const postStore = defineStore("post", {
  actions: {
    createOne: async () => {
      try {
        await PublicationService.createPublication({
          requestBody: {},
        });
      } catch (error) {
        console.log(error);
      }
    },
    getMyPosts: async () => {
      try {
        await PublicationService.getMyPublications();
      } catch (error) {
        console.log(error);
      }
    },
    editOne: async () => {
      try {
        await PublicationService.updatePublication({
          publicationId: "",
          requestBody: {},
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleteOne: async () => {
      try {
        await PublicationService.deletePublicationById({
          publicationId: "",
        });
      } catch (error) {
        console.log(error);
      }
    },
    publishOne: async () => {
      try {
        await PublicationService.postPublication({
          publicationId: "",
        });
      } catch (error) {
        console.log(error);
      }
    },
    maskOne: async () => {
      try {
        await PublicationService.removePublication({
          publicationId: "",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
