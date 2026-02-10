'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

// MUI Icons
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface HeaderProps {
    user: any
}

export function Header({ user }: HeaderProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef<HTMLDivElement>(null)

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileRef]);

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    const navItems = [
        { label: 'Propostas', href: '/dashboard', icon: DescriptionOutlinedIcon },
        { label: 'Templates', href: '/dashboard/templates', icon: ViewQuiltOutlinedIcon },
        { label: 'Usuários', href: '/dashboard/users', icon: PeopleOutlineOutlinedIcon },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/60">
            <div className="h-16 px-6 flex items-center justify-end">
                {/* Right: User Profile */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-3 px-2 py-1.5 pr-3 rounded-full transition-all duration-200 border ${isProfileOpen ? 'bg-zinc-800 border-zinc-700' : 'hover:bg-zinc-800/50 border-transparent hover:border-zinc-800'}`}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center text-xs font-bold text-zinc-100 ring-2 ring-black shadow-lg">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="hidden md:flex flex-col items-start">
                            <span className="text-xs font-medium text-zinc-200 leading-none max-w-[100px] truncate">{user?.email?.split('@')[0] || 'Usuário'}</span>
                        </div>
                        <ExpandMoreIcon className={`text-zinc-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} sx={{ fontSize: 16 }} />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right ring-1 ring-white/5">
                            <div className="px-4 py-3 border-b border-zinc-800/50 bg-zinc-900/50">
                                <p className="text-sm font-medium text-white truncate" title={user?.email}>{user?.email}</p>
                                <p className="text-xs text-zinc-500 mt-0.5">Conta Pro</p>
                            </div>
                            <div className="p-1">
                                <Link
                                    href="/dashboard/profile"
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors group"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <AccountCircleOutlinedIcon sx={{ fontSize: 18 }} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                                    Minhas Informações
                                </Link>
                                <div className="h-px bg-zinc-800/50 my-1 mx-2" />
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors group"
                                >
                                    <LogoutOutlinedIcon sx={{ fontSize: 18 }} className="text-rose-400 group-hover:text-rose-300 transition-colors" />
                                    Sair
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
