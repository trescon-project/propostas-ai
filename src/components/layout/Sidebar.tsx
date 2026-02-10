'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// MUI Icons
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface SidebarProps {
    user: any
}

export function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false)
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
        <aside
            className={`
                ${isCollapsed ? 'w-20' : 'w-64'} 
                h-screen max-h-screen sticky top-0 border-r border-zinc-800 bg-zinc-950 flex flex-col z-40 transition-all duration-300
            `}
        >
            <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-6'} border-b border-zinc-800/50 shrink-0`}>
                {/* Logo */}
                <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white overflow-hidden">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg shadow-lg shadow-indigo-500/20 shrink-0">P</div>
                    <span className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                        Propostas<span className="text-zinc-500 font-normal">.ai</span>
                    </span>
                </div>

                {!isCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-zinc-500 hover:text-white transition-colors"
                    >
                        <ChevronLeftIcon sx={{ fontSize: 20 }} />
                    </button>
                )}
            </div>

            {/* Collapsed Toggle */}
            {isCollapsed && (
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors mt-2 shrink-0"
                >
                    <ChevronRightIcon sx={{ fontSize: 20 }} />
                </button>
            )}

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={isCollapsed ? item.label : ''}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? 'text-white bg-zinc-800/80 shadow-inner'
                                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                                }
                                ${isCollapsed ? 'justify-center' : ''}
                            `}
                        >
                            <Icon sx={{ fontSize: 20 }} className={`shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
                            <span className={`transition-all duration-200 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-zinc-800/50" ref={profileRef}>
                <div className="relative">
                    {isProfileOpen && (
                        <div className="absolute bottom-full left-0 mb-2 w-full min-w-[200px] rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-bottom-left ring-1 ring-white/5 z-50">
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

                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-200 ${isProfileOpen ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'} ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center text-xs font-bold text-zinc-100 ring-2 ring-black shadow-lg shrink-0">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>

                        <div className={`flex-1 flex items-center justify-between overflow-hidden transition-all duration-200 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
                            <div className="flex flex-col items-start px-1">
                                <span className="text-xs font-medium text-zinc-200 leading-none truncate max-w-[120px]">{user?.email?.split('@')[0] || 'Usuário'}</span>
                                <span className="text-[10px] text-zinc-500 leading-none mt-1">Free Plan</span>
                            </div>
                            <MoreVertIcon sx={{ fontSize: 16 }} className="text-zinc-500" />
                        </div>
                    </button>
                </div>
            </div>
        </aside>
    )
}
