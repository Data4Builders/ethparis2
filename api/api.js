import QuickNode from '@quicknode/sdk';

const qn = new QuickNode.API({
    graphApiKey: 'QN_6e0e82be1d3b4f95934fc950c6699997', 
});

export async function fetchQuicknodeData(data) {
    let tokenAddresses = []
    if (data) {
        for(let i=0; i<data.Wallet.tokenBalances.length; i++) {
            let currentToken = data.Wallet.tokenBalances[i];
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