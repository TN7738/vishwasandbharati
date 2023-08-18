import React from 'react';
import Typewriter from "typewriter-effect";

const TypeText = () => {
	return (
		<Typewriter
			options={{
				strings: [
					"Why do we choose partners so different from ourselves?"
				],
				autoStart: true,
				loop: true,
				deleteSpeed: 20,
			}}
		/>
	)
}

export default TypeText;