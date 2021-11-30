# Avoiding common attacks

- **Tx.origin Attack**: use msg.sender instead of tx.origin

- **Proper Use of Require**: used to ensure valid conditions, such as inputs, or contract state variables are met

- **Use Modifiers Only for Validation**: for secure only owner funcionality (onlyNFogOwner)

- **TODO Unencrypted Private Data On-Chain**: first I though about using the commit and reveal pattern, but then I realised I need the original message hash to reveal it. Then I was thinking of including a salt in the encryption process controled by the Dapp, but it loses descentralization and creates a single point of failure. So I am kind of lost I would like to here suggestions.
