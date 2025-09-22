import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {

  const { user } = useUser()
  const path = usePathname()
  const menuOptions = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact us", path: "/contact-us" },
  ]

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <h2 className="font-bold text-2xl">AI Trip Planner</h2>
      </div>

      {/* Menu - Desktop */}
      <nav className="hidden md:flex gap-5 items-center">
        {menuOptions.map((menu, index) => (
          <Link key={index} href={menu.path} className="text-lg hover:scale-105 transition-all hover:text-primary">
            {menu.name}
          </Link>
        ))}

      </nav>

      {/* Botão Desktop */}
      <div className="hidden md:block">
        {!user ? (<SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>) : (
          <div className="flex gap-2">
            {path == "/create-new-trip" ? (
              <Link href={'/my-trips'}>
                <Button>My trips</Button>
              </Link>
            ) : (
              <Link href={'/create-new-trip'}>
                <Button>Create New Trip</Button>
              </Link>
            )}
            <UserButton />
          </div>




        )}

      </div>

      {/* Mobile Menu */}

      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6 flex flex-col">

            <div className="flex items-center gap-3 mb-8 pt-2">
              <Image src="/logo.svg" alt="Logo" width={32} height={32} className="rounded-sm" />
              <h2 className="font-bold text-xl text-foreground">AI Trip Planner</h2>
            </div>


            <nav className="flex flex-col gap-5 flex-1">
              {menuOptions.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.path}
                  className="text-lg py-2 hover:text-primary transition-colors"
                >
                  {menu.name}
                </Link>
              ))}
            </nav>


            <div className="mt-8 border-t pt-6">
              {!user ? (
                <SignInButton mode="modal">
                  <Button className="w-full py-3 text-base font-medium">Get Started</Button>
                </SignInButton>
              ) : (
                <div className="flex flex-col gap-4">

                  {path == "/create-new-trip" ? (
                    <Link href={'/my-trips'}>
                      <Button className="w-full py-3 text-base font-medium">My trips</Button>
                    </Link>
                  ) : (
                    <Link href={'/create-new-trip'}>
                      <Button className="w-full py-3 text-base font-medium" >Create New Trip</Button>
                    </Link>
                  )}


                  <div className="flex flex-col items-center gap-3 mt-2 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Your account</p>
                    <div className="flex justify-center">
                      <UserButton

                        appearance={{
                          elements: {
                            avatarBox: "h-10 w-10",
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>


    </header>
  )
}

export default Header
