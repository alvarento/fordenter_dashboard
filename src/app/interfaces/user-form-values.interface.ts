export interface IUserFormValues {
   full_name: string,
   email: string,
   password: string,
   role: 'admin' | 'user',
   user_img_src?: string
}
