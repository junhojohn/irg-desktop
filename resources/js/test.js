
/**
 * IRG Model 자료구조
 */
var irgModel = {
	
	baseCodePath : "",
	updateCodePath : "",
	irDocInputPath : "",
	irDocOutputPath : "",
	irgConfigInfoList : []
	
}


var irgConfigInfo = {
	
	/*입력 프로젝트 명*/
	projectName : '',
	/*입력 프로젝트 메인버전(숫자)*/	
	projectMainVer : '',
	
	projectSubVer : '',
	/*입력 SVN URL*/	
	svnUrl : '',
	/*입력 SVN 아이디*/	
	svnId : '',
	/*입력 SVN 비밀번호*/	
	svnPwd : '',
	/*svn 연결 여부*/
	isConnected: false,
	/*버전 유효성 여부*/
	isVersionOk: false
	
}	


irgConfigInfo.projectName 		= 'test1';
irgConfigInfo.projectMainVer 	= '11';
irgModel.irgConfigInfoList.push(irgConfigInfo);

irgConfigInfo.projectName 		= 'test2';
irgConfigInfo.projectMainVer 	= '22';
irgModel.irgConfigInfoList.push(irgConfigInfo);

console.log(irgModel.irgConfigInfoList.length);

irgModel.irgConfigInfoList.splice(1,1);

console.log(irgModel.irgConfigInfoList.length);
