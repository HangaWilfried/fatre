import { defineStore } from "pinia";
import { Post, type PostData } from "@/domain/post";
import { PublicationService } from "@/services/main";
import { type ApiResponse, ErrorHandler } from "@/stores/api";

export const PostStore = defineStore("post", {
  actions: {
    createOne: async (post: PostData): Promise<ApiResponse<string>> => {
      try {
        const postId = await PublicationService.createPublication({
          requestBody: Post.builder(post),
        });
        return { data: postId };
      } catch (error) {
        return ErrorHandler(error);
      }
    },
    getMyPosts: async (): Promise<ApiResponse<Post[]>> => {
      try {
        const posts = await PublicationService.getMyPublications();
        return {
          data: posts.map((post) => new Post(post)),
        };
      } catch (error) {
        return ErrorHandler(error, []);
      }
    },
    editOne: async ({
      postId,
      post,
    }: {
      postId: string;
      post: PostData;
    }): Promise<ApiResponse<undefined>> => {
      try {
        await PublicationService.updatePublication({
          publicationId: postId,
          requestBody: Post.builder(post),
        });
        return {};
      } catch (error) {
        return ErrorHandler(error);
      }
    },
    deleteOne: async (postId: string): Promise<ApiResponse<undefined>> => {
      try {
        await PublicationService.deletePublicationById({
          publicationId: postId,
        });
        return {};
      } catch (error) {
        return ErrorHandler(error);
      }
    },
    publishOne: async (postId: string): Promise<ApiResponse<undefined>> => {
      try {
        await PublicationService.postPublication({
          publicationId: postId,
        });
        return {};
      } catch (error) {
        return ErrorHandler(error);
      }
    },
    maskOne: async (postId: string): Promise<ApiResponse<undefined>> => {
      try {
        await PublicationService.removePublication({
          publicationId: postId,
        });
        return {};
      } catch (error) {
        return ErrorHandler(error);
      }
    },
  },
});
