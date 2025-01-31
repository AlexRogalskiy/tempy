/* eslint-disable @typescript-eslint/member-ordering */
import {Buffer} from 'node:buffer';
import {MergeExclusive, TypedArray} from 'type-fest';

export type FileOptions = MergeExclusive<
{
	/**
	File extension.

	Mutually exclusive with the `name` option.

	_You usually won't need this option. Specify it only when actually needed._
	*/
	readonly extension?: string;
},
{
	/**
	Filename.

	Mutually exclusive with the `extension` option.

	_You usually won't need this option. Specify it only when actually needed._
	*/
	readonly name?: string;
}
>;

export type DirectoryOptions = {
	/**
	Directory prefix.

	_You usually won't need this option. Specify it only when actually needed._

	Useful for testing by making it easier to identify cache directories that are created.
	*/
	readonly prefix?: string;
};

/**
The temporary path created by the function. Can be asynchronous.
*/
export type TaskCallback<ReturnValueType> = (temporaryPath: string) => Promise<ReturnValueType> | ReturnValueType;

declare const tempy: {
	file: {
		/**
		The `callback` resolves with a temporary file path you can write to. The file is automatically cleaned up after the callback is executed.

		@returns A promise that resolves after the callback is executed and the file is cleaned up.

		@example
		```
		import tempy from 'tempy';

		await tempy.file.task(tempFile => {
			console.log(tempFile);
			//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/4f504b9edb5ba0e89451617bf9f971dd'
		});
		```
		*/
		task: <ReturnValueType>(callback: TaskCallback<ReturnValueType>, options?: FileOptions) => Promise<ReturnValueType>;

		/**
		Get a temporary file path you can write to.

		@example
		```
		import tempy from 'tempy';

		tempy.file();
		//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/4f504b9edb5ba0e89451617bf9f971dd'

		tempy.file({extension: 'png'});
		//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/a9fb0decd08179eb6cf4691568aa2018.png'

		tempy.file({name: 'unicorn.png'});
		//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/f7f62bfd4e2a05f1589947647ed3f9ec/unicorn.png'

		tempy.directory();
		//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'
		```
		*/
		(options?: FileOptions): string;
	};

	directory: {
		/**
		The `callback` resolves with a temporary directory path you can write to. The directory is automatically cleaned up after the callback is executed.

		@returns A promise that resolves after the callback is executed and the directory is cleaned up.

		@example
		```
		import tempy from 'tempy';

		await tempy.directory.task(tempDirectory => {
			//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'
		})
		```
		*/
		task: <ReturnValueType>(callback: TaskCallback<ReturnValueType>, options?: DirectoryOptions) => Promise<ReturnValueType>;

		/**
		Get a temporary directory path. The directory is created for you.

		@example
		```
		import tempy from 'tempy';

		tempy.directory();
		//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'

		tempy.directory({prefix: 'a'});
		//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/name_3c085674ad31223b9653c88f725d6b41'
		```
		*/
		(options?: DirectoryOptions): string;
	};

	write: {
		/**
		Write data to a random temp file. The file is automatically cleaned up after the callback is executed.

		@returns A promise that resolves after the callback is executed and the file is cleaned up.

		@example
		```
		import tempy from 'tempy';

		await tempy.write.task('🦄', tempFile => {
			//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/4f504b9edb5ba0e89451617bf9f971dd'
		});
		```
		*/
		task: <ReturnValueType>(fileContent: string | Buffer | TypedArray | DataView | NodeJS.ReadableStream, callback: TaskCallback<ReturnValueType>, options?: FileOptions) => Promise<ReturnValueType>;

		/**
		Write data to a random temp file.

		@example
		```
		import tempy from 'tempy';

		await tempy.write('🦄');
		//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'
		```
		*/
		(fileContent: string | Buffer | TypedArray | DataView | NodeJS.ReadableStream, options?: FileOptions): Promise<string>;
	};

	/**
	Synchronously write data to a random temp file.

	@example
	```
	import tempy from 'tempy';

	tempy.writeSync('🦄');
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'
	```
	*/
	writeSync: (fileContent: string | Buffer | TypedArray | DataView, options?: FileOptions) => string;

	/**
	Get the root temporary directory path.

	For example: `/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T`.
	*/
	readonly root: string;
};

export default tempy;
