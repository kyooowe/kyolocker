import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircleHeart, Plus, Landmark, Database, BriefcaseBusiness, Gamepad2, Info, Copy, ChevronDown, Pen, Trash, BookMarked } from "lucide-react"
import { ButtonGroup } from "@/components/ui/button-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Field } from "@/components/ui/field"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCookies } from 'react-cookie';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import PasswordForm, { type IPasswordFormSchema, type IPasswordFormSchemaWithId } from "@/components/forms/password.form"
import { useApi } from "@/hooks/use-api"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { IResponse } from "../../interface/response.interface"
import { useCopyToClipboard } from "@/hooks/use-copytoclipboard"
import { useCrypto } from "@/hooks/use-crypto"

const PasswordPage = () => {

	const { get } = useApi
	const { copy } = useCopyToClipboard();
	const { encrypt, decrypt } = useCrypto

	const [passwords, setPasswords] = useState<IPasswordFormSchema[]>([])
	const [selectedPassword, setSelectedPassword] = useState<IPasswordFormSchemaWithId | null>(null)
	const [filter, setFilter] = useState<string>("all")
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [openDrawer, setOpenDrawer] = useState<boolean>(false)
	const [cookies, setCookie] = useCookies(["session"])


	const handleData = useCallback(async () => {
		setIsLoading(true)
		setSelectedPassword(null)

		try {
			const response = await get<IResponse<IPasswordFormSchema[]>>("password", cookies.session);

			const withState = response.data.map((item) => ({
				...item,
				isVisible: false,
			}));

			setPasswords(withState);
			setOpenDrawer(false)
			setIsLoading(false)
		} catch (error) {
			console.error("Failed to fetch passwords:", error);
		}
	}, [get, cookies.session]);

	useEffect(() => {
		(async () => {
			if (!cookies.session) return
			await handleData();
		})();
	}, [handleData, cookies.session]);

	const filteredPasswords = useMemo(() => {
		if (filter === "all") return passwords

		return passwords.filter(
			(item) => item.webType.toLowerCase() === filter.toLowerCase()
		)
	}, [passwords, filter])

	const counts = useMemo(() => ({
		all: passwords.length,
		socialmedia: passwords.filter(p => p.webType.toLocaleLowerCase() === "socialmedia").length,
		banks: passwords.filter(p => p.webType.toLocaleLowerCase() === "banks").length,
		work: passwords.filter(p => p.webType.toLocaleLowerCase() === "work").length,
		games: passwords.filter(p => p.webType.toLocaleLowerCase() === "games").length,
		general: passwords.filter(p => p.webType.toLocaleLowerCase() === "general").length,
	}), [passwords])

	const handleType = (typeName: string) => {
		if (typeName.toLocaleLowerCase() === "socialmedia") return "Social Media"
		if (typeName.toLocaleLowerCase() === "games") return "Games"
		if (typeName.toLocaleLowerCase() === "banks") return "Banks"
		if (typeName.toLocaleLowerCase() === "work") return "Work"
	}

	const handleTypeIcon = (typeName: string) => {
		if (typeName === "socialmedia") return <MessageCircleHeart />
		if (typeName === "games") return <Gamepad2 />
		if (typeName === "banks") return <Landmark />
		if (typeName === "work") return <BriefcaseBusiness />
	}

	const handlePin = (pin: string) => {

		const poto = import.meta.env.VITE_POTO_PIN
		const tonet = import.meta.env.VITE_TONET_PIN

		if (pin === poto || pin === tonet) {

			setCookie("session", pin === poto ? encrypt(poto) : encrypt(tonet), {
				path: "/",
				maxAge: 30 * 60,
			});
		}
	};

	const handlePassword = (id: number) => {
		setPasswords((prev) =>
			prev.map((item) =>
				item.id === id
					? { ...item, isVisible: !item.isVisible }
					: item
			)
		);
	}

	if (!cookies.session) {
		return (
			<Dialog open={!cookies.session}>
				<DialogContent className="[&>button]:hidden">
					<DialogHeader>
						<DialogTitle>Input Pin</DialogTitle>
						<DialogDescription>
							Unlock your session by entering your PIN.
						</DialogDescription>
					</DialogHeader>
					<Field>
						<InputOTP maxLength={7} id="otp-verification" onComplete={handlePin}>
							<InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
							</InputOTPGroup>
							<InputOTPSeparator className="mx-2" />
							<InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
								<InputOTPSlot index={6} />
							</InputOTPGroup>
						</InputOTP>
					</Field>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<div className="px-3 lg:px-8">
			<Tabs
				defaultValue="all"
				className="w-full flex-col justify-start mt-4"
				value={filter}
				onValueChange={(value) => setFilter(value)}
			>
				<div className="flex items-center justify-between">
					<Select
						defaultValue="all"
						value={filter}
						onValueChange={(value) => setFilter(value)}
					>
						<SelectTrigger
							className="flex w-fit lg:hidden"
							size="sm"
							id="view-selector"
						>
							<SelectValue placeholder="Select a view" />
						</SelectTrigger>
						<SelectContent position="popper" className="w-auto">
							<SelectGroup>
								<SelectLabel>Passwords</SelectLabel>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="socialmedia">Social Media</SelectItem>
								<SelectItem value="banks">Banks</SelectItem>
								<SelectItem value="games">Games</SelectItem>
								<SelectItem value="work">Work</SelectItem>
								<SelectItem value="general">General</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<TabsList className="hidden lg:flex **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1">
						<TabsTrigger value="all">
							<Database />
							All <Badge variant="secondary">{counts.all}</Badge>
						</TabsTrigger>
						<TabsTrigger value="socialmedia">
							<MessageCircleHeart />
							Social Media <Badge variant="secondary">{counts.socialmedia}</Badge>
						</TabsTrigger>
						<TabsTrigger value="banks">
							<Landmark />
							Banks <Badge variant="secondary">{counts.banks}</Badge>
						</TabsTrigger>
						<TabsTrigger value="work">
							<BriefcaseBusiness />
							Work <Badge variant="secondary">{counts.work}</Badge>
						</TabsTrigger>
						<TabsTrigger value="games">
							<Gamepad2 />
							Games <Badge variant="secondary">{counts.games}</Badge>
						</TabsTrigger>
						<TabsTrigger value="general">
							<BookMarked />
							General <Badge variant="secondary">{counts.general}</Badge>
						</TabsTrigger>
					</TabsList>
					<div className="flex items-center gap-2">
						<Drawer open={openDrawer} onOpenChange={() => {
							setOpenDrawer(!openDrawer)
							setSelectedPassword(null)
						}}>
							<DrawerTrigger asChild>
								<Button variant="outline" size="sm">
									<Plus />
									Add Password
								</Button>
							</DrawerTrigger>
							<DrawerContent>
								<DrawerHeader>
									<DrawerTitle>Add Password</DrawerTitle>
									<DrawerDescription>
										Tonet please fill all the details.
									</DrawerDescription>
								</DrawerHeader>
								<PasswordForm onRefresh={handleData} intialData={selectedPassword} />
							</DrawerContent>
						</Drawer>
					</div>
				</div>
			</Tabs>
			<div className="mt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{
					isLoading ? (
						<h1>Loading</h1>
					) : (
						filteredPasswords.map((item, i) => (
							<Card size="default" className="w-full" key={i}>
								<CardHeader>
									<div className="flex items-start justify-between w-full gap-2">

										{/* Left */}
										<div className="flex flex-col min-w-0">
											<CardTitle className="truncate">
												{item.webName}
											</CardTitle>
											<CardDescription className="text-xs text-muted-foreground truncate">
												{item.webUrl}
											</CardDescription>
										</div>

										{/* Right Div (always right) */}
										<div className="flex items-center gap-1 shrink-0 flex-wrap justify-end">
											<Badge variant="destructive" className="whitespace-nowrap">
												{handleTypeIcon(item.webType)}
												{handleType(item.webType)}
											</Badge>
											<Badge className="default whitespace-nowrap">
												{item.user}
											</Badge>
										</div>
									</div>
								</CardHeader>

								<CardContent>
									<InputGroup className="[--radius:9999px]">
										<Popover>
											<PopoverTrigger asChild>
												<InputGroupAddon>
													<InputGroupButton variant="secondary" size="icon-xs">
														<Info />
													</InputGroupButton>
												</InputGroupAddon>
											</PopoverTrigger>

											<PopoverContent align="start" className="flex flex-col gap-1 rounded-xl text-sm">
												<p className="font-medium">Username or Email</p>
											</PopoverContent>
										</Popover>

										<InputGroupInput id={`email-${item.id}`} value={item.email} readOnly />

										<InputGroupAddon align="inline-end">
											<InputGroupButton onClick={() => toast.success("Email copied to clipboard")}>
												<Copy />
											</InputGroupButton>
										</InputGroupAddon>
									</InputGroup>

									<InputGroup className="[--radius:9999px] mt-3 mb-1">
										<Popover>
											<PopoverTrigger asChild>
												<InputGroupAddon>
													<InputGroupButton variant="secondary" size="icon-xs">
														<Info />
													</InputGroupButton>
												</InputGroupAddon>
											</PopoverTrigger>

											<PopoverContent align="start" className="flex flex-col gap-1 rounded-xl text-sm">
												<p className="font-medium">Password</p>
											</PopoverContent>
										</Popover>

										<InputGroupInput id={`password-${item.id}`} value={item.isVisible ? decrypt(item.password) : '••••••••••••••'} readOnly />

										<InputGroupAddon align="inline-end">
											<InputGroupButton onClick={() => copy(item.isVisible ? item.password : '••••••••••••••', "Password Copied.")}>
												<Copy />
											</InputGroupButton>
										</InputGroupAddon>
									</InputGroup>
								</CardContent>

								<CardFooter>
									<ButtonGroup className="w-full flex">

										<Button
											variant="outline"
											className="flex-1"
											onClick={() => handlePassword(item.id)}
										>
											{item.isVisible ? "Hide Password" : "Show Password"}
										</Button>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="outline" className="pl-2!">
													<ChevronDown />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="w-44">
												<DropdownMenuGroup>
													<DropdownMenuItem onClick={() => {
														setOpenDrawer(true)
														setSelectedPassword({
															id: item.id,
															email: item.email,
															password: item.password,
															webName: item.webName,
															webUrl: item.webUrl,
															webType: item.webType,
															user: item.user
														})
													}}>
														<Pen />
														Update Password
													</DropdownMenuItem>
												</DropdownMenuGroup>
												<DropdownMenuSeparator />
												<DropdownMenuGroup>
													<DropdownMenuItem variant="destructive">
														<Trash />
														Delete Password
													</DropdownMenuItem>
												</DropdownMenuGroup>
											</DropdownMenuContent>
										</DropdownMenu>
									</ButtonGroup>
								</CardFooter>
							</Card>
						))
					)
				}
			</div>
		</div>
	)
}

export default PasswordPage