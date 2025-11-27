import { useContractRead } from 'wagmi'
import { getContractAddress } from '../config/contracts'
import ParaizoTokenABI from '../abis/ParaizoToken.json'

export const useTokenBalance = (address?: `0x${string}`) => {
  return useContractRead({
    address: getContractAddress('ParaizoToken'),
    abi: ParaizoTokenABI.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!address,
    watch: true,
  })
}