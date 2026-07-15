import z from 'zod';

export const signupInput = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    name: z.string()
})

export const signinInput = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
})

export const postInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string()
})

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type PostInput = z.infer<typeof postInput>;
export type UpdatePostInput = z.infer<typeof updatePostInput>;