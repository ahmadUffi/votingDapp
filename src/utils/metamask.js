import { ethers } from "ethers";
import mainContractABI from "../contract/mainContract.json";
import profileContractABI from "../contract/profileContract.json";
const { VITE_CONTRACT_PROFILE_URL, VITE_CONTRACT_MAIN_URL } = import.meta.env;

export async function connectMetaMask() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const mainContract = new ethers.Contract(
    VITE_CONTRACT_MAIN_URL,
    mainContractABI,
    signer
  );
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed");
  }
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (error) {
    if (error.code === 4001) {
      // User rejected request
      throw new Error("User rejected the connection request.");
    } else if (error.message.includes("connect")) {
      throw new Error(
        "Failed to connect to MetaMask. Please ensure MetaMask is unlocked and try again."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while connecting to MetaMask: " +
          error.message
      );
    }
  }
}
