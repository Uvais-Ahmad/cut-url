import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { CircleUserRound, Mail } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function ProfileModalDialog() {
    const {data: auth} = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='h-8 w-8 cursor-pointer'>
                    <AvatarImage style={{height: '12', width: '12'}} src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <CircleUserRound/>
                            {auth?.user?.name}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Mail />
                            {auth?.user?.email}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
