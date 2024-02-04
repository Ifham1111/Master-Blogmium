import {Sidebar} from "flowbite-react";
import {HiArrowSmRight, HiUser} from "react-icons/hi";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export  default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabForUrl = urlParams.get('tab');
        if(tabForUrl) {
            setTab(tabForUrl);
        }
        console.log(tabForUrl);
    }, [location]);
    return(
        <Sidebar className='w-full md:w-55'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' >Profile</Sidebar.Item>
                    </Link>

                    <Sidebar.Item icon={HiArrowSmRight} classname='cursor-pointer'>Sign Out</Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )

}