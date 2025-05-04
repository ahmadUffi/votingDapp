export async function connectMetaMask() {
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
