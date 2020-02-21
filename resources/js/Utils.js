


/**
 * winston 로거 모듈
 */
const appRoot = require('app-root-path'); 
const logger = require(appRoot + '/resources/js/log/winston.js');
const fs = require('fs');


/**
 * SVN URL, SVUL 아이디, SVN 비밀번호 입력에 대한 유효성 체크 
 */
var validationCheckerForSVNTestButton = function(irgConfigInfo){

	if(irgConfigInfo.svnUrl == null || irgConfigInfo.svnUrl == ''){

		return '체크아웃 받은 SVN 경로를 입력해주세요.';
		
	}

	if(irgConfigInfo.svnId == null || irgConfigInfo.svnId == ''){

		return 'SVN 계정 아이디를 입력해주세요.';
		
	}	

	if(irgConfigInfo.svnPwd == null || irgConfigInfo.svnPwd == ''){
		
		return 'SVN 계정 비밀번호를 입력해주세요.';
		
	}		
	
	return '';
	
}

/**
 * IR 문서를 생성한다.
 */
var generateIRDoc = function(irgModel){

	/*
	if(irgModel.irgConfigInfoList.length > 0){
		
		for(var i = 0 ; i < irgModel.irgConfigInfoList.length; i ++){
		
		}
		
	}
	*/
	logger.info("irgModel.irDocInputPath:" + irgModel.irDocInputPath);
	logger.info("irgModel.irDocOutputPath:" + irgModel.irDocOutputPath);
	return copyFileContent(irgModel.irDocInputPath + "/" + irgModel.irDocInputFileName, irgModel.irDocOutputPath + "/" + irgModel.irDocInputFileName);
	
}

/**
 * 파일을 복사한다.
 */
function copyFileContent(targetFilePath, destinationFilePath){
	try{
		fs.copyFileSync(targetFilePath, destinationFilePath);
		return true;
	}catch(e){
		logger.error(e);
		return false;
	}		
}

/**
 * 프로젝트 설정 등록된 개수에 대한 유효성 체크
 */
var validationCheckerForIRGenButton = function(irgModel){
	if(irgModel.irgConfigInfoList.length <= 0){
		return '프로젝트 설정을 등록해 주시기 바랍니다.';
	}
	
	if(irgModel.baseCodePath == null || irgModel.baseCodePath == ''){
		return 'BaseCode 경로를 입력해주시기 바랍니다.';
	}
	if(irgModel.updateCodePath == null || irgModel.updateCodePath == ''){
		return 'UpdateCode 경로를 입력해주시기 바랍니다.';
	}
	if(irgModel.irDocOutputPath == null || irgModel.irDocOutputPath == ''){
		return 'IR 문서 출력 경로를 입력해주시기 바랍니다.';
	}	
	
	return '';
}

/**
 * 프로젝트 이름, 프로젝트 메인버전, 프로젝트 서브버전 입력에 대한 유효성 체크 
 */
var validationCheckerForVersionTestButton = function(irgConfigInfo){
		
	if(irgConfigInfo.projectName == null || irgConfigInfo.projectName == ''){

		return '프로젝트 이름을 입력해주세요.';
		
	}
	
	if(irgConfigInfo.projectMainVer == null || irgConfigInfo.projectMainVer == ''){

		return '프로젝트 메인버전을 입력해주세요.';
		
	}

	if(irgConfigInfo.projectSubVer == null || irgConfigInfo.projectSubVer == ''){

		return '프로젝트 서브버전을 입력해주세요.';
		
	}		
	
	return '';
	
}



/**
 * export 하기. buttonAction.js를 비롯한 다양한 js파일에서 export한 함수들을 사용할 수 있다.
 */
module.exports = {
	
	validationCheckerForSVNTestButton: validationCheckerForSVNTestButton,
	validationCheckerForIRGenButton: validationCheckerForIRGenButton,
	generateIRDoc: generateIRDoc,
	validationCheckerForVersionTestButton: validationCheckerForVersionTestButton
};