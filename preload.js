const { CustomTitlebar, Titlebar, TitlebarColor } = require('custom-electron-titlebar')
const path = require('path')

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type])
	}

	// eslint-disable-next-line no-new
	new CustomTitlebar({
		backgroundColor: TitlebarColor.fromHex('#FFFFFF'),
    itemBackgroundColor: TitlebarColor.fromHex('#FF0000'),
    menuSeparatorColor: TitlebarColor.fromHex('#FF0000'),
		menuTransparency: 0.1
		// icon: path.resolve('example/assets', 'logo.svg'),
		// icons: path.resolve('example/assets', 'icons.json'),
	})
})