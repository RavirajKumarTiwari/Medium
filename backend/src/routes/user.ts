import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { compare, hash } from 'bcryptjs'
import {signinInput, signupInput} from '@lazy_support_engineer/medium-common'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();

const createPrisma = (databaseUrl: string) => {
  return new PrismaClient({
    accelerateUrl: databaseUrl,
  }).$extends(withAccelerate());
};


userRouter.post('/signup', async (c) => {
  const prisma = createPrisma(c.env.DATABASE_URL);
  
  const body = await c.req.json();

  const validation = signupInput.safeParse(body);
  if (!validation.success) {
    return c.json({ error: validation.error}, 411);
  }

  try{  const user = await prisma.user.create({
      data: {
        email: body.email,
        password: await hash(body.password, 10),
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    
    return c.json({
      jwt: token
    });} catch (error) {
    return c.text('Error creating user', 500);
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = createPrisma(c.env.DATABASE_URL);
  
  const body = await c.req.json();

  const validation = signinInput.safeParse(body);
  if (!validation.success) {
    return c.json({ error: validation.error }, 411);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      c.status(404);
      return c.text('User not found');
    }

    if (!(await compare(body.password, user.password))) {
      return c.text('Unauthorized: Incorrect password', 401);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    return c.text('Error signing in', 500);
  }
  
})