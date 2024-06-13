import { isAddress } from 'ethers/address';

function isAnEthereumAddress(address: string): boolean {
    return isAddress(address);
}

export default isAnEthereumAddress;