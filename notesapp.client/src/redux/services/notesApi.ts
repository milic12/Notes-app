import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Note {
  id: number;
  info1: string;
  info2: string;
  createdAt: string;
}

export interface CreateNoteRequest {
  info1: string;
  info2: string;
}

export interface UpdateNoteRequest {
  id: number;
  info1: string;
  info2: string;
}

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      query: () => "notes",
      providesTags: ["Notes"],
    }),
    getNote: builder.query<Note, number>({
      query: (id) => `notes/${id}`,
      providesTags: (result, error, id) => [{ type: "Notes", id }],
    }),
    createNote: builder.mutation<Note, CreateNoteRequest>({
      query: (newNote) => ({
        url: "notes",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ["Notes"],
    }),
    updateNote: builder.mutation<Note, UpdateNoteRequest>({
      query: ({ id, ...rest }) => ({
        url: `notes/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Notes", id },
        "Notes",
      ],
    }),
    deleteNote: builder.mutation<void, number>({
      query: (id) => ({
        url: `notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
