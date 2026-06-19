import type { Note } from "../../types/note";
import {api} from "@/lib/api/api";
import { cookies } from 'next/headers';
import {User} from "@/types/user"


interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
};

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

const cookieStore = await cookies();

export const fetchNotes = async (searchText: string, page: number, tag?: string): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: searchText,
      tag: tag === "all" ? undefined : tag,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
       Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteById = async ( id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`, {
                    headers: {
           Cookie: cookieStore.toString(),
    },
    }); 
    return response.data;
};


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
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const cookieStore = await cookies();

  const res = await api.patch<User>('/users/me', payload,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  return res.data;
};