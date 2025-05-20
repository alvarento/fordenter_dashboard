export interface IUser {
   id: number,
   first_name: string,
   full_name: string,
   email: string,
   password: string,
   role: 'admin' | 'user',
   user_img_src?: string
}

export type NewUser = Omit<IUser, 'id'>
