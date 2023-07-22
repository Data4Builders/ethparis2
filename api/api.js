export async function fetchQuicknodeData(data) {
    if (data) {
        for(let i=0; i<data.Wallet.TokenBalances.length; i++) {
            let currentToken = data.TokenBalances[i];
            //console.log(currentToken)
            if (currentToken.tokenNfts != null) {
                tokenAddresses.push(currentToken.tokenNfts.address);
            }
        }
        console.log(tokenAddresses);
    }

    const nftDetails = {}; 
    if (tokenAddresses.length > 0) {
        Promise.all(tokenAddresses.map((tokenId) => 
        qn.nfts
            .getCollectionDetails({
            contractAddress: tokenId,
            })
        )).then((responses) => {
        responses.forEach((response, index) => {
            nftDetails[tokenAddresses[index]] = response;
        });
        console.log(nftDetails);
        }).catch((error) => console.error(error));
    }
    return nftDetails;
}