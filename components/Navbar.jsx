"use client";

import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { UserContext } from "@/utils/userContext";
import { useRouter } from "next/navigation";

export default function NavBarComponent() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  console.log("user: ", user);
  return (
    <Navbar className="bg-mainColor">
      <NavbarBrand>
        <p className="font-bold text-white ">B-NEXT</p>
      </NavbarBrand>

      {/* <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      {user.length !== 0 ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu as="div" aria-label="Profile Actions" variant="flat">
              <DropdownItem as="div" key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem as="div" key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem as="div" key="team_settings">
                Team Settings
              </DropdownItem>

              <DropdownItem as="div" key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src="/user.png"
              />
            </DropdownTrigger>
            <DropdownMenu
              as="div"
              aria-label="Profile Actions"
              variant="flat"
              className="bg-secondColor rounded-lg"
            >
              <DropdownItem
                as="div"
                key="register"
                onClick={() => router.push("/register")}
                className="hover:bg-gray-600 bg-opacity-65 rounded-md text-thirdColor"
              >
                Register
              </DropdownItem>
              <DropdownItem
                as="div"
                key="login"
                onClick={() => router.push("/login")}
                className="hover:bg-gray-600 bg-opacity-65 rounded-md text-thirdColor"
              >
                Login
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
  );
}
