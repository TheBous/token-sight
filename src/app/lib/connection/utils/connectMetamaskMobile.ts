// metamask.github.io/metamask-deeplinks/#
export const connectMetamaskMobile = () => {
	const dappUrl = window.location.href.split("//")[1].split("/")[0];
	const metamaskAppDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;
	window.open(metamaskAppDeepLink, "_self");
};
