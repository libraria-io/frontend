import toaster from 'toastr';

export const handleErrors = (
	error: any,
	defaultMessage = 'Something went wrong.',
	toastr = toaster
) => {
	if (error.response) {
		if (error.response.data.errors && error.response.status === 422) {
			Object.entries(
				error.response.data.errors as {
					[key: string]: Array<string>;
				}
			).forEach(([key, errors]) => {
				const title = key
					.split('')
					.map((letter, index) =>
						index === 0 ? letter.toUpperCase() : letter
					)
					.join('');

				errors.forEach((error) => toastr.error(error, title));
			});
		} else if (error.response.data.message) {
			toastr.error(error.response.data.message);
		}
		return;
	}
	toastr.error(defaultMessage);
};
