"use server"

import { revalidatePath } from "next/cache"

import { blockUser, unblockUser } from "@/lib/block-service"
import { getSelf } from "@/lib/auth-service"
import { RoomServiceClient } from "livekit-server-sdk"

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
)

export const onBlock = async (id: string) => {
  const self = await getSelf()

  let blockedUser

  try {
    const blockedUser = await blockUser(id)
  } catch {
    //This means user is guest
  }

  try {
    await roomService.removeParticipant(self.id, id)
  } catch {
    //User is not in room
  }

  revalidatePath(`/u/${self.username}/community`)

  return blockedUser
}

export const onUnblock = async (id: string) => {
  const self = await getSelf()
  const unblockedUser = await unblockUser(id)

  revalidatePath(`/u/${self.username}/community`)

  return unblockedUser
}
