import axios from "axios";
import type { Note } from "../../types/note";
import type { NewNote } from "../../types/note";
import {api} from "@/app/api/api"

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const fetchNotes = async (searchText: string, page: number, tag?: string): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: searchText,
      tag: tag === "all" ? undefined : tag,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });

  return response.data;
};

export const createNote = async (note: NewNote) => {
    const response = await axios.post<Note>("/notes", note, {
            headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    });
    return response.data;
}

export const deleteNote = async ( id: string): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${id}`, {
                    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    }); 
    return response.data;
}


export const fetchNoteById = async ( id: string): Promise<Note> => {
    const response = await axios.get<Note>(`/notes/${id}`, {
                    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    }); 
    return response.data;
}


export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};