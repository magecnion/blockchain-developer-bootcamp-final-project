
export const getNetworkName = (chainId) => {
    switch (chainId) {
        case 1337:
            return "ganache";
        case 80001:
            return "mumbai";
        default:
            break;
    }
}