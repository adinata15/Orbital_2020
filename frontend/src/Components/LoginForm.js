import React from "react";

class LoginForm extends React.Component {
	render() {
		return (
			<form action="/" method="POST" class="w-9/12 max-w-lg mx-auto my-6">
				<span class="float-right text-xl" id="close">
					<a href="#home">&times;</a>
				</span>
				<h1 class="text-center text-3xl mb-3">Sign in</h1>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-email"
						>
							Email
						</label>
						<input
							name="email"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-email"
							type="email"
							placeholder="jane@gmail.com"
							required
						/>
					</div>

					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-password"
						>
							Password
						</label>
						<input
							name="password"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-password"
							type="password"
							placeholder="******************"
							minlength="8"
							required
						/>
					</div>
				</div>

				<button
					class="w-full float-left bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 mb-3 rounded"
					id="button"
				>
					Log In
				</button>

				<p class="text-xs italic">
					Do not have an account?{" "}
					<a class="underline text-green-600" href="#signup">
						Sign Up
					</a>
				</p>
			</form>
		);
	}
}

export default LoginForm;
