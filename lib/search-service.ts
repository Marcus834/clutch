import { db } from "./db"
import { getSelf } from "./auth-service"

export const getSearch = async (q?: string) => {
  let userId

  try {
    const self = await getSelf()
    userId = self.id
  } catch {
    userId = null
  }

  let streams = []

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            user: {
              username: {
                contains: q,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    })
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            user: {
              username: {
                contains: q,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    })
  }

  return streams
}
