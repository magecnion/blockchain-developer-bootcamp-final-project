
export const getContractAddress = (chainId) => {
    switch (chainId) {
        case 1337:
            return process.env.REACT_APP_NFOG_CONTRACT_ADDRESS_LOCAL;
        case 80001:
            return process.env.REACT_APP_NFOG_CONTRACT_ADDRESS_MUMBAI;
        default:
            break;
    }
}
export const getNetworkName = (chainId) => {
    switch (chainId) {
        case 1337:
            return "local";
        case 80001:
            return "mumbai";
        default:
            break;
    }
}