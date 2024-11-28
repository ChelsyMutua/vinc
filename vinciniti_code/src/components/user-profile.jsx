'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// This would typically come from an API
const mockUserData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+254 712 345 678",
  location: "Downtown Road",
  country: "Kenya",
  city: "Nairobi",
  apartment: "Sunset Apartments",
  houseNo: "A4"
}

export default function UserProfile() {
  // Get initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };
  

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-lg">
                  {getInitials(mockUserData.firstName, mockUserData.lastName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">
                  {mockUserData.firstName} {mockUserData.lastName}
                </h2>
                <p className="text-muted-foreground">{mockUserData.location}</p>
              </div>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input value={mockUserData.firstName} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input value={mockUserData.lastName} readOnly />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email address</Label>
            <Input value={mockUserData.email} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={mockUserData.phone} readOnly />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Country</Label>
              <Input value={mockUserData.country} readOnly />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={mockUserData.city} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Apartment</Label>
              <Input value={mockUserData.apartment} readOnly />
            </div>
            <div className="space-y-2">
              <Label>House No.</Label>
              <Input value={mockUserData.houseNo} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-right">
        <Button variant="ghost" className="text-destructive hover:text-destructive">
          Log Out
        </Button>
      </div>
    </div>
  )
}

