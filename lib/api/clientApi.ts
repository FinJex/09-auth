
import type { Note } from "../../types/note";
import type { NewNote } from "../../types/note";
import {api} from "@/lib/api/api";
import {User} from "@/types/user";
import { RegisterRequest, LoginRequest } from "@/types/auth";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


type CheckSessionRequest = {
  success: boolean;
};
export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};


export const fetchNotes = async (searchText: string, page: number, tag?: string): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: searchText,
      tag: tag === "all" ? undefined : tag,
    },
  });

  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
    const response = await api.post<Note>("/notes", note, {
    });
    return response.data;
}

export const deleteNote = async ( id: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}`, {
    }); 
    return response.data;
}


export const fetchNoteById = async ( id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`, {
    }); 
    return response.data;
}


export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async (): Promise<boolean> => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.patch<User>('/users/me', payload);
  return res.data;
};