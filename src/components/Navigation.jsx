import React, { useState } from 'react';
import { Link, useNavigate } from "react-router";
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { AccountCreateDialog } from './dialogs/create-account-form-dialog';

function Navigation() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const role = user?.publicMetadata?.role;

    const handleRoleRedirect = () => {
        if (!role || !["admin", "driver", "police"].includes(role)) {
            setShowDialog(true); // Show dialog if no valid role
        } else {
            navigate(`/dashboard/${role}`);
        }
    };

    return (
        <>
            <nav className="bg-white text-black p-4 flex items-center justify-between shadow-md">
                <div className="text-3xl font-bold">
                    <Link to="/">PayFine.LK</Link>
                </div>

                <div className="hidden md:flex space-x-6 gap-8">
                    <Link to="/" className="hover:font-bold hover:text-gray-700">Home</Link>
                    <Link to="/about-us" className="hover:font-bold hover:text-gray-700">About us</Link>
                    <Link to="/contact-us" className="hover:font-bold hover:text-gray-700">Contact us</Link>
                    <Link to="/view-map" className="hover:font-bold hover:text-gray-700">View map</Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Select>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue className="text-xs" placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="sinhala">Sinhala</SelectItem>
                            <SelectItem value="tamil">Tamil</SelectItem>
                        </SelectContent>
                    </Select>

                    <SignedOut>
                        <Button variant="outline">
                            <Link to="/sign-in">Login</Link>
                        </Button>
                        <Button>
                            <Link to="/sign-up">Create Account</Link>
                        </Button>
                    </SignedOut>

                    <SignedIn>
                        <Button onClick={handleRoleRedirect}>
                            Dashboard
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </nav>

            {/* Show dialog only when needed */}
            {showDialog && (
                <AccountCreateDialog open={showDialog} onOpenChange={setShowDialog} />
            )}
        </>
    );
}

export default Navigation;
