import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useApi } from "@/hooks/use-api"
import { useCookies } from "react-cookie"

const formSchema = z.object({
	email: z.string()
		.min(4, "Email / Username must be at least 4 characters long")
		.max(60, "Email / Username must be at most 60 characters long"),
	password: z.string()
		.min(4, "Password must be at least 4 characters long")
		.max(20, "Password must be at most 20 characters long"),
	webName: z.string()
		.min(2, "Web Name must be at least 2 characters long")
		.max(20, "Web Name must be at most 20 characters long"),
	webUrl: z.string()
		.min(4, "Web Url must be at least 4 characters long")
		.max(20, "Web Url must be at most 20 characters long"),
	webType: z.string(),
	user: z.string(),
})

type Props = {
	onRefresh: () => void;
};

const PasswordForm = ({ onRefresh }: Props) => {

	const { post } = useApi;
	const [cookies] = useCookies(["session"])


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			webName: "",
			webUrl: "",
			webType: "socialMedia",
			user: "poto"
		}
	})

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const obj = {
			email: data.email,
			password: data.password,
			webName: data.webName,
			webUrl: data.webUrl,
			webType: data.webType,
			user: "Poto"
		}

		await post("password", obj, cookies.session)
		onRefresh()
		toast.success(`Credentials for $a{data.webName} has been created.`)
	}

	return (
		<>
			<div className="mx-auto w-full max-w-lg px-4 sm:px-6 lg:px-8">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldSet>
						<FieldGroup>
							<div>
								<Controller
									name="webName"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel htmlFor="webName">Website Name</FieldLabel>
											<Input
												id="webName"
												type="text"
												placeholder="Facebook"
												aria-invalid={fieldState.invalid}
												autoComplete="off"
												{...field}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								>
								</Controller>
								<Controller
									name="webUrl"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field className="mt-4">
											<FieldLabel htmlFor="webUrl">URL</FieldLabel>
											<InputGroup>
												<InputGroupInput
													id="webUrl"
													placeholder="facebook.com"
													type="text"
													aria-invalid={fieldState.invalid}
													autoComplete="off"
													{...field}
												/>

												<InputGroupAddon>
													<InputGroupText>https://</InputGroupText>
												</InputGroupAddon>
											</InputGroup>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								>
								</Controller>
							</div>
							<Separator />
							<div className="grid grid-cols-2 gap-4">
								<Controller
									name="email"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel htmlFor="email">Email / Username</FieldLabel>
											<Input
												id="email"
												type="text"
												placeholder="kyooowebrinas@gmail.com"
												aria-invalid={fieldState.invalid}
												autoComplete="off"
												{...field}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								>
								</Controller>
								<Controller
									name="password"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel htmlFor="password">Password</FieldLabel>
											<Input
												id="password"
												type="text"
												placeholder="•••••••••••••"
												aria-invalid={fieldState.invalid}
												autoComplete="off"
												{...field}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								>
								</Controller>

							</div>
							<div className="grid grid-cols-2 gap-4 mb-2">
								<Controller
									name="webType"
									control={form.control}
									render={() => (
										<Field>
											<FieldLabel htmlFor="type">
												Password Type
											</FieldLabel>
											<Select defaultValue="socialMedia">
												<SelectTrigger id="type">
													<SelectValue placeholder="Select Type" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value="socialMedia">Social Media</SelectItem>
														<SelectItem value="banks">Banks</SelectItem>
														<SelectItem value="work">Work</SelectItem>
														<SelectItem value="games">Games</SelectItem>
														<SelectItem value="general">General</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</Field>
									)}
								>
								</Controller>

								<Controller
									name="user"
									control={form.control}
									render={() => (
										<Field>
											<FieldLabel htmlFor="user">
												User
											</FieldLabel>
											<Select defaultValue="poto">
												<SelectTrigger id="user">
													<SelectValue placeholder="Select User" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value="poto">Poto Pogi</SelectItem>
														<SelectItem value="kyooowe">Kyooowe Super Pogi</SelectItem>
														<SelectItem value="tonet">Tonet</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</Field>
									)}
								>
								</Controller>
							</div>
						</FieldGroup>
					</FieldSet>
					<DrawerFooter className="mx-auto w-full max-w-lg p-0 mt-2 mb-4">
						<Button>Submit</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</form>
			</div>
		</>
	)
}

export type IPasswordFormSchema =
	z.infer<typeof formSchema> & {
		id: number;
		isVisible: boolean;
	};
export default PasswordForm;