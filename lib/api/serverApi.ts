import type { Note } from "../../types/note";
import axios from "axios";
import {api} from "@/lib/api/api";
import { cookies } from 'next/headers';
import {User} from "../../lib/api/clientApi"


interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
};

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
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


export const fetchNoteById = async ( id: string): Promise<Note> => {
    const response = await axios.get<Note>(`/notes/${id}`, {
                    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    }); 
    return response.data;
}
export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.put<User>('/auth/me', payload);
  return res.data;
};