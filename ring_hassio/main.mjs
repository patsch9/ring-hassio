import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs/promises';
import ringClientApi from 'ring-client-api';

const CONFIG_PATH = process.env.CONFIG_PATH;

async function updateSavedToken({ newRefreshToken, oldRefreshToken }) {
	console.log('Refresh Token Updated: ', newRefreshToken);
	if (!oldRefreshToken) return;
	const currentConfig = await readFile(CONFIG_PATH, 'utf8');
	const updatedConfig = currentConfig.replace(oldRefreshToken, newRefreshToken);
	await writeFile(CONFIG_PATH, updatedConfig);
}

const ffmpegArgs = { 
	audio: [], video: [],
	output: process.argv.slice(2),
};

async function main() {
	const { refreshToken, ffmpegPath } = JSON.parse(await readFile(CONFIG_PATH, 'utf8'));
	const ringApi = new ringClientApi.RingApi({ ffmpegPath, refreshToken });
	ringApi.onRefreshTokenUpdated.subscribe(updateSavedToken);
	const [camera] = await ringApi.getCameras();
	const session = await camera.createSipSession({ skipFfmpegCheck: true });
	await session.start(ffmpegArgs);
}

// handle exit signals
for (const signal of ['SIGINT','SIGTERM','SIGQUIT']) {
	process.on(signal, () => {
		console.log(`Received ${signal}, exiting...`);
		process.exit();
	});
}

main();