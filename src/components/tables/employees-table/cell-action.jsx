'use client';

/* import { deleteTradeAccount } from '@/actions/tradeAccounts';
 */import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { deleteEmployee } from '@/data/employees';
import { Edit, Loader2, MoreHorizontal, Trash, UserX2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const CellAction = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const onConfirm = async () => {
        setLoading(true);

        try {
            const result = await deleteEmployee(data._id);

            if (!result.success) {
                toast({
                    title: "Error",
                    description: result.message,
                    variant: "destructive"
                });
                return;
            }

            toast({
                title: "Success",
                description: "Employee deleted successfully",
            });

            router.refresh();
        }
        catch (e) {
            console.error("Error deleting employee", e.message);
            toast({
                title: "Error",
                description: e.message,
                variant: "destructive"
            });
        }
        finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem className="cursor-pointer" onClick={() => { router.push(`/employee/${data._id}`); router.refresh() }}><UserX2Icon className="mr-2 h-4 w-4" />
                    View Employee</DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    asChild>
                    <Link href={`/employees-dashboard/${data._id}`} >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            <AlertDialog open={open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this employee?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={loading} onClick={onConfirm} className={'bg-red-500 hover:bg-red-600 text-foreground'}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...</> : 'Continue'}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenu>
    );
};