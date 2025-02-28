web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

abi=JSON.parse('[{"constant":false,"inputs":[{"name":"_candidateId","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"candidatesCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates","outputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"voteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

var votedOrNot=[]

VotingContract = web3.eth.contract(abi);
// In the nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
var contractInstance = VotingContract.at('0x1643180ca23012ca33b17043665f13c431c8764a');
var candidates = {"Bill": 1, "Tom": 2, "Janice": 3}

var dateV = '22/11/2018'

function voteForCandidate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
		dd = '0'+dd
	} 
	if(mm<10) {
		mm = '0'+mm
	} 
	today = dd + '/' + mm + '/' + yyyy;


	if(today.toString()==dateV){		
		document.getElementById('vote').disabled = true;
		alert("Voting has been disabled");		
	}else{
	
	
		var account = prompt("Please enter your registered number");
		$("#ID").html("Your Account ID: "+web3.eth.accounts[account]);
		$("#bal").html("Balance: "+web3.eth.getBalance(web3.eth.accounts[account])/Math.pow(10,18));
		
		$("#Uniquedata").html("Your Details are ID: "+web3.eth.accounts[account]+" Balance "+ web3.eth.getBalance(web3.eth.accounts[account])/Math.pow(10,18));
		
		var e = document.getElementById("candidate").value;
		var candidateName = e;	

		try{
			contractInstance.vote(candidates[candidateName], {from: web3.eth.accounts[account]}); 
		}catch(err){
			if(err.toString()=='Error: VM Exception while processing transaction: revert'){
				alert("You have already voted.\n" + err);
			}
		}finally{
			$("#bal").html("Balance: "+web3.eth.getBalance(web3.eth.accounts[account])/Math.pow(10,18));
		}
	}
}

function countForCandidate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
		dd = '0'+dd
	} 
	if(mm<10) {
		mm = '0'+mm
	} 
	today = dd + '/' + mm + '/' + yyyy;


	if(today.toString()==dateV){
		document.getElementById('win1').disabled = false;
		document.getElementById('vote').disabled = true;
		for(var i=1;i<4;i++){
			$("#candidate-"+i).html(contractInstance.candidates(i)[2].toString());		
		}
	}else{
		alert("The results will be declared on 23/11/2018");
	}		
}

function winner(){
	var max = 0;
	var candidateW = '';
	for(var i=1;i<4;i++){
		var votes = contractInstance.candidates(i)[2].toString();		
		if(max<votes){
			candidateW = contractInstance.candidates(i)[1].toString();
			max = votes
		alert("The new max votes is "+max);	
		}
	}
	//alert(max + " "+ candidateW);
	$("#win").html("Winner is: " + candidateW);
}





//abi = JSON.parse('[ { constant: true,inputs: [Array],name: \'totalVotesFor\',outputs: [Array],payable: false,stateMutability: \'view\',type: \'function\' },{ constant: true,inputs: [Array],name: \'validCandidate\',outputs: [Array],payable: false,stateMutability: \'view\',type: \'function\' },{ constant: true,inputs: [Array],name: \'votesReceived\',outputs: [Array],payable: false,stateMutability: \'view\',type: \'function\' },{ constant: true,inputs: [Array],name: \'candidateList\',outputs: [Array],payable: false,stateMutability: \'view\',type: \'function\' },{ constant: false,inputs: [Array],name: \'voteForCandidate\',outputs: [],payable: false,stateMutability: \'nonpayable\',type: \'function\' },{ inputs: [Array],payable: false,stateMutability: \'nonpayable\',type: \'constructor\' } ],totalVotesFor:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],bytes32: [Circular] },validCandidate:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],bytes32: [Circular] },votesReceived:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],bytes32: [Circular] },candidateList:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],uint256: [Circular] },voteForCandidate:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],bytes32: [Circular] },allEvents: [Function: bound ]')

//abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
