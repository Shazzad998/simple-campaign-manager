import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";

type DeleteConfirmProps = {
    open: boolean;
    deleteProcessing: boolean;
    opOpenChange: (value: boolean) => void;
    onConfirm: () => void;
};

const DeleteConfirm = ({
    open,
    deleteProcessing,
    opOpenChange,
    onConfirm,
}: DeleteConfirmProps) => {
    return (
        <Dialog open={open} onOpenChange={opOpenChange}>
            <DialogContent aria-describedby="Delete Confirmattion" className="top-32 ">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action can not be undone after completed.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-x-2">
                    <DialogClose asChild>
                        <Button variant={"secondary"}>Cancel</Button>
                    </DialogClose>
                    <Button variant={"destructive"} onClick={onConfirm} disabled={deleteProcessing}>
                        {deleteProcessing && <Spinner />} Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirm;
