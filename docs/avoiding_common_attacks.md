# Avoiding common attacks

- **Unencrypted Private Data On-Chain**: by using the commit and reveal pattern

- **Tx.origin Attack**: use msg.sender instead of tx.origin

- **Proper Use of Require**: used to ensure valid conditions, such as inputs, or contract state variables are met

- **Use Modifiers Only for Validation**: for secure only owner funcionality (onlyNFogOwner)
