import { useEffect, useState } from "react";
//import { useWeb3React } from "@web3-react/core";
//web3
// const { active, activate, deactivate, account, error, library } =
// 	useWeb3React();
const apiAlchemy = process.env.REACT_APP_ALCHEMY_KEY_MUMBAI;
//const contractPolygon = "0xfE8c6a26243B0f1533cEEA3368DC73A5AA6899b5";

const useNFTsCollection = (contractPolygon) => {
	const [nfts, setNfts] = useState([]);
	const [loadingNftsC, setLoadingNftsC] = useState(true);

	const getContractMetadata = async () => {
		setLoadingNftsC(true);
		const url = `${apiAlchemy}/getNFTsForCollection?contractAddress=${contractPolygon}&withMetadata=true`;
		const options = { method: "GET", headers: { accept: "application/json" } };

		fetch(url, options)
			.then((response) => response.json())
			.then((response) => {
				setNfts(response.nfts);
				//console.log(response.nfts);
				setLoadingNftsC(false);
			})
			.catch((err) => {
				console.error(err);
				setLoadingNftsC(false);
			});
	};

	useEffect(() => {
		getContractMetadata();
	}, []);

	return{
		nfts,
		loadingNftsC
	};
};

const useNFTsByOwner = ({contractPolygon, account}) => {
	const [nftsAccount, setNftsAccount] = useState([]);
	const [loadingNftsO, setLoadingNftsO] = useState(true);

	const getDataNftAccount = async (account) => {
		setLoadingNftsO(true);
		//const contractPolygon = "0xfE8c6a26243B0f1533cEEA3368DC73A5AA6899b5";
		const url = `${apiAlchemy}/getNFTs?owner=${account}&contractAddresses[]=${contractPolygon}&withMetadata=true`;
		const options = { method: "GET", headers: { Accept: "application/json" } };

		fetch(url, options)
			.then((response) => response.json())
			.then((response) => {
				setNftsAccount(response.ownedNfts);
				//console.log(response.ownedNfts);
				setLoadingNftsO(false);
			})
			.catch((err) => {
				console.error(err);
				setLoadingNftsO(false);
			});
	};

	useEffect(() => {
		getDataNftAccount(account);
		
	}, [account]);

	return{
	nftsAccount,
	loadingNftsO
	};
}

export {useNFTsCollection, useNFTsByOwner};