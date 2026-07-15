import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import {postInput, updatePostInput, } from '@lazy_support_engineer/medium-common'



export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
    Variables: {
      userId: string
  }
}>();

// middleware
blogRouter.use('/*', async (c, next) => {
  const header = c.req.header('authorization') || "";
  const token = header.split(" ")[1];

    try {
        const response = await verify(token, c.env.JWT_SECRET, 'HS256') as { id?: string };

        if (typeof response.id === 'string') {
            c.set('userId', response.id);
            await next();
            return;
        }

        return c.json({ error: 'Unauthorized' }, 401);
    } catch (error) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
})

const createPrisma = (databaseUrl: string) => {
  return new PrismaClient({
    accelerateUrl: databaseUrl,
  }).$extends(withAccelerate());
};



blogRouter.post('/', async (c) => {
    const body = await c.req.json();

    const validation = postInput.safeParse(body);
    if (!validation.success) {
        return c.json({ message: "Invalid input" }, 411);
    }

    const prisma = createPrisma(c.env.DATABASE_URL);
    const authorId = c.get('userId');

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
        }
    })

    return c.json({
        id: post.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = createPrisma(c.env.DATABASE_URL);
    const authorId = c.get('userId');

    const validation = updatePostInput.safeParse(body);
    if (!validation.success) {
        return c.json({ message: "Invalid input" }, 411);
    }

    const post = await prisma.post.update({
        where:{
            id: body.id,
            authorId: authorId
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: post.id
    })
})

blogRouter.get('/bulk', async (c) => {
    const prisma = createPrisma(c.env.DATABASE_URL);
    const authorId = c.get('userId');

    const posts = await prisma.post.findMany({
        where: {
            authorId,
        }
    })

    return c.json({
        posts
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = createPrisma(c.env.DATABASE_URL);

    try {
        const post = await prisma.post.findFirst({
        where: {
                id: id,
        }
    })

    return c.json({
        post
    })
    } catch (error) {
        c.status(411);
        return c.json({
            error: 'Error fetching post'
        })
    }
})

