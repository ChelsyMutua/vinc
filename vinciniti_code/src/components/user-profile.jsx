import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder.svg"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search all Categories"
                className="w-[300px] pl-8"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <HeartIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <UserIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

        {/* Profile Card */}
        <Card className="mb-8">
          <CardContent className="flex items-center gap-4 p-6">
            <Image
              src="/placeholder.svg"
              alt="Mary Kiruga"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Mary Kiruga</h2>
              <p className="text-muted-foreground">Roysambu, Thika Road</p>
            </div>
            <Button variant="outline">Edit</Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium">First Name</label>
              <p className="text-lg">Mary</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Last Name</label>
              <p className="text-lg">Karuga</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <p className="text-lg">karugaM@gmail.com</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Phone</label>
              <p className="text-lg">+254 7 90 345 287</p>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold">Address</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Country</label>
              <p className="text-lg">Kenya</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">City</label>
              <p className="text-lg">Nairobi</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Apartment</label>
              <p className="text-lg">Melrose Apartments</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">House No.</label>
              <p className="text-lg">c4</p>
            </div>
          </CardContent>
        </Card>

        {/* Log Out Button */}
        <div className="flex justify-end">
          <Button variant="ghost" className="text-red-500 hover:text-red-600">
            Log Out
          </Button>
        </div>
      </main>
    </div>
  )
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
//  import{ useState } from 'react';
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Search } from "lucide-react"
// import Image from "next/image"
// import { Form } from 'antd';
// import Input from './Input'; // Assuming the Input component is in the same directory

// export default function UserProfile() {
//   const [form] = Form.useForm();
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     firstName: 'Mary',
//     lastName: 'Karuga',
//     email: 'karugaM@gmail.com',
//     phone: '+254 7 90 345 287',
//     country: 'Kenya',
//     city: 'Nairobi',
//     apartment: 'Melrose Apartments',
//     houseNo: 'c4'
//   });

//   const handleEdit = () => {
//     if (isEditing) {
//       form.validateFields().then((values) => {
//         setUserData(values);
//         setIsEditing(false);
//       });
//     } else {
//       setIsEditing(true);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="border-b bg-white px-4 py-3">
//         <div className="mx-auto flex max-w-7xl items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Image
//               src="/placeholder.svg"
//               alt="Logo"
//               width={40}
//               height={40}
//               className="h-10 w-10"
//             />
//             <div className="relative">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 name="search"
//                 placeholder="Search all Categories"
//                 className="w-[300px] pl-8"
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="icon">
//               <HeartIcon className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <UserIcon className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="mx-auto max-w-4xl px-4 py-8">
//         <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

//         <Form form={form} initialValues={userData}>
//           {/* Profile Card */}
//           <Card className="mb-8">
//             <CardContent className="flex items-center gap-4 p-6">
//               <Image
//                 src="/placeholder.svg"
//                 alt="Mary Kiruga"
//                 width={80}
//                 height={80}
//                 className="h-20 w-20 rounded-full object-cover"
//               />
//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold">{userData.firstName} {userData.lastName}</h2>
//                 <p className="text-muted-foreground">Roysambu, Thika Road</p>
//               </div>
//               <Button variant="outline" onClick={handleEdit}>
//                 {isEditing ? 'Save' : 'Edit'}
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Personal Information */}
//           <Card className="mb-8">
//             <CardHeader>
//               <h2 className="text-xl font-semibold">Personal Information</h2>
//             </CardHeader>
//             <CardContent className="grid grid-cols-2 gap-6">
//               <div>
//                 <label className="mb-2 block text-sm font-medium">First Name</label>
//                 {isEditing ? (
//                   <Input name="firstName" placeholder="First Name" />
//                 ) : (
//                   <p className="text-lg">{userData.firstName}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-medium">Last Name</label>
//                 {isEditing ? (
//                   <Input name="lastName" placeholder="Last Name" />
//                 ) : (
//                   <p className="text-lg">{userData.lastName}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-medium">Email address</label>
//                 {isEditing ? (
//                   <Input name="email" type="email" placeholder="Email" />
//                 ) : (
//                   <p className="text-lg">{userData.email}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-medium">Phone</label>
//                 {isEditing ? (
//                   <Input name="phone" placeholder="Phone" />
//                 ) : (
//                   <p className="text-lg">{userData.phone}</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Address */}
//           <Card className="mb-8">
//             <CardHeader>
//               <h2 className="text-xl font-semibold">Address</h2>
//             </CardHeader>
//             <CardContent className="grid grid-cols-2 gap-6">
//               <div>
//                 <label className="mb-2 block text-sm font-medium">Country</label>
//                 {isEditing ? (
//                   <Input name="country" placeholder="Country" />
//                 ) : (
//                   <p className="text-lg">{userData.country}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-medium">City</label>
//                 {isEditing ? (
//                   <Input name="city" placeholder="City" />
//                 ) : (
//                   <p className="text-lg">{userData.city}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-medium">Apartment</label>
//                 {isEditing ? (
//                   <Input name="apartment" placeholder="Apartment" />
//                 ) : (
//                   <p className="text-lg">{userData.apartment}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-medium">House No.</label>
//                 {isEditing ? (
//                   <Input name="houseNo" placeholder="House No." />
//                 ) : (
//                   <p className="text-lg">{userData.houseNo}</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </Form>

//         {/* Log Out Button */}
//         <div className="flex justify-end">
//           <Button variant="ghost" className="text-red-500 hover:text-red-600">
//             Log Out
//           </Button>
//         </div>
//       </main>
//     </div>
//   )
// }

// function HeartIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//     </svg>
//   )
// }

// function UserIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   )
// }