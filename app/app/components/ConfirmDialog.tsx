import React, { FC, useRef } from "react"

import { AlertDialog, Button } from "native-base"

type Props = {
  action(): void
  isOpen: boolean
  setOpen(isOpen: boolean): void
}

export const ConfirmDialog: FC<Props> = ({ action, isOpen, setOpen, children }) => {
  const cancelRef = useRef(null)
  return (
    <AlertDialog
      closeOnOverlayClick
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setOpen(false)}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Logout</AlertDialog.Header>
        <AlertDialog.Body>{children}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              ref={cancelRef}
              colorScheme="coolGray"
              variant="unstyled"
              onPress={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={() => action()}>
              Logout
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
