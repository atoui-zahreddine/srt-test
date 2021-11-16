import React, { ReactNode } from "react";
import { useSession } from "next-auth/client";
import {
  FolderIcon,
  HomeIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import TailwindBlitzImage from "../display/TailwindBlitzImage";
import { useRouter } from "next/router";

type LayoutProps = {
  title?: string;
  children: ReactNode;
};
type NavigationProps = {
  name: string;
  href: string;
  icon?: any;
  current?: boolean;
};

const therapistNavigation = [
  { name: "Posts", href: "/t/posts", icon: HomeIcon, current: false },
  {
    name: "Your Proposals",
    href: "/t/proposals",
    icon: UsersIcon,
    current: false,
  },
  // { name: "Therapist Feature", href: "#", icon: FolderIcon, current: false },
  // { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  // { name: "Documents", href: "#", icon: InboxIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];
const clientNavigation = [
  { name: "Your Posts", href: "/c/posts", icon: HomeIcon, current: false },
  // { name: "Client Feature", href: "#", icon: UsersIcon, current: false },
  // { name: "Projects", href: "#", icon: FolderIcon, current: false },
  // { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  // { name: "Documents", href: "#", icon: InboxIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Layout = ({ title, children }: LayoutProps) => {
  const session = useSession();
  const router = useRouter();

  if (session.userId) {
    return <LoggedInUserLayout> {children} </LoggedInUserLayout>;
  }
  return <>{children}</>;
};

export default Layout;

const LoggedInUserLayout = ({ children }) => {
  const router = useRouter();

  let navigation: NavigationProps[];

  switch (session.role.toLowerCase()) {
    case "therapist":
      navigation = therapistNavigation;
      break;
    case "client":
      navigation = clientNavigation;
      break;
    default:
      navigation = [];
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <TailwindBlitzImage
                    className="w-auto h-8"
                    h={9 * 8}
                    w={200}
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <nav className="px-2 mt-5 space-y-1">
                  {navigation.map((item) => (
                    <Link passHref key={item.name} href={item.href} passHref>
                      <a
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 p-4 bg-gray-700">
                <a href="#" className="flex-shrink-0 block group">
                  <div className="flex items-center">
                    {/* TAIL WIND */}
                    <div className="ml-3">
                      <p className="text-base font-medium text-white">
                        Tom Cook
                      </p>
                      <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 h-0 bg-gray-800">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <TailwindBlitzImage
                  className="w-auto h-8"
                  h={9 * 6}
                  w={200}
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
              <nav className="flex-1 px-2 mt-5 space-y-1 bg-gray-800">
                {navigation.map((item) => (
                  <Link passHref key={item.name} href={item.href} passHref>
                    <a
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4 bg-gray-700">
              <a href="#" className="flex-shrink-0 block w-full group">
                <div className="flex items-center">
                  <div>
                    <TailwindBlitzImage
                      className="inline-block rounded-full h-9 w-9"
                      h={9 * 6}
                      w={9 * 6}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Tom Cook</p>
                    <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="pt-1 pl-1 md:hidden sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-1 mx-auto xl:pt-20 max-w-7xl sm:px-2 lg:px-8">
              <div className="px-2 mx-auto max-w-7xl sm:px-4 md:px-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
