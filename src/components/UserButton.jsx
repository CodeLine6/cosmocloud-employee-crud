"use client"

import { useSession, signOut } from 'next-auth/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

function UserButton() {
    const { data: session } = useSession()
    const user = session?.user

    if (!user) return <Link href="/sign-in">Login</Link>

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer" asChild ><Link href="/employees-dashboard">Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton