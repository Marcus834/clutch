"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useState, useTransition, useRef, ElementRef } from "react"
import { updateUser } from "@/actions/user"
import { toast } from "sonner"

interface BioModalProps {
  initialValue: string | null
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null)

  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(initialValue || "")

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("Successfully updated bio")
          closeRef?.current?.click()
        })
        .catch(() => toast.error("Something went wrong"))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            disabled={isPending}
            placeholder="Your bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
