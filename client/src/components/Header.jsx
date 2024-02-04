import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {blockquoteTheme} from "flowbite-react/lib/esm/components/Blockquote/theme.js";

export default function Header() {
    const path = useLocation().pathname
    const { currentUser } = useSelector(state => state.user)

    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-center whitespace-nowrap test-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
                mium
            </Link>

            <form>
                <TextInput
                    type='text'
                    placeholder='Search'
                    className='hidden lg:inline'
                    rightIcon={AiOutlineSearch}
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon />
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePicture}
                                size='md'
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className={'block text-sm'}>@{currentUser.username}</span>
                            <span className={'block text-sm font-medium truncate text-gray-500'}>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sing Out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/sign-up'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
                )
                }

                <Navbar.Toggle />
            </div >

            <Navbar.Collapse>
                {/* //Innhere labar.link and the link creta 2 a tag in this no allowed to create like that so we are declare Navbar.link as div */}
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>

                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>

                <Navbar.Link active={path === "/projects"} as={'div'}>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>

        </Navbar >
    )
}
